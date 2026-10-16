import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type RequiredIndicator } from '../internal/field.js';
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
export type TextFieldProps = TextFieldOwnProps & ({
    label: ReactNode;
} | {
    label?: undefined;
    'aria-label': string;
} | {
    label?: undefined;
    'aria-labelledby': string;
});
/** Single-line text input. Figma: Text Field. The ref is the <input>. */
export declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=TextField.d.ts.map