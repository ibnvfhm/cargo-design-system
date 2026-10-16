import { type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { type RequiredIndicator } from '../internal/field.js';
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
export declare const CheckboxGroup: import("react").ForwardRefExoticComponent<CheckboxGroupProps & import("react").RefAttributes<HTMLFieldSetElement>>;
//# sourceMappingURL=CheckboxGroup.d.ts.map