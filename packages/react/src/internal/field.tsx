// Pieces shared by the form fields: the required mark next to a label and the helper text below a field.
import type { ReactNode } from 'react';

export const REQUIRED_INDICATORS = ['text', 'symbol'] as const;
export type RequiredIndicator = (typeof REQUIRED_INDICATORS)[number];

/** Figma: Required Object, Type=Text "(Required)" or Type=Symbol "*". Hidden from screen readers, which announce the
 * field's `required` attribute instead. */
export function RequiredMark({ indicator }: { indicator: RequiredIndicator }) {
  return (
    <span className="cargo-field__required" data-indicator={indicator} aria-hidden="true">
      {indicator === 'symbol' ? '*' : '(Required)'}
    </span>
  );
}

/** Figma: Description, Type=Normal (`tone` normal) or Type=Error. */
export function FieldMessage({ id, tone = 'normal', children }: { id: string; tone?: 'normal' | 'error'; children: ReactNode }) {
  return (
    <div id={id} className="cargo-field__message" data-tone={tone}>
      {children}
    </div>
  );
}

/** Whether an `error` prop puts the field in the error state: any value except null, undefined and false. */
export const isError = (error: ReactNode): boolean => error != null && error !== false;

/** Whether an `error` prop also has a message to show (`error={true}` only marks the field). */
export const hasMessage = (node: ReactNode): boolean => node != null && typeof node !== 'boolean' && node !== '';

/** Joins element IDs for aria-describedby, leaving out the empty ones. */
export const idList = (...ids: Array<string | false | null | undefined>): string | undefined => ids.filter(Boolean).join(' ') || undefined;
