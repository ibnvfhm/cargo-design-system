import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark } from '../internal/field.js';
/** A labelled group of checkboxes: a <fieldset> whose <legend> is the Figma Label. The ref is the <fieldset>. */
export const CheckboxGroup = forwardRef(function CheckboxGroup({ label, required = false, requiredIndicator = 'symbol', description, error, size, id, className, children, 'aria-describedby': describedBy, ...rest }, ref) {
    const autoId = useId();
    const groupId = id ?? autoId;
    const invalid = isError(error);
    const descriptionId = hasMessage(description) ? `${groupId}-description` : undefined;
    const errorId = invalid && hasMessage(error) ? `${groupId}-error` : undefined;
    return (_jsxs("fieldset", { ref: ref, id: groupId, className: cx('cargo-checkbox-group', className), "data-size": size, "data-invalid": invalid || undefined, "aria-describedby": idList(descriptionId, errorId, describedBy), ...rest, children: [_jsxs("legend", { className: "cargo-field__label cargo-checkbox-group__label", children: [label, required && _jsx(RequiredMark, { indicator: requiredIndicator })] }), _jsx("div", { className: "cargo-checkbox-group__items", children: children }), descriptionId && _jsx(FieldMessage, { id: descriptionId, children: description }), errorId && (_jsx(FieldMessage, { id: errorId, tone: "error", children: error }))] }));
});
