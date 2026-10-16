'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { arrow as arrowMiddleware, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { cloneElement, isValidElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, version, } from 'react';
import { cx } from '../internal/cx.js';
// Figma's Side is the side of the tooltip the arrow is on: Side=Bottom puts the tooltip above its trigger.
export const TOOLTIP_SIDES = ['top', 'bottom', 'left', 'right'];
const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
// The arrow sits 16px from the tooltip's edge (Figma: padding 0 16 around the tip) and is 10px wide.
const ARROW_INSET = 16;
const ARROW_HALF = 5;
const GAP = 4;
const ARROW_DEPTH = 6;
function placementOf(side, arrow) {
    const base = OPPOSITE[side];
    if (arrow === 'left' || arrow === 'top')
        return `${base}-start`;
    if (arrow === 'right' || arrow === 'bottom')
        return `${base}-end`;
    return base;
}
// React 19 keeps an element's ref in props; React 18 keeps it on the element.
const REACT_19 = Number(version.split('.')[0]) >= 19;
function refOf(element) {
    return (REACT_19 ? element.props.ref : element.ref) ?? undefined;
}
function assignRef(ref, value) {
    if (typeof ref === 'function')
        ref(value);
    else if (ref)
        ref.current = value;
}
const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;
// Browsers without :focus-visible treat every focus as keyboard focus.
function isFocusVisible(element) {
    try {
        return element.matches(':focus-visible');
    }
    catch {
        return true;
    }
}
/** Short explanation shown on hover and keyboard focus. Figma: Tooltips. */
export function Tooltip({ title, description, open: openProp, onOpenChange, delay = 300, side = 'bottom', arrow = 'center', children, className }) {
    const id = useId();
    const [ownOpen, setOwnOpen] = useState(false);
    const open = openProp ?? ownOpen;
    const timer = useRef(undefined);
    const arrowRef = useRef(null);
    const floatingRef = useRef(null);
    const setOpen = useCallback((next) => {
        clearTimeout(timer.current);
        if (openProp === undefined)
            setOwnOpen(next);
        onOpenChange?.(next);
    }, [openProp, onOpenChange]);
    const later = (next, ms) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setOpen(next), ms);
    };
    useEffect(() => () => clearTimeout(timer.current), []);
    const { refs, floatingStyles, placement, middlewareData } = useFloating({
        open,
        placement: placementOf(side, arrow),
        strategy: 'fixed',
        // Follow scrolling and resizing only while open.
        whileElementsMounted: open ? autoUpdate : undefined,
        middleware: [
            // Shift a start or end aligned tooltip so its arrow, 16px in, points at the middle of the trigger.
            offset(({ rects }) => ({ mainAxis: GAP + ARROW_DEPTH, alignmentAxis: -(ARROW_INSET + ARROW_HALF) + (side === 'top' || side === 'bottom' ? rects.reference.width : rects.reference.height) / 2 })),
            flip(),
            shift({ padding: 8 }),
            arrowMiddleware({ element: arrowRef, padding: ARROW_INSET }),
        ],
    });
    // The popover top layer keeps the tooltip above everything and out of overflow clipping, while it still inherits
    // the theme from where it sits in the page.
    const shown = useRef(false);
    useIsomorphicLayoutEffect(() => {
        const element = floatingRef.current;
        if (!element || typeof element.showPopover !== 'function' || open === shown.current)
            return;
        if (open)
            element.showPopover();
        else
            element.hidePopover();
        shown.current = open;
    }, [open]);
    // Escape closes the tooltip before anything else hears it, such as a dialog around it.
    useEffect(() => {
        if (!open)
            return;
        const onKeyDown = (event) => {
            if (event.key !== 'Escape')
                return;
            event.stopPropagation();
            setOpen(false);
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [open, setOpen]);
    // Stable ref callbacks: a new function on every render would make floating-ui re-register the elements forever.
    const childRef = isValidElement(children) ? refOf(children) : undefined;
    const setTrigger = useCallback((node) => {
        refs.setReference(node);
        assignRef(childRef, node);
    }, [refs, childRef]);
    const setTooltip = useCallback((node) => {
        floatingRef.current = node;
        refs.setFloating(node);
    }, [refs]);
    if (!isValidElement(children))
        throw new Error('<Tooltip> butuh satu elemen sebagai pemicunya.');
    const trigger = children;
    const props = trigger.props;
    const call = (name, event) => props[name]?.(event);
    const arrowSide = OPPOSITE[placement.split('-')[0]];
    const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};
    return (_jsxs(_Fragment, { children: [cloneElement(trigger, {
                ref: setTrigger,
                'aria-describedby': [props['aria-describedby'], id].filter(Boolean).join(' '),
                onPointerEnter: (event) => {
                    call('onPointerEnter', event);
                    if (event.pointerType !== 'touch')
                        later(true, delay);
                },
                onPointerLeave: (event) => {
                    call('onPointerLeave', event);
                    later(false, 100);
                },
                onPointerDown: (event) => {
                    call('onPointerDown', event);
                    setOpen(false);
                },
                onFocus: (event) => {
                    call('onFocus', event);
                    // Keyboard focus only: a click also focuses a button, and the tooltip should not pop up then.
                    if (isFocusVisible(event.currentTarget))
                        setOpen(true);
                },
                onBlur: (event) => {
                    call('onBlur', event);
                    setOpen(false);
                },
            }), _jsxs("span", { ref: setTooltip, id: id, role: "tooltip", popover: "manual", className: cx('cargo-tooltip', className), "data-open": open || undefined, "data-side": arrowSide, style: floatingStyles, 
                // The pointer can move onto the tooltip without closing it (WCAG 1.4.13).
                onPointerEnter: () => clearTimeout(timer.current), onPointerLeave: () => later(false, 100), children: [_jsxs("span", { className: "cargo-tooltip__content", children: [title != null && _jsx("span", { className: "cargo-tooltip__title", children: title }), title != null && ' ', _jsx("span", { className: "cargo-tooltip__description", children: description })] }), _jsx("span", { ref: arrowRef, className: "cargo-tooltip__arrow", style: { left: arrowX, top: arrowY } })] })] }));
}
