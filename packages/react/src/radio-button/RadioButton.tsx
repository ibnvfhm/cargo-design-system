'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../internal/cx.js';
import { FieldMessage, hasMessage, idList, isError, RequiredMark, type RequiredIndicator } from '../internal/field.js';

interface RadioGroupContext {
  name: string;
  value?: string;
  defaultValue?: string;
  required: boolean;
  select: (value: string) => void;
}

const Group = createContext<RadioGroupContext | null>(null);

export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  /** Figma: Label Text, shown when Label is on. The group's name. */
  label: ReactNode;
  /** Figma: Required. Shows the required mark and makes the browser ask for a choice. */
  required?: boolean;
  /** Figma: Required's Type. Radio Button uses "*". */
  requiredIndicator?: RequiredIndicator;
  /** Figma: Description Text, for the whole group. */
  description?: ReactNode;
  /** Figma: Error Text, for the whole group. `true` marks it without a message. */
  error?: ReactNode;
  /** The `name` of every radio in the group, for forms. Made up when left out. */
  name?: string;
  /** The selected value, when the parent keeps it (Figma: State=Selected). */
  value?: string;
  /** The value selected at first, when the group keeps it itself. */
  defaultValue?: string;
  /** Called with the value of the radio that was chosen. */
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

/** A group of radio buttons with one choice: a <fieldset> whose <legend> is the Figma Label. The ref is the
 * <fieldset>. */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  {
    label,
    required = false,
    requiredIndicator = 'symbol',
    description,
    error,
    name,
    value,
    defaultValue,
    onValueChange,
    id,
    className,
    children,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const groupId = id ?? autoId;
  const invalid = isError(error);
  const legendId = `${groupId}-label`;
  const descriptionId = hasMessage(description) ? `${groupId}-description` : undefined;
  const errorId = invalid && hasMessage(error) ? `${groupId}-error` : undefined;
  const context: RadioGroupContext = {
    name: name ?? groupId,
    value,
    defaultValue,
    required,
    select: (chosen) => onValueChange?.(chosen),
  };

  return (
    <fieldset
      ref={ref}
      id={groupId}
      className={cx('cargo-radio-group', className)}
      role="radiogroup"
      aria-labelledby={legendId}
      aria-describedby={idList(descriptionId, errorId, describedBy)}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      <legend id={legendId} className="cargo-field__label cargo-radio-group__label">
        {label}
        {required && <RequiredMark indicator={requiredIndicator} />}
      </legend>
      <div className="cargo-radio-group__items">
        <Group.Provider value={context}>{children}</Group.Provider>
      </div>
      {descriptionId && <FieldMessage id={descriptionId}>{description}</FieldMessage>}
      {errorId && (
        <FieldMessage id={errorId} tone="error">
          {error}
        </FieldMessage>
      )}
    </fieldset>
  );
});

interface RadioButtonOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'children'> {
  /** The value the group reports when this radio is chosen. */
  value: string;
  /** Figma: Placeholder Text, the text beside the circle. It is the radio's name. */
  children?: ReactNode;
  /** Figma: Description Text under this one choice. */
  description?: ReactNode;
}

/** A radio needs a name: its text, or aria-label / aria-labelledby. */
export type RadioButtonProps = RadioButtonOwnProps &
  ({ children: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string });

/** One choice in a RadioGroup. Figma: Radio Button. The ref is the <input>. */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { value, children, description, id, className, style, onChange, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const group = useContext(Group);
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = hasMessage(description) ? `${inputId}-description` : undefined;
  // Inside a group, the group decides which radio is checked, either from its value or from its defaultValue.
  const checked = group
    ? group.value !== undefined
      ? { checked: group.value === value }
      : { defaultChecked: group.defaultValue === value }
    : {};

  return (
    <div className={cx('cargo-radio', className)} style={style}>
      <label className="cargo-radio__control">
        <span className="cargo-radio__target">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="cargo-radio__input"
            name={group?.name}
            value={value}
            required={group?.required || undefined}
            aria-describedby={idList(descriptionId, describedBy)}
            onChange={(event) => {
              group?.select(value);
              onChange?.(event);
            }}
            {...checked}
            {...rest}
          />
          <span className="cargo-radio__circle" aria-hidden="true" />
        </span>
        {children != null && <span className="cargo-radio__text">{children}</span>}
      </label>
      {descriptionId && <FieldMessage id={descriptionId}>{description}</FieldMessage>}
    </div>
  );
});
