import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { Device } from '../internal/types.js';
export declare const BUTTON_VARIANTS: readonly ['primary', 'secondary', 'tertiary', 'outlined', 'borderless', 'danger', 'danger-outlined', 'danger-borderless'];
export declare const BUTTON_SIZES: readonly ['lg', 'md', 'sm'];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
interface ButtonOwnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Figma: Type. Renamed because HTML already uses `type` (button, submit, reset). */
    variant?: ButtonVariant;
    /** Figma: Size. */
    size?: ButtonSize;
    /** Figma: Device. Without it, the screen width decides: Mobile below 768px, Desktop from 768px. */
    device?: Device;
    /** Figma: Left Icon with its Swap Left Icon. Sized and coloured by the button. */
    leftIcon?: ReactNode;
    /** Figma: Right Icon with its Swap Right Icon. */
    rightIcon?: ReactNode;
}
/** A button with text. Figma: Text, with Show Text on. */
export interface ButtonWithTextProps extends ButtonOwnProps {
    children: ReactNode;
}
/** An icon-only button (Figma: Show Text off) needs a name for screen readers. */
export type IconButtonProps = ButtonOwnProps & {
    children?: never;
} & ({
    'aria-label': string;
} | {
    'aria-labelledby': string;
});
export type ButtonProps = ButtonWithTextProps | IconButtonProps;
/** Button. Figma: Button. */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map