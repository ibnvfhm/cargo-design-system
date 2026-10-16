import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export declare const CHIP_VARIANTS: readonly ['filter', 'input'];
export declare const CHIP_SIZES: readonly ['md', 'sm'];
export type ChipVariant = (typeof CHIP_VARIANTS)[number];
export type ChipSize = (typeof CHIP_SIZES)[number];
interface ChipBaseProps {
    /** Figma: Label. */
    children: ReactNode;
    /** Figma: Size. md is 28px high, sm 24px. */
    size?: ChipSize;
    /** Figma: Icon with Change Icon. Sized 16px and coloured by the chip. */
    icon?: ReactNode;
}
/** Figma: Type=Filter. A toggle button: State=Selected is `selected`. */
export interface FilterChipProps extends ChipBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
    variant?: 'filter';
    /** Whether the filter is on, when the parent keeps it. */
    selected?: boolean;
    /** Whether the filter is on at first, when the chip keeps it itself. */
    defaultSelected?: boolean;
    /** Called with the new state when the chip is clicked. */
    onSelectedChange?: (selected: boolean) => void;
    onRemove?: never;
    removeLabel?: never;
}
/** Figma: Type=Input. A chosen value with a remove button. */
export interface InputChipProps extends ChipBaseProps, Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    variant: 'input';
    /** Called when the remove button (X) is pressed. */
    onRemove?: () => void;
    /** Screen reader name of the remove button. Defaults to "Hapus" and the label. */
    removeLabel?: string;
    /** Figma: State=Disabled. */
    disabled?: boolean;
    selected?: never;
    defaultSelected?: never;
    onSelectedChange?: never;
}
export type ChipProps = FilterChipProps | InputChipProps;
/** Chip. Figma: Chip. The ref is the <button> of a filter chip, or the outer <span> of an input chip. */
export declare const Chip: import("react").ForwardRefExoticComponent<ChipProps & import("react").RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=Chip.d.ts.map