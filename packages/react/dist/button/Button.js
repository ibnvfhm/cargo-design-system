import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cx } from '../internal/cx.js';
export const BUTTON_VARIANTS = [
    'primary',
    'secondary',
    'tertiary',
    'outlined',
    'borderless',
    'danger',
    'danger-outlined',
    'danger-borderless',
];
export const BUTTON_SIZES = ['lg', 'md', 'sm'];
/** Button. Figma: Button. */
export const Button = forwardRef(function Button({ variant = 'primary', size = 'lg', device, leftIcon, rightIcon, children, type = 'button', className, ...rest }, ref) {
    return (_jsxs("button", { ref: ref, type: type, className: cx('cargo-button', className), "data-variant": variant, "data-size": size, "data-device": device, ...rest, children: [leftIcon != null && (_jsx("span", { className: "cargo-button__icon", "aria-hidden": "true", children: leftIcon })), children != null && children !== false && _jsx("span", { className: "cargo-button__label", children: children }), rightIcon != null && (_jsx("span", { className: "cargo-button__icon", "aria-hidden": "true", children: rightIcon }))] }));
});
