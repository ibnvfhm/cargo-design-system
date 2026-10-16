// Which component pages have React components in @cargo/react, and the check that keeps their Figma ↔ code mapping
// complete. The Kode tab of a page shows these components.
import { META } from '@cargo/react/meta';
import reactPackage from '@repo/packages/react/package.json';
import data from '../data/components.json';
import { COMPONENT_TABS } from './components.mjs';

export const REACT_PACKAGE = { name: reactPackage.name, version: reactPackage.version };

// Figma page → its code components, in the order the Kode tab shows them.
const CODE_COMPONENTS = {
  Badge: ['Badge'],
  Button: ['Button'],
  'Text Fields': ['TextField'],
  'Text Area': ['TextArea'],
  'Checkbox & Radio Button': ['Checkbox', 'CheckboxGroup', 'RadioGroup', 'RadioButton'],
  Toggle: ['Toggle'],
  Chips: ['Chip'],
};

export const hasCode = (component) => component.page in CODE_COMPONENTS;
export const codeOf = (component) => (CODE_COMPONENTS[component.page] ?? []).map((name) => META[name]);
export const tabsOf = (component) => COMPONENT_TABS.filter((tab) => tab.id !== 'kode' || hasCode(component));

// Every variant property, value and component property of the Figma set must have a counterpart in the meta (a prop,
// or a note on why it is Figma only), and the meta must not describe anything Figma no longer has.
function checkSet(label, set, axes, properties, problems) {
  for (const [axis, values] of Object.entries(set.axes)) {
    const meta = axes[axis];
    if (!meta) {
      problems.push(`${label}: variant property "${axis}" belum dipetakan`);
      continue;
    }
    if ('figmaOnly' in meta) continue;
    for (const value of values) if (!(value in meta.values)) problems.push(`${label}: nilai ${axis}=${value} belum dipetakan`);
    for (const value of Object.keys(meta.values)) if (!values.includes(value)) problems.push(`${label}: ${axis}=${value} tidak ada lagi di Figma`);
  }
  for (const axis of Object.keys(axes)) if (!(axis in set.axes)) problems.push(`${label}: variant property "${axis}" tidak ada lagi di Figma`);
  const names = set.props.map(([name]) => name);
  for (const name of names) if (!(name in properties)) problems.push(`${label}: properti "${name}" belum dipetakan`);
  for (const name of Object.keys(properties)) if (!names.includes(name)) problems.push(`${label}: properti "${name}" tidak ada lagi di Figma`);
}

const problems = [];
for (const [pageName, names] of Object.entries(CODE_COMPONENTS)) {
  const page = data.pages.find((item) => item.page === pageName);
  if (!page) {
    problems.push(`halaman ${pageName} tidak ada di components.json`);
    continue;
  }
  for (const name of names) {
    const meta = META[name];
    if (!meta) {
      problems.push(`${name} tidak ada di @cargo/react/meta`);
      continue;
    }
    // A companion (CheckboxGroup, RadioGroup) has no set of its own; its main component maps it.
    if (!meta.figmaSet) continue;
    const set = page.sets.find((item) => item.name === meta.figmaSet);
    if (!set) problems.push(`${name}: set ${meta.figmaSet} tidak ada di halaman ${pageName}`);
    else checkSet(name, set, meta.axes, meta.properties, problems);
    for (const [helperName, helper] of Object.entries(meta.helperSets ?? {})) {
      const helperSet = page.sets.find((item) => item.name === helperName);
      if (!helperSet) problems.push(`${name}: set ${helperName} tidak ada di halaman ${pageName}`);
      else checkSet(`${name} / ${helperName}`, helperSet, helper.axes, helper.properties, problems);
    }
  }
}
if (problems.length) throw new Error(`Padanan Figma ↔ kode belum lengkap:\n- ${problems.join('\n- ')}`);
