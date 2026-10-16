'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, forwardRef, useContext, useId, useState, } from 'react';
import { Badge } from '../badge/Badge.js';
import { cx } from '../internal/cx.js';
export const TABS_VARIANTS = ['default', 'no-underline'];
const Context = createContext(null);
function useTabs(part) {
    const context = useContext(Context);
    if (!context)
        throw new Error(`<${part}> harus berada di dalam <Tabs>.`);
    return context;
}
const idOf = (baseId, kind, value) => `${baseId}-${kind}-${value.replace(/\s+/g, '-')}`;
/** Tabs: a TabList of Tab buttons and a TabPanel per tab. Figma: Tabs. The ref is the outer <div>. */
export const Tabs = forwardRef(function Tabs({ variant = 'default', value, defaultValue, onValueChange, className, children, ...rest }, ref) {
    const baseId = useId();
    const [ownValue, setOwnValue] = useState(defaultValue);
    const current = value ?? ownValue;
    const select = (next) => {
        if (next === current)
            return;
        if (value === undefined)
            setOwnValue(next);
        onValueChange?.(next);
    };
    return (_jsx(Context.Provider, { value: { value: current, select, baseId }, children: _jsx("div", { ref: ref, className: cx('cargo-tabs', className), "data-variant": variant, ...rest, children: children }) }));
});
// Arrow keys move to the previous or next tab and open it; Home and End go to the first and last.
const STEPS = {
    ArrowRight: (index) => index + 1,
    ArrowLeft: (index) => index - 1,
    Home: () => 0,
    End: (_index, count) => count - 1,
};
/** The row of tabs (role="tablist"). Name it with aria-label when nothing on the page does. */
export const TabList = forwardRef(function TabList({ className, onKeyDown, children, ...rest }, ref) {
    useTabs('TabList');
    const move = (event) => {
        onKeyDown?.(event);
        const step = STEPS[event.key];
        if (event.defaultPrevented || !step)
            return;
        const list = event.currentTarget;
        const tabs = [...list.querySelectorAll('[role="tab"]:not(:disabled)')].filter((tab) => tab.closest('[role="tablist"]') === list);
        const index = tabs.indexOf(event.target);
        if (index < 0)
            return;
        event.preventDefault();
        const next = tabs[(step(index, tabs.length) + tabs.length) % tabs.length];
        next?.focus();
        next?.click();
    };
    return (_jsx("div", { ref: ref, role: "tablist", className: cx('cargo-tabs__list', className), onKeyDown: move, ...rest, children: children }));
});
/** One tab. Figma: one Tabs component (State=Active when it is open). The ref is the <button>. */
export const Tab = forwardRef(function Tab({ value, children, icon, activeIcon, number, className, onClick, ...rest }, ref) {
    const tabs = useTabs('Tab');
    const selected = tabs.value === value;
    const shownIcon = selected && activeIcon != null ? activeIcon : icon;
    return (_jsxs("button", { ref: ref, type: "button", role: "tab", id: idOf(tabs.baseId, 'tab', value), "aria-selected": selected, "aria-controls": idOf(tabs.baseId, 'panel', value), 
        // Only the open tab is in the tab order; the arrow keys reach the others.
        tabIndex: selected ? 0 : -1, className: cx('cargo-tab', className), onClick: (event) => {
            onClick?.(event);
            if (!event.defaultPrevented)
                tabs.select(value);
        }, ...rest, children: [shownIcon != null && (_jsx("span", { className: "cargo-tab__icon", "aria-hidden": "true", children: shownIcon })), children != null && _jsx("span", { className: "cargo-tab__label", children: children }), children != null && number != null && ' ', number != null && _jsx(Badge, { type: "counter", children: number })] }));
});
/** The content of one tab (role="tabpanel"), hidden while its tab is closed. The ref is the <div>. */
export const TabPanel = forwardRef(function TabPanel({ value, className, children, ...rest }, ref) {
    const tabs = useTabs('TabPanel');
    const selected = tabs.value === value;
    return (_jsx("div", { ref: ref, role: "tabpanel", id: idOf(tabs.baseId, 'panel', value), "aria-labelledby": idOf(tabs.baseId, 'tab', value), hidden: !selected, tabIndex: 0, className: cx('cargo-tab-panel', className), ...rest, children: children }));
});
