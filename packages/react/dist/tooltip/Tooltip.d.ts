import { type ReactElement, type ReactNode } from 'react';
export declare const TOOLTIP_SIDES: readonly ['top', 'bottom', 'left', 'right'];
export type TooltipSide = (typeof TOOLTIP_SIDES)[number];
interface TooltipOwnProps {
    /** Figma: Title Text, shown when Title is on. */
    title?: ReactNode;
    /** Figma: Description. Read by screen readers as the trigger's description. */
    description: ReactNode;
    /** Opens the tooltip from the parent; leave it out to open on hover and keyboard focus. */
    open?: boolean;
    /** Called when the tooltip wants to open or close: hover, focus, Escape. */
    onOpenChange?: (open: boolean) => void;
    /** Milliseconds the pointer rests on the trigger before the tooltip opens. */
    delay?: number;
    /** The element the tooltip explains. It must take a ref and pass on pointer and focus events, like Button does. */
    children: ReactElement;
    className?: string;
}
/** Figma: Side and Arrow. Top and Bottom take Left, Center or Right; Left and Right take Top, Center or Bottom. */
export type TooltipProps = TooltipOwnProps & ({
    side?: 'top' | 'bottom';
    arrow?: 'left' | 'center' | 'right';
} | {
    side: 'left' | 'right';
    arrow?: 'top' | 'center' | 'bottom';
});
/** Short explanation shown on hover and keyboard focus. Figma: Tooltips. */
export declare function Tooltip({ title, description, open: openProp, onOpenChange, delay, side, arrow, children, className }: TooltipProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Tooltip.d.ts.map