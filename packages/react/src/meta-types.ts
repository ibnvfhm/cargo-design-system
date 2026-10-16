// How a code component maps to its Figma component set. The docs site renders the Kode tab from this, and its build
// fails when a Figma variant property, value or component property has no counterpart here.

export interface PropMeta {
  /** The prop name in code. */
  name: string;
  /** The TypeScript type as shown in the docs. */
  type: string;
  /** The default value, as written in code. */
  default?: string;
  /** The Figma property it comes from, if any. */
  figma?: string;
  /** What the prop does, in Indonesian. */
  description: string;
}

/** A Figma variant property: the code prop it became and how each Figma value is written in code. */
export interface AxisMeta {
  prop: string;
  values: Record<string, string>;
  note?: string;
}

/** A Figma variant property or component property that has no prop of its own in code, and why. */
export interface FigmaOnlyMeta {
  figmaOnly: string;
}

export interface ComponentMeta {
  /** The component name in code. */
  name: string;
  /** The Figma component set it implements. */
  figmaSet: string;
  /** Node ID of that set in the Cargo Design System file. */
  figmaNode: string;
  /** Whether the module is a client component ('use client'). */
  client: boolean;
  props: PropMeta[];
  /** Figma variant properties, by name. */
  axes: Record<string, AxisMeta | FigmaOnlyMeta>;
  /** Figma component properties (text, boolean and instance swap), by name without the "#id" suffix. */
  properties: Record<string, { prop: string; note?: string } | FigmaOnlyMeta>;
  /** Helper sets this component also covers, such as Text Field's Required Object and Description. */
  helperSets?: Record<string, Pick<ComponentMeta, 'figmaNode' | 'axes' | 'properties'>>;
  /** Keyboard and screen reader behaviour, in Indonesian. */
  accessibility: string[];
}
