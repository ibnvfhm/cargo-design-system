'use client';
import { forwardRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cx } from '../internal/cx.js';
import { CheckIcon, XIcon } from '../internal/icons.js';

export const CHIP_VARIANTS = ['filter', 'input'] as const;
export const CHIP_SIZES = ['md', 'sm'] as const;
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
export const Chip = forwardRef<HTMLElement, ChipProps>(function Chip(props, ref) {
  // The hook runs for both variants, so the order of hooks never changes.
  const [ownSelected, setOwnSelected] = useState(props.variant !== 'input' && (props.defaultSelected ?? false));

  if (props.variant === 'input') {
    const { variant, size = 'md', icon, children, onRemove, removeLabel, disabled = false, className, ...rest } = props;
    return (
      <span
        ref={ref}
        className={cx('cargo-chip', className)}
        data-variant={variant}
        data-size={size}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {icon != null && (
          <span className="cargo-chip__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="cargo-chip__label">{children}</span>
        <button
          type="button"
          className="cargo-chip__remove"
          aria-label={removeLabel ?? (typeof children === 'string' ? `Hapus ${children}` : 'Hapus')}
          disabled={disabled}
          onClick={onRemove}
        >
          <XIcon />
        </button>
      </span>
    );
  }

  const { variant = 'filter', size = 'md', icon, children, selected, defaultSelected, onSelectedChange, onClick, className, ...rest } = props;
  const isSelected = selected ?? ownSelected;
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={cx('cargo-chip', className)}
      data-variant={variant}
      data-size={size}
      aria-pressed={isSelected}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (selected === undefined) setOwnSelected(!isSelected);
        onSelectedChange?.(!isSelected);
      }}
      {...rest}
    >
      {isSelected && <CheckIcon className="cargo-chip__check" />}
      {icon != null && (
        <span className="cargo-chip__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="cargo-chip__label">{children}</span>
    </button>
  );
});
