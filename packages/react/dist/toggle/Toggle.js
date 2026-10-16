import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError } from '../internal/field.js';
/** On/off switch that takes effect at once. Figma: Toggle (State=Active is `checked`). The ref is the <input>. */
export const Toggle = forwardRef(function Toggle({ children, label, description, error, id, className, style, 'aria-labelledby': labelledBy, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const labelId = label != null ? `${inputId}-label` : undefined;
    const textId = children != null ? `${inputId}-text` : undefined;
    const invalid = isError(error);
    const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
    const errorId = invalid && hasMessage(error) ? `${inputId}-error` : undefined;
    return (_jsxs("div", { className: cx('cargo-toggle', className), style: style, children: [label != null && (_jsx("div", { id: labelId, className: "cargo-field__label", children: label })), _jsxs("label", { className: "cargo-toggle__control", children: [_jsxs("span", { className: "cargo-toggle__target", children: [_jsx("input", { ref: ref, id: inputId, type: "checkbox", role: "switch", className: "cargo-toggle__input", "aria-labelledby": labelledBy ?? (labelId ? idList(labelId, textId) : undefined), "aria-invalid": invalid || undefined, "aria-describedby": idList(descriptionId, errorId, describedBy), ...rest }), _jsx("span", { className: "cargo-toggle__track", "aria-hidden": "true", children: _jsx("span", { className: "cargo-toggle__thumb" }) })] }), children != null && (_jsx("span", { id: textId, className: "cargo-toggle__text", children: children }))] }), descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description }), errorId && (_jsx(FieldMessage, { id: errorId, tone: "error", children: error }))] }));
});
