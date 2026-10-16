import { type InputHTMLAttributes, type ReactNode } from 'react';
export declare const CHECKBOX_SIZES: readonly ['md', 'sm'];
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
export type CheckboxProps = CheckboxOwnProps & ({
    children: ReactNode;
} | {
    'aria-label': string;
} | {
    'aria-labelledby': string;
});
/** Checkbox. Figma: Checkbox. The ref is the <input>. */
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map