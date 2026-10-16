import type { ReactNode } from 'react';
export declare const REQUIRED_INDICATORS: readonly ['text', 'symbol'];
export type RequiredIndicator = (typeof REQUIRED_INDICATORS)[number];
/** Figma: Required Object, Type=Text "(Required)" or Type=Symbol "*". Hidden from screen readers, which announce the
 * field's `required` attribute instead. */
export declare function RequiredMark({ indicator }: {
    indicator: RequiredIndicator;
}): import("react").JSX.Element;
/** Figma: Description, Type=Normal (`tone` normal) or Type=Error. */
export declare function FieldMessage({ id, tone, children }: {
    id: string;
    tone?: 'normal' | 'error';
    children: ReactNode;
}): import("react").JSX.Element;
/** Whether an `error` prop puts the field in the error state: any value except null, undefined and false. */
export declare const isError: (error: ReactNode) => boolean;
/** Whether an `error` prop also has a message to show (`error={true}` only marks the field). */
export declare const hasMessage: (node: ReactNode) => boolean;
/** Joins element IDs for aria-describedby, leaving out the empty ones. */
export declare const idList: (...ids: Array<string | false | null | undefined>) => string | undefined;
//# sourceMappingURL=field.d.ts.map