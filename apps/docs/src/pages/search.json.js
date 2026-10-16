// Search index for the top bar: pages, components, colour tokens, type roles, dimensions and icons.
import { codeOf, hasCode } from '../lib/code.mjs';
import { components } from '../lib/components.mjs';
import { ICONS } from '../lib/icons.mjs';
import { SECTIONS, SIDEBAR, url } from '../lib/site.mjs';
import { BORDER_WIDTH, RADIUS, ROLES, SHADOWS, SPACE, semanticGroups } from '../lib/tokens.mjs';

export function GET() {
  const entries = [];
  // w ranks equally good matches: pages and components before tokens, tokens before icons.
  const add = (t, s, u, k = '', w = 1) => entries.push({ t, s, u: url(u), k, w });

  for (const section of ['beranda', 'foundations']) {
    const label = SECTIONS.find((item) => item.id === section).label;
    for (const group of SIDEBAR[section]) for (const item of group.items) add(item.label, group.title ? `${label} · ${group.title}` : label, item.href, '', 3);
  }

  for (const component of components) {
    add(component.page, `Komponen · ${component.category.name}`, `/komponen/${component.slug}/`, `${component.summary} ${component.sets.map((set) => set.name).join(' ')}`, 3);
    // Pages with several components have a heading per component; a single-component page is covered by its own entry.
    const mainSets = component.sets.filter((set) => !set.helper);
    if (mainSets.length > 1) {
      for (const set of mainSets) add(set.name, `Komponen · ${component.page}`, `/komponen/${component.slug}/#${set.slug}`, set.summary, 2);
    }
  }

  // React components, on the Kode tab of their page.
  for (const component of components.filter(hasCode)) {
    for (const meta of codeOf(component)) {
      add(meta.name, `Komponen React · ${component.page}`, `/komponen/${component.slug}/kode/`, `react kode ${meta.props.map((prop) => prop.name).join(' ')}`, 2);
    }
  }

  for (const group of semanticGroups()) {
    for (const token of group.tokens) add(token.figma, 'Token warna', `/foundations/warna/#${token.path.replace(/\./g, '-')}`, `${token.css} ${token.description}`);
  }
  for (const role of ROLES) add(role.role, 'Tipografi', `/foundations/tipografi/#${role.role}`, role.description);
  for (const token of [...SPACE.tokens, ...RADIUS.tokens, ...BORDER_WIDTH.tokens]) add(token.figma, 'Spacing dan radius', '/foundations/ukuran/', `${token.css} ${token.description}`);
  for (const token of SHADOWS.tokens) add(token.figma, 'Shadow dan elevasi', '/foundations/shadow/', token.description);
  for (const icon of ICONS) add(`Icon-${icon.name}`, 'Ikon', `/foundations/ikon/?q=${encodeURIComponent(icon.name)}`, `${icon.label} ${icon.keywords.join(' ')}`, 0);

  return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
