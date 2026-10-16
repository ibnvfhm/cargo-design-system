import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark, type RequiredIndicator } from '../internal/field.js';
import type { CheckboxSize } from './Checkbox.js';

export interface CheckboxGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Figma: Label Text on the first Checkbox, shown when Label is on. The group's name. */
  label: ReactNode;
  /** Figma: Required Object. Shows the required mark; checking that something is ticked is up to the app. */
  required?: boolean;
  /** Figma: Required Object's Type. Checkbox uses "*". */
  requiredIndicator?: RequiredIndicator;
  /** Figma: Description Text, for the whole group. */
  description?: ReactNode;
  /** Figma: Error Text, for the whole group. `true` marks it without a message. */
  error?: ReactNode;
  /** Figma: Size, for the label, the messages and every checkbox without a size of its own. */
  size?: CheckboxSize;
  children?: ReactNode;
}

/** A labelled group of checkboxes: a <fieldset> whose <legend> is the Figma Label. The ref is the <fieldset>. */
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(function CheckboxGroup(
  { label, required = false, requiredIndicator = 'symbol', description, error, size, id, className, children, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const groupId = id ?? autoId;
  const invalid = isError(error);
  const descriptionId = hasMessage(description) ? `${groupId}-description` : undefined;
  const errorId = invalid && hasMessage(error) ? `${groupId}-error` : undefined;

  return (
    <fieldset
      ref={ref}
      id={groupId}
      className={cx('cargo-checkbox-group', className)}
      data-size={size}
      data-invalid={invalid || undefined}
      aria-describedby={idList(descriptionId, errorId, describedBy)}
      {...rest}
    >
      <legend className="cargo-field__label cargo-checkbox-group__label">
        {label}
        {required && <RequiredMark indicator={requiredIndicator} />}
      </legend>
      <div className="cargo-checkbox-group__items">{children}</div>
      {descriptionId && <FieldMessage id={descriptionId}>{description}</FieldMessage>}
      {errorId && (
        <FieldMessage id={errorId} tone="error">
          {error}
        </FieldMessage>
      )}
    </fieldset>
  );
});
