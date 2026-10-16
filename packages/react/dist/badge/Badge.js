import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cx } from '../internal/cx.js';
export const BADGE_TYPES = ['label', 'counter', 'dot'];
export const BADGE_VARIANTS = ['primary', 'info', 'warning', 'success', 'danger', 'gray', 'accent'];
export const BADGE_SIZES = ['md', 'sm', 'xs'];
export const BADGE_APPEARANCES = ['subtle', 'solid'];
/** Badge. Figma: Badge. */
export const Badge = forwardRef(function Badge({ type = 'label', variant = 'primary', size = 'md', appearance = 'subtle', children, leftIcon, rightIcon, className, ...rest }, ref) {
    const shared = {
        ref,
        className: cx('cargo-badge', className),
        'data-type': type,
        'data-variant': variant,
        'data-size': size,
        'data-appearance': appearance,
    };
    if (type === 'dot') {
        // A dot without text is decoration; with text, the text is announced instead of the colour.
        return (_jsxs("span", { ...shared, "aria-hidden": children == null ? true : undefined, ...rest, children: [_jsx("span", { className: "cargo-badge__dot" }), children != null && _jsx("span", { className: "cargo-visually-hidden", children: children })] }));
    }
    return (_jsxs("span", { ...shared, ...rest, children: [type === 'label' && leftIcon != null && (_jsx("span", { className: "cargo-badge__icon", "aria-hidden": "true", children: leftIcon })), children, type === 'label' && rightIcon != null && (_jsx("span", { className: "cargo-badge__icon", "aria-hidden": "true", children: rightIcon }))] }));
});
