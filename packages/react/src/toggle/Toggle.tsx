import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError } from '../internal/field.js';

interface ToggleOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Figma: Placeholder Text, the text beside the switch. */
  children?: ReactNode;
  /** Figma: Label Text above the switch, shown when Label is on. Read together with the text beside it. */
  label?: ReactNode;
  /** Figma: Description Text, shown when Description is on. */
  description?: ReactNode;
  /** Figma: Error Text, shown when Error is on. `true` marks the switch as invalid without a message. */
  error?: ReactNode;
}

/** A switch needs a name: its text, its label, or aria-label / aria-labelledby. */
export type ToggleProps = ToggleOwnProps &
  ({ children: ReactNode } | { label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string });

/** On/off switch that takes effect at once. Figma: Toggle (State=Active is `checked`). The ref is the <input>. */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { children, label, description, error, id, className, style, 'aria-labelledby': labelledBy, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const labelId = label != null ? `${inputId}-label` : undefined;
  const textId = children != null ? `${inputId}-text` : undefined;
  const invalid = isError(error);
  const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
  const errorId = invalid && hasMessage(error) ? `${inputId}-error` : undefined;

  return (
    <div className={cx('cargo-toggle', className)} style={style}>
      {label != null && (
        <div id={labelId} className="cargo-field__label">
          {label}
        </div>
      )}
      <label className="cargo-toggle__control">
        <span className="cargo-toggle__target">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="cargo-toggle__input"
            // With a label above, the switch is named by the label and the text beside it together.
            aria-labelledby={labelledBy ?? (labelId ? idList(labelId, textId) : undefined)}
            aria-invalid={invalid || undefined}
            aria-describedby={idList(descriptionId, errorId, describedBy)}
            {...rest}
          />
          <span className="cargo-toggle__track" aria-hidden="true">
            <span className="cargo-toggle__thumb" />
          </span>
        </span>
        {children != null && (
          <span id={textId} className="cargo-toggle__text">
            {children}
          </span>
        )}
      </label>
      {descriptionId && <FieldMessage id={descriptionId}>{description}</FieldMessage>}
      {errorId && (
        <FieldMessage id={errorId} tone="error">
          {error}
        </FieldMessage>
      )}
    </div>
  );
});
