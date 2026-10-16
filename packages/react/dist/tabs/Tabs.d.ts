import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export declare const TABS_VARIANTS: readonly ['default', 'no-underline'];
export type TabsVariant = (typeof TABS_VARIANTS)[number];
interface TabsOwnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** Figma: Type. Default draws the underline, No Underline leaves it out (for tabs inside a card). */
    variant?: TabsVariant;
    /** Called with the value of the tab that was chosen. */
    onValueChange?: (value: string) => void;
    children?: ReactNode;
}
/** Which tab is open: `value` when the parent keeps it, `defaultValue` when Tabs keeps it itself. */
export type TabsProps = TabsOwnProps & ({
    value: string;
    defaultValue?: never;
} | {
    value?: never;
    defaultValue: string;
});
/** Tabs: a TabList of Tab buttons and a TabPanel per tab. Figma: Tabs. The ref is the outer <div>. */
export declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<HTMLDivElement>>;
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
/** The row of tabs (role="tablist"). Name it with aria-label when nothing on the page does. */
export declare const TabList: import("react").ForwardRefExoticComponent<TabListProps & import("react").RefAttributes<HTMLDivElement>>;
export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'> {
    /** Links the tab to the TabPanel with the same value. */
    value: string;
    /** Figma: Label Text, shown when Label is on. */
    children?: ReactNode;
    /** Figma: Icon (Type=Regular). Sized 22px and coloured by the tab. */
    icon?: ReactNode;
    /** Figma: the icon of State=Active (Type=Fill). Falls back to `icon`. */
    activeIcon?: ReactNode;
    /** Figma: Number, a Counter badge after the label. */
    number?: ReactNode;
}
/** One tab. Figma: one Tabs component (State=Active when it is open). The ref is the <button>. */
export declare const Tab: import("react").ForwardRefExoticComponent<TabProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    /** The value of the Tab that opens this panel. */
    value: string;
    children?: ReactNode;
}
/** The content of one tab (role="tabpanel"), hidden while its tab is closed. The ref is the <div>. */
export declare const TabPanel: import("react").ForwardRefExoticComponent<TabPanelProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Tabs.d.ts.map