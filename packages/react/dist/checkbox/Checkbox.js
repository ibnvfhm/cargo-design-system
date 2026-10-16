'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError } from '../internal/field.js';
import { CheckIcon, MinusCircleIcon } from '../internal/icons.js';
export const CHECKBOX_SIZES = ['md', 'sm'];
/** Checkbox. Figma: Checkbox. The ref is the <input>. */
export const Checkbox = forwardRef(function Checkbox({ children, size, indeterminate = false, description, error, id, className, style, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current, []);
    // HTML has no indeterminate attribute; the property is set after every render, and data-indeterminate draws the
    // minus before hydration.
    useEffect(() => {
        if (inputRef.current)
            inputRef.current.indeterminate = indeterminate;
    });
    const invalid = isError(error);
    const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
    const errorId = invalid && hasMessage(error) ? `${inputId}-error` : undefined;
    return (_jsxs("div", { className: cx('cargo-checkbox', className), style: style, "data-size": size, children: [_jsxs("label", { className: "cargo-checkbox__control", children: [_jsxs("span", { className: "cargo-checkbox__target", children: [_jsx("input", { ref: inputRef, id: inputId, type: "checkbox", className: "cargo-checkbox__input", "data-indeterminate": indeterminate || undefined, "aria-invalid": invalid || undefined, "aria-describedby": idList(descriptionId, errorId, describedBy), ...rest }), _jsxs("span", { className: "cargo-checkbox__box", "aria-hidden": "true", children: [_jsx(CheckIcon, { className: "cargo-checkbox__check" }), _jsx(MinusCircleIcon, { className: "cargo-checkbox__minus" })] })] }), children != null && _jsx("span", { className: "cargo-checkbox__text", children: children })] }), descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description }), errorId && (_jsx(FieldMessage, { id: errorId, tone: "error", children: error }))] }));
});
