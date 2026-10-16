'use client';
import { forwardRef, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark, type RequiredIndicator } from '../internal/field.js';
import { XCircleIcon } from '../internal/icons.js';
import type { Device } from '../internal/types.js';

interface TextFieldOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Figma: Label Text, shown when Label is on. */
  label?: ReactNode;
  /** Figma: Required Object. Also sets the input's `required` attribute. */
  required?: boolean;
  /** Figma: Required Object's Type. "(Required)" or "*". */
  requiredIndicator?: RequiredIndicator;
  /** Figma: Description with Type=Normal. Help text below the field. */
  description?: ReactNode;
  /** Figma: Description with Type=Error. Replaces the description and marks the field as invalid; `true` marks it
   * without a message. */
  error?: ReactNode;
  /** Figma: Left Placeholder Icon with its Change icon. Decorative, sized by Device. */
  leftIcon?: ReactNode;
  /** Figma: Right Placeholder Icon with its Change icon. */
  rightIcon?: ReactNode;
  /** Figma: Type=Prefix. Text or icons in a box at the start, such as +62. */
  prefix?: ReactNode;
  /** Figma: Type=Suffix. Text or icons in a box at the end, such as kg. */
  suffix?: ReactNode;
  /** Figma: State=Pressed shows a clear button once the field has a value. */
  clearable?: boolean;
  /** Screen reader name of the clear button. */
  clearLabel?: string;
  /** Figma: Device. Without it, the screen width decides: Mobile below 768px, Desktop from 768px. */
  device?: Device;
}

/** A field needs a name: a visible label, or aria-label / aria-labelledby when the layout has no room for one. */
export type TextFieldProps = TextFieldOwnProps &
  ({ label: ReactNode } | { label?: undefined; 'aria-label': string } | { label?: undefined; 'aria-labelledby': string });

/** Single-line text input. Figma: Text Field. The ref is the <input>. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    required = false,
    requiredIndicator = 'text',
    description,
    error,
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    clearable = true,
    clearLabel = 'Hapus isian',
    device,
    id,
    className,
    style,
    placeholder,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const invalid = isError(error);
  const message = invalid && hasMessage(error) ? error : description;
  const prefixId = prefix != null ? `${inputId}-prefix` : undefined;
  const suffixId = suffix != null ? `${inputId}-suffix` : undefined;
  const messageId = hasMessage(message) ? `${inputId}-message` : undefined;

  // Empties the field the way typing would, so onChange runs for controlled and uncontrolled inputs alike.
  const clear = () => {
    const input = inputRef.current;
    if (!input) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  };

  return (
    <div className={cx('cargo-text-field', className)} style={style} data-device={device}>
      {label != null && (
        <label className="cargo-field__label" htmlFor={inputId}>
          {label}
          {required && <RequiredMark indicator={requiredIndicator} />}
        </label>
      )}
      <div className="cargo-text-field__field" data-invalid={invalid || undefined}>
        {prefix != null && (
          <span id={prefixId} className="cargo-text-field__affix" data-side="start">
            {prefix}
          </span>
        )}
        {leftIcon != null && (
          <span className="cargo-text-field__icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          className="cargo-text-field__input"
          // A blank placeholder keeps :placeholder-shown working, which tells the CSS whether the field is empty.
          placeholder={placeholder ?? ' '}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={idList(prefixId, suffixId, messageId, describedBy)}
          {...rest}
        />
        {clearable && (
          // Out of the tab order, like most clear buttons: the keyboard clears a field by selecting and deleting.
          <button
            type="button"
            className="cargo-text-field__clear"
            tabIndex={-1}
            aria-label={clearLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clear}
          >
            <XCircleIcon />
          </button>
        )}
        {rightIcon != null && (
          <span className="cargo-text-field__icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}
        {suffix != null && (
          <span id={suffixId} className="cargo-text-field__affix" data-side="end">
            {suffix}
          </span>
        )}
      </div>
      {messageId && (
        <FieldMessage id={messageId} tone={invalid ? 'error' : 'normal'}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
});
