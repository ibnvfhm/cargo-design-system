'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Badge } from '../badge/Badge.js';
import { cx } from '../internal/cx.js';

export const TABS_VARIANTS = ['default', 'no-underline'] as const;
export type TabsVariant = (typeof TABS_VARIANTS)[number];

interface TabsContext {
  value: string | undefined;
  select: (value: string) => void;
  baseId: string;
}

const Context = createContext<TabsContext | null>(null);

function useTabs(part: string): TabsContext {
  const context = useContext(Context);
  if (!context) throw new Error(`<${part}> harus berada di dalam <Tabs>.`);
  return context;
}

const idOf = (baseId: string, kind: 'tab' | 'panel', value: string) => `${baseId}-${kind}-${value.replace(/\s+/g, '-')}`;

interface TabsOwnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Figma: Type. Default draws the underline, No Underline leaves it out (for tabs inside a card). */
  variant?: TabsVariant;
  /** Called with the value of the tab that was chosen. */
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

/** Which tab is open: `value` when the parent keeps it, `defaultValue` when Tabs keeps it itself. */
export type TabsProps = TabsOwnProps & ({ value: string; defaultValue?: never } | { value?: never; defaultValue: string });

/** Tabs: a TabList of Tab buttons and a TabPanel per tab. Figma: Tabs. The ref is the outer <div>. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { variant = 'default', value, defaultValue, onValueChange, className, children, ...rest },
  ref,
) {
  const baseId = useId();
  const [ownValue, setOwnValue] = useState(defaultValue);
  const current = value ?? ownValue;
  const select = (next: string) => {
    if (next === current) return;
    if (value === undefined) setOwnValue(next);
    onValueChange?.(next);
  };

  return (
    <Context.Provider value={{ value: current, select, baseId }}>
      <div ref={ref} className={cx('cargo-tabs', className)} data-variant={variant} {...rest}>
        {children}
      </div>
    </Context.Provider>
  );
});

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

// Arrow keys move to the previous or next tab and open it; Home and End go to the first and last.
const STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (index) => index + 1,
  ArrowLeft: (index) => index - 1,
  Home: () => 0,
  End: (_index, count) => count - 1,
};

/** The row of tabs (role="tablist"). Name it with aria-label when nothing on the page does. */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList({ className, onKeyDown, children, ...rest }, ref) {
  useTabs('TabList');
  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    const step = STEPS[event.key];
    if (event.defaultPrevented || !step) return;
    const list = event.currentTarget;
    const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')].filter((tab) => tab.closest('[role="tablist"]') === list);
    const index = tabs.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const next = tabs[(step(index, tabs.length) + tabs.length) % tabs.length];
    next?.focus();
    next?.click();
  };

  return (
    <div ref={ref} role="tablist" className={cx('cargo-tabs__list', className)} onKeyDown={move} {...rest}>
      {children}
    </div>
  );
});

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'> {
  /** Links the tab to the TabPanel with the same value. */
  value: string;
  /** Figma: Label Text, shown when Label is on. */
  children?: ReactNode;
  /** Figma: Icon (Type=Regular). Sized 22px and coloured by the tab. */
  icon?: ReactNode;
  /** Figma: the icon of State=Active (Type=Fill). Falls back to `icon`. */
  activeIcon?: ReactNode;
  /** Figma: Number, a Counter badge after the label. */
  number?: ReactNode;
}

/** One tab. Figma: one Tabs component (State=Active when it is open). The ref is the <button>. */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, children, icon, activeIcon, number, className, onClick, ...rest },
  ref,
) {
  const tabs = useTabs('Tab');
  const selected = tabs.value === value;
  const shownIcon = selected && activeIcon != null ? activeIcon : icon;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={idOf(tabs.baseId, 'tab', value)}
      aria-selected={selected}
      aria-controls={idOf(tabs.baseId, 'panel', value)}
      // Only the open tab is in the tab order; the arrow keys reach the others.
      tabIndex={selected ? 0 : -1}
      className={cx('cargo-tab', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) tabs.select(value);
      }}
      {...rest}
    >
      {shownIcon != null && (
        <span className="cargo-tab__icon" aria-hidden="true">
          {shownIcon}
        </span>
      )}
      {children != null && <span className="cargo-tab__label">{children}</span>}
      {/* The space keeps the label and the number apart in the tab's name ("Dokumen 3"); flex layout hides it. */}
      {children != null && number != null && ' '}
      {number != null && <Badge type="counter">{number}</Badge>}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The value of the Tab that opens this panel. */
  value: string;
  children?: ReactNode;
}

/** The content of one tab (role="tabpanel"), hidden while its tab is closed. The ref is the <div>. */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel({ value, className, children, ...rest }, ref) {
  const tabs = useTabs('TabPanel');
  const selected = tabs.value === value;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={idOf(tabs.baseId, 'panel', value)}
      aria-labelledby={idOf(tabs.baseId, 'tab', value)}
      hidden={!selected}
      tabIndex={0}
      className={cx('cargo-tab-panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
