import { type FieldsetHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { type RequiredIndicator } from '../internal/field.js';
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
export declare const RadioGroup: import("react").ForwardRefExoticComponent<RadioGroupProps & import("react").RefAttributes<HTMLFieldSetElement>>;
interface RadioButtonOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'children'> {
    /** The value the group reports when this radio is chosen. */
    value: string;
    /** Figma: Placeholder Text, the text beside the circle. It is the radio's name. */
    children?: ReactNode;
    /** Figma: Description Text under this one choice. */
    description?: ReactNode;
}
/** A radio needs a name: its text, or aria-label / aria-labelledby. */
export type RadioButtonProps = RadioButtonOwnProps & ({
    children: ReactNode;
} | {
    'aria-label': string;
} | {
    'aria-labelledby': string;
});
/** One choice in a RadioGroup. Figma: Radio Button. The ref is the <input>. */
export declare const RadioButton: import("react").ForwardRefExoticComponent<RadioButtonProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=RadioButton.d.ts.map