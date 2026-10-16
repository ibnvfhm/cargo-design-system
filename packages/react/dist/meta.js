// Figma ↔ code mapping of every component, for the Kode tab on the docs site.
import { badgeMeta } from './badge/badge.meta.js';
import { buttonMeta } from './button/button.meta.js';
import { checkboxGroupMeta, checkboxMeta } from './checkbox/checkbox.meta.js';
import { chipMeta } from './chip/chip.meta.js';
import { radioButtonMeta, radioGroupMeta } from './radio-button/radio-button.meta.js';
import { textAreaMeta } from './text-area/text-area.meta.js';
import { textFieldMeta } from './text-field/text-field.meta.js';
import { toggleMeta } from './toggle/toggle.meta.js';
export const META = {
    Badge: badgeMeta,
    Button: buttonMeta,
    TextField: textFieldMeta,
    TextArea: textAreaMeta,
    Checkbox: checkboxMeta,
    CheckboxGroup: checkboxGroupMeta,
    RadioGroup: radioGroupMeta,
    RadioButton: radioButtonMeta,
    Toggle: toggleMeta,
    Chip: chipMeta,
};
