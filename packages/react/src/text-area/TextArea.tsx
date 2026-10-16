'use client';
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark, type RequiredIndicator } from '../internal/field.js';

interface TextAreaOwnProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Figma: Label Text, shown when Label is on. */
  label?: ReactNode;
  /** Sets the textarea's `required` attribute and shows the required mark, like Text Field's Required Object. */
  required?: boolean;
  /** "(Required)" or "*", as in Text Field. */
  requiredIndicator?: RequiredIndicator;
  /** Figma: Description Text, shown when Description is on. */
  description?: ReactNode;
  /** Figma: Error Text and State=Danger. Marks the field as invalid; `true` marks it without a message. */
  error?: ReactNode;
  /** Figma: Counter. The number of characters, out of maxLength when it is set (0/100). */
  counter?: boolean;
}

/** A field needs a name: a visible label, or aria-label / aria-labelledby when the layout has no room for one. */
export type TextAreaProps = TextAreaOwnProps &
  ({ label: ReactNode } | { label?: undefined; 'aria-label': string } | { label?: undefined; 'aria-labelledby': string });

/** Multi-line text input. Figma: Text Area. The ref is the <textarea>. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    required = false,
    requiredIndicator = 'text',
    description,
    error,
    counter = false,
    id,
    className,
    style,
    placeholder,
    value,
    defaultValue,
    maxLength,
    onChange,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);
  // The counter follows `value` when the parent controls it, and its own count otherwise.
  const [ownLength, setOwnLength] = useState(() => String(defaultValue ?? '').length);
  const length = value !== undefined ? String(value).length : ownLength;
  // Text typed before hydration, or restored by the browser, arrives without a change event.
  useEffect(() => {
    if (textareaRef.current) setOwnLength(textareaRef.current.value.length);
  }, []);

  const invalid = isError(error);
  const descriptionId = hasMessage(description) ? `${fieldId}-description` : undefined;
  const errorId = invalid && hasMessage(error) ? `${fieldId}-error` : undefined;
  const counterId = counter ? `${fieldId}-counter` : undefined;

  return (
    <div className={cx('cargo-text-area', className)} style={style}>
      {label != null && (
        <label className="cargo-field__label" htmlFor={fieldId}>
          {label}
          {required && <RequiredMark indicator={requiredIndicator} />}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={fieldId}
        className="cargo-text-area__input"
        // A blank placeholder keeps :placeholder-shown working, which tells the CSS whether the field is empty.
        placeholder={placeholder ?? ' '}
        required={required}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={(event) => {
          if (value === undefined) setOwnLength(event.currentTarget.value.length);
          onChange?.(event);
        }}
        aria-invalid={invalid || undefined}
        aria-describedby={idList(errorId, descriptionId, counterId, describedBy)}
        {...rest}
      />
      {(descriptionId || errorId || counterId) && (
        <div className="cargo-text-area__helper">
          {(descriptionId || errorId) && (
            <div className="cargo-text-area__messages">
              {descriptionId && <FieldMessage id={descriptionId}>{description}</FieldMessage>}
              {errorId && (
                <FieldMessage id={errorId} tone="error">
                  {error}
                </FieldMessage>
              )}
            </div>
          )}
          {counterId && (
            <div id={counterId} className="cargo-field__message cargo-text-area__counter">
              {maxLength != null ? `${length}/${maxLength}` : length}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
