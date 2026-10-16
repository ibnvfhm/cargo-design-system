'use client';
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError } from '../internal/field.js';
import { CheckIcon, MinusCircleIcon } from '../internal/icons.js';

export const CHECKBOX_SIZES = ['md', 'sm'] as const;
export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

interface CheckboxOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'> {
  /** Figma: Placeholder Text, the text beside the box. It is the checkbox's name. */
  children?: ReactNode;
  /** Figma: Size. Without it, a checkbox takes the size of its CheckboxGroup, or md. */
  size?: CheckboxSize;
  /** Figma: Type=Indeterminate. Some of the items it stands for are checked, such as a "select all" box. */
  indeterminate?: boolean;
  /** Figma: Description Text, shown when Description is on. */
  description?: ReactNode;
  /** Figma: Error Text, shown when Error is on. Marks the checkbox as invalid; `true` marks it without a message. */
  error?: ReactNode;
}

/** A checkbox needs a name: its text, or aria-label / aria-labelledby when it stands alone, such as in a table. */
export type CheckboxProps = CheckboxOwnProps &
  ({ children: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string });

/** Checkbox. Figma: Checkbox. The ref is the <input>. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { children, size, indeterminate = false, description, error, id, className, style, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);
  // HTML has no indeterminate attribute; the property is set after every render, and data-indeterminate draws the
  // minus before hydration.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  });

  const invalid = isError(error);
  const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
  const errorId = invalid && hasMessage(error) ? `${inputId}-error` : undefined;

  return (
    <div className={cx('cargo-checkbox', className)} style={style} data-size={size}>
      <label className="cargo-checkbox__control">
        <span className="cargo-checkbox__target">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            className="cargo-checkbox__input"
            data-indeterminate={indeterminate || undefined}
            aria-invalid={invalid || undefined}
            aria-describedby={idList(descriptionId, errorId, describedBy)}
            {...rest}
          />
          <span className="cargo-checkbox__box" aria-hidden="true">
            <CheckIcon className="cargo-checkbox__check" />
            <MinusCircleIcon className="cargo-checkbox__minus" />
          </span>
        </span>
        {children != null && <span className="cargo-checkbox__text">{children}</span>}
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
