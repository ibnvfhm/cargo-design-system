'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, forwardRef, useContext, useId, } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark } from '../internal/field.js';
const Group = createContext(null);
/** A group of radio buttons with one choice: a <fieldset> whose <legend> is the Figma Label. The ref is the
 * <fieldset>. */
export const RadioGroup = forwardRef(function RadioGroup({ label, required = false, requiredIndicator = 'symbol', description, error, name, value, defaultValue, onValueChange, id, className, children, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const groupId = id ?? autoId;
    const invalid = isError(error);
    const legendId = `${groupId}-label`;
    const descriptionId = hasMessage(description) ? `${groupId}-description` : undefined;
    const errorId = invalid && hasMessage(error) ? `${groupId}-error` : undefined;
    const context = {
        name: name ?? groupId,
        value,
        defaultValue,
        required,
        select: (chosen) => onValueChange?.(chosen),
    };
    return (_jsxs("fieldset", { ref: ref, id: groupId, className: cx('cargo-radio-group', className), role: "radiogroup", "aria-labelledby": legendId, "aria-describedby": idList(descriptionId, errorId, describedBy), "aria-required": required || undefined, "aria-invalid": invalid || undefined, ...rest, children: [_jsxs("legend", { id: legendId, className: "cargo-field__label cargo-radio-group__label", children: [label, required && _jsx(RequiredMark, { indicator: requiredIndicator })] }), _jsx("div", { className: "cargo-radio-group__items", children: _jsx(Group.Provider, { value: context, children: children }) }), descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description }), errorId && (_jsx(FieldMessage, { id: errorId, tone: "error", children: error }))] }));
});
/** One choice in a RadioGroup. Figma: Radio Button. The ref is the <input>. */
export const RadioButton = forwardRef(function RadioButton({ value, children, description, id, className, style, onChange, 'aria-describedby': describedBy, ...rest }, ref) {
    const group = useContext(Group);
    const autoId = useId();
    const inputId = id ?? autoId;
    const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
    // Inside a group, the group decides which radio is checked, either from its value or from its defaultValue.
    const checked = group
        ? group.value !== undefined
            ? { checked: group.value === value }
            : { defaultChecked: group.defaultValue === value }
        : {};
    return (_jsxs("div", { className: cx('cargo-radio', className), style: style, children: [_jsxs("label", { className: "cargo-radio__control", children: [_jsxs("span", { className: "cargo-radio__target", children: [_jsx("input", { ref: ref, id: inputId, type: "radio", className: "cargo-radio__input", name: group?.name, value: value, required: group?.required || undefined, "aria-describedby": idList(descriptionId, describedBy), onChange: (event) => {
                                    group?.select(value);
                                    onChange?.(event);
                                }, ...checked, ...rest }), _jsx("span", { className: "cargo-radio__circle", "aria-hidden": "true" })] }), children != null && _jsx("span", { className: "cargo-radio__text", children: children })] }), descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description })] }));
});
