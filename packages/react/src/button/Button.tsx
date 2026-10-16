import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';
import type { Device } from '../internal/types.js';

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'outlined',
  'borderless',
  'danger',
  'danger-outlined',
  'danger-borderless',
] as const;
export const BUTTON_SIZES = ['lg', 'md', 'sm'] as const;

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
export type IconButtonProps = ButtonOwnProps & { children?: never } & ({ 'aria-label': string } | { 'aria-labelledby': string });

export type ButtonProps = ButtonWithTextProps | IconButtonProps;

/** Button. Figma: Button. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'lg', device, leftIcon, rightIcon, children, type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('cargo-button', className)}
      data-variant={variant}
      data-size={size}
      data-device={device}
      {...rest}
    >
      {leftIcon != null && (
        <span className="cargo-button__icon" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children != null && children !== false && <span className="cargo-button__label">{children}</span>}
      {rightIcon != null && (
        <span className="cargo-button__icon" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});
