'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark } from '../internal/field.js';
/** Multi-line text input. Figma: Text Area. The ref is the <textarea>. */
export const TextArea = forwardRef(function TextArea({ label, required = false, requiredIndicator = 'text', description, error, counter = false, id, className, style, placeholder, value, defaultValue, maxLength, onChange, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const textareaRef = useRef(null);
    useImperativeHandle(ref, () => textareaRef.current, []);
    // The counter follows `value` when the parent controls it, and its own count otherwise.
    const [ownLength, setOwnLength] = useState(() => String(defaultValue ?? '').length);
    const length = value !== undefined ? String(value).length : ownLength;
    // Text typed before hydration, or restored by the browser, arrives without a change event.
    useEffect(() => {
        if (textareaRef.current)
            setOwnLength(textareaRef.current.value.length);
    }, []);
    const invalid = isError(error);
    const descriptionId = hasMessage(description) ? `${fieldId}-description` : undefined;
    const errorId = invalid && hasMessage(error) ? `${fieldId}-error` : undefined;
    const counterId = counter ? `${fieldId}-counter` : undefined;
    return (_jsxs("div", { className: cx('cargo-text-area', className), style: style, children: [label != null && (_jsxs("label", { className: "cargo-field__label", htmlFor: fieldId, children: [label, required && _jsx(RequiredMark, { indicator: requiredIndicator })] })), _jsx("textarea", { ref: textareaRef, id: fieldId, className: "cargo-text-area__input", 
                // A blank placeholder keeps :placeholder-shown working, which tells the CSS whether the field is empty.
                placeholder: placeholder ?? ' ', required: required, value: value, defaultValue: defaultValue, maxLength: maxLength, onChange: (event) => {
                    if (value === undefined)
                        setOwnLength(event.currentTarget.value.length);
                    onChange?.(event);
                }, "aria-invalid": invalid || undefined, "aria-describedby": idList(errorId, descriptionId, counterId, describedBy), ...rest }), (descriptionId || errorId || counterId) && (_jsxs("div", { className: "cargo-text-area__helper", children: [(descriptionId || errorId) && (_jsxs("div", { className: "cargo-text-area__messages", children: [descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description }), errorId && (_jsx(FieldMessage, { id: errorId, tone: "error", children: error }))] })), counterId && (_jsx("div", { id: counterId, className: "cargo-field__message cargo-text-area__counter", children: maxLength != null ? `${length}/${maxLength}` : length }))] }))] }));
});
