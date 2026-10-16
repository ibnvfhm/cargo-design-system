import { jsx as _jsx } from "react/jsx-runtime";
export const REQUIRED_INDICATORS = ['text', 'symbol'];
/** Figma: Required Object, Type=Text "(Required)" or Type=Symbol "*". Hidden from screen readers, which announce the
 * field's `required` attribute instead. */
export function RequiredMark({ indicator }) {
    return (_jsx("span", { className: "cargo-field__required", "data-indicator": indicator, "aria-hidden": "true", children: indicator === 'symbol' ? '*' : '(Required)' }));
}
/** Figma: Description, Type=Normal (`tone` normal) or Type=Error. */
export function FieldMessage({ id, tone = 'normal', children }) {
    return (_jsx("div", { id: id, className: "cargo-field__message", "data-tone": tone, children: children }));
}
/** Whether an `error` prop puts the field in the error state: any value except null, undefined and false. */
export const isError = (error) => error != null && error !== false;
/** Whether an `error` prop also has a message to show (`error={true}` only marks the field). */
export const hasMessage = (node) => node != null && typeof node !== 'boolean' && node !== '';
/** Joins element IDs for aria-describedby, leaving out the empty ones. */
export const idList = (...ids) => ids.filter(Boolean).join(' ') || undefined;
