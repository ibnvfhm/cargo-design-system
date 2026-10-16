'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark } from '../internal/field.js';
import { XCircleIcon } from '../internal/icons.js';
/** Single-line text input. Figma: Text Field. The ref is the <input>. */
export const TextField = forwardRef(function TextField({ label, required = false, requiredIndicator = 'text', description, error, leftIcon, rightIcon, prefix, suffix, clearable = true, clearLabel = 'Hapus isian', device, id, className, style, placeholder, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current, []);
    const invalid = isError(error);
    const message = invalid && hasMessage(error) ? error : description;
    const prefixId = prefix != null ? `${inputId}-prefix` : undefined;
    const suffixId = suffix != null ? `${inputId}-suffix` : undefined;
    const messageId = hasMessage(message) ? `${inputId}-message` : undefined;
    // Empties the field the way typing would, so onChange runs for controlled and uncontrolled inputs alike.
    const clear = () => {
        const input = inputRef.current;
        if (!input)
            return;
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.focus();
    };
    return (_jsxs("div", { className: cx('cargo-text-field', className), style: style, "data-device": device, children: [label != null && (_jsxs("label", { className: "cargo-field__label", htmlFor: inputId, children: [label, required && _jsx(RequiredMark, { indicator: requiredIndicator })] })), _jsxs("div", { className: "cargo-text-field__field", "data-invalid": invalid || undefined, children: [prefix != null && (_jsx("span", { id: prefixId, className: "cargo-text-field__affix", "data-side": "start", children: prefix })), leftIcon != null && (_jsx("span", { className: "cargo-text-field__icon", "aria-hidden": "true", children: leftIcon })), _jsx("input", { ref: inputRef, id: inputId, className: "cargo-text-field__input", 
                        // A blank placeholder keeps :placeholder-shown working, which tells the CSS whether the field is empty.
                        placeholder: placeholder ?? ' ', required: required, "aria-invalid": invalid || undefined, "aria-describedby": idList(prefixId, suffixId, messageId, describedBy), ...rest }), clearable && (_jsx("button", { type: "button", className: "cargo-text-field__clear", tabIndex: -1, "aria-label": clearLabel, onMouseDown: (event) => event.preventDefault(), onClick: clear, children: _jsx(XCircleIcon, {}) })), rightIcon != null && (_jsx("span", { className: "cargo-text-field__icon", "aria-hidden": "true", children: rightIcon })), suffix != null && (_jsx("span", { id: suffixId, className: "cargo-text-field__affix", "data-side": "end", children: suffix }))] }), messageId && (_jsx(FieldMessage, { id: messageId, tone: invalid ? 'error' : 'normal', children: message }))] }));
});
