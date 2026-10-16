import { type ReactNode, type TextareaHTMLAttributes } from 'react';
import { type RequiredIndicator } from '../internal/field.js';
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
export type TextAreaProps = TextAreaOwnProps & ({
    label: ReactNode;
} | {
    label?: undefined;
    'aria-label': string;
} | {
    label?: undefined;
    'aria-labelledby': string;
});
/** Multi-line text input. Figma: Text Area. The ref is the <textarea>. */
export declare const TextArea: import("react").ForwardRefExoticComponent<TextAreaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export {};
//# sourceMappingURL=TextArea.d.ts.map