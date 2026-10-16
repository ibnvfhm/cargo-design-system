import { screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, test } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Badge } from './Badge.js';

const Star = () => <svg data-testid="icon" viewBox="0 0 16 16" />;

describe('Badge', () => {
  test('defaults to the Figma default variant: Label, Primary, Md, Subtle', () => {
    renderStrict(<Badge>Disetujui</Badge>);
    const badge = screen.getByText('Disetujui');
    expect(badge).toHaveClass('cargo-badge');
    expect(badge).toHaveAttribute('data-type', 'label');
    expect(badge).toHaveAttribute('data-variant', 'primary');
    expect(badge).toHaveAttribute('data-size', 'md');
    expect(badge).toHaveAttribute('data-appearance', 'subtle');
  });

  test('maps every prop to a data attribute', () => {
    renderStrict(
      <Badge type="counter" variant="danger" size="xs" appearance="solid">
        99
      </Badge>,
    );
    const badge = screen.getByText('99');
    expect(badge).toHaveAttribute('data-type', 'counter');
    expect(badge).toHaveAttribute('data-variant', 'danger');
    expect(badge).toHaveAttribute('data-size', 'xs');
    expect(badge).toHaveAttribute('data-appearance', 'solid');
  });

  test('shows icons on a label only, hidden from screen readers', () => {
    const { container, rerender } = renderStrict(
      <Badge leftIcon={<Star />} rightIcon={<Star />}>
        Baru
      </Badge>,
    );
    expect(screen.getAllByTestId('icon')).toHaveLength(2);
    container.querySelectorAll('.cargo-badge__icon').forEach((icon) => expect(icon).toHaveAttribute('aria-hidden', 'true'));
    rerender(
      <Badge type="counter" leftIcon={<Star />}>
        3
      </Badge>,
    );
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  test('a dot without text is decoration; with text, the text is announced', () => {
    const { container, rerender } = renderStrict(<Badge type="dot" />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    rerender(<Badge type="dot">Ada pesan baru</Badge>);
    expect(container.firstElementChild).not.toHaveAttribute('aria-hidden');
    expect(screen.getByText('Ada pesan baru')).toHaveClass('cargo-visually-hidden');
  });

  test('forwards ref, className and other attributes', () => {
    const ref = createRef<HTMLSpanElement>();
    renderStrict(
      <Badge ref={ref} className="extra" id="status" title="Status">
        Aktif
      </Badge>,
    );
    expect(ref.current).toBe(screen.getByText('Aktif'));
    expect(ref.current).toHaveClass('cargo-badge', 'extra');
    expect(ref.current).toHaveAttribute('id', 'status');
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <Badge leftIcon={<Star />}>Label</Badge>
        <Badge type="counter">99</Badge>
        <Badge type="dot" />
        <Badge type="dot">Ada pesan baru</Badge>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
