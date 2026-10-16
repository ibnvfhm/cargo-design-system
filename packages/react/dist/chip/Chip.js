'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from 'react';
import { cx } from '../internal/cx.js';
import { CheckIcon, XIcon } from '../internal/icons.js';
export const CHIP_VARIANTS = ['filter', 'input'];
export const CHIP_SIZES = ['md', 'sm'];
/** Chip. Figma: Chip. The ref is the <button> of a filter chip, or the outer <span> of an input chip. */
export const Chip = forwardRef(function Chip(props, ref) {
    // The hook runs for both variants, so the order of hooks never changes.
    const [ownSelected, setOwnSelected] = useState(props.variant !== 'input' && (props.defaultSelected ?? false));
    if (props.variant === 'input') {
        const { variant, size = 'md', icon, children, onRemove, removeLabel, disabled = false, className, ...rest } = props;
        return (_jsxs("span", { ref: ref, className: cx('cargo-chip', className), "data-variant": variant, "data-size": size, "data-disabled": disabled || undefined, ...rest, children: [icon != null && (_jsx("span", { className: "cargo-chip__icon", "aria-hidden": "true", children: icon })), _jsx("span", { className: "cargo-chip__label", children: children }), _jsx("button", { type: "button", className: "cargo-chip__remove", "aria-label": removeLabel ?? (typeof children === 'string' ? `Hapus ${children}` : 'Hapus'), disabled: disabled, onClick: onRemove, children: _jsx(XIcon, {}) })] }));
    }
    const { variant = 'filter', size = 'md', icon, children, selected, defaultSelected, onSelectedChange, onClick, className, ...rest } = props;
    const isSelected = selected ?? ownSelected;
    return (_jsxs("button", { ref: ref, type: "button", className: cx('cargo-chip', className), "data-variant": variant, "data-size": size, "aria-pressed": isSelected, onClick: (event) => {
            onClick?.(event);
            if (event.defaultPrevented)
                return;
            if (selected === undefined)
                setOwnSelected(!isSelected);
            onSelectedChange?.(!isSelected);
        }, ...rest, children: [isSelected && _jsx(CheckIcon, { className: "cargo-chip__check" }), icon != null && (_jsx("span", { className: "cargo-chip__icon", "aria-hidden": "true", children: icon })), _jsx("span", { className: "cargo-chip__label", children: children })] }));
});
