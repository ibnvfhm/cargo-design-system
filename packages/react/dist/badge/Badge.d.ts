import { type HTMLAttributes, type ReactNode } from 'react';
export declare const BADGE_TYPES: readonly ['label', 'counter', 'dot'];
export declare const BADGE_VARIANTS: readonly ['primary', 'info', 'warning', 'success', 'danger', 'gray', 'accent'];
export declare const BADGE_SIZES: readonly ['md', 'sm', 'xs'];
export declare const BADGE_APPEARANCES: readonly ['subtle', 'solid'];
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
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Badge.d.ts.map