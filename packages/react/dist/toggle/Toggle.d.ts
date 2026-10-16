import { type InputHTMLAttributes, type ReactNode } from 'react';
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
export type ToggleProps = ToggleOwnProps & ({
    children: ReactNode;
} | {
    label: ReactNode;
} | {
    'aria-label': string;
} | {
    'aria-labelledby': string;
});
/** On/off switch that takes effect at once. Figma: Toggle (State=Active is `checked`). The ref is the <input>. */
export declare const Toggle: import("react").ForwardRefExoticComponent<ToggleProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=Toggle.d.ts.map