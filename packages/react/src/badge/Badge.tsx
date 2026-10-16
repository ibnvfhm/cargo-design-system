import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';

export const BADGE_TYPES = ['label', 'counter', 'dot'] as const;
export const BADGE_VARIANTS = ['primary', 'info', 'warning', 'success', 'danger', 'gray', 'accent'] as const;
export const BADGE_SIZES = ['md', 'sm', 'xs'] as const;
export const BADGE_APPEARANCES = ['subtle', 'solid'] as const;

export type BadgeType = (typeof BADGE_TYPES)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export type BadgeSize = (typeof BADGE_SIZES)[number];
export type BadgeAppearance = (typeof BADGE_APPEARANCES)[number];

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Figma: Type. A label with text, a number in a circle, or a dot. */
  type?: BadgeType;
  /** Figma: Variant. The colour and its meaning. */
  variant?: BadgeVariant;
  /** Figma: Size. */
  size?: BadgeSize;
  /** Figma: Style. Renamed because React already uses `style`. */
  appearance?: BadgeAppearance;
  /** Figma: Text (Label) or Notification (Counter). On a dot it is read by screen readers only. */
  children?: ReactNode;
  /** Figma: .AddOn Left with Change Left Icon. Label only. */
  leftIcon?: ReactNode;
  /** Figma: .AddOn Right with Change Right Icon. Label only. */
  rightIcon?: ReactNode;
}

/** Badge. Figma: Badge. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { type = 'label', variant = 'primary', size = 'md', appearance = 'subtle', children, leftIcon, rightIcon, className, ...rest },
  ref,
) {
  const shared = {
    ref,
    className: cx('cargo-badge', className),
    'data-type': type,
    'data-variant': variant,
    'data-size': size,
    'data-appearance': appearance,
  };
  if (type === 'dot') {
    // A dot without text is decoration; with text, the text is announced instead of the colour.
    return (
      <span {...shared} aria-hidden={children == null ? true : undefined} {...rest}>
        <span className="cargo-badge__dot" />
        {children != null && <span className="cargo-visually-hidden">{children}</span>}
      </span>
    );
  }
  return (
    <span {...shared} {...rest}>
      {type === 'label' && leftIcon != null && (
        <span className="cargo-badge__icon" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children}
      {type === 'label' && rightIcon != null && (
        <span className="cargo-badge__icon" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </span>
  );
});
