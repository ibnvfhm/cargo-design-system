import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Chip } from './Chip.js';

const Pin = () => <svg data-testid="icon" viewBox="0 0 24 24" />;

describe('Chip', () => {
  test('a filter chip is a toggle button that keeps its own state', async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    const { container } = renderStrict(<Chip onSelectedChange={onSelectedChange}>Jakarta</Chip>);
    const chip = screen.getByRole('button', { name: 'Jakarta' });
    expect(chip).toHaveAttribute('type', 'button');
    expect(chip).toHaveAttribute('data-variant', 'filter');
    expect(chip).toHaveAttribute('data-size', 'md');
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    expect(container.querySelector('.cargo-chip__check')).toBeNull();
    await user.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.cargo-chip__check')).not.toBeNull();
    await user.keyboard('{Enter}');
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    expect(onSelectedChange.mock.calls).toEqual([[true], [false]]);
  });

  test('a controlled filter chip follows selected', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [on, setOn] = useState(true);
      return (
        <Chip selected={on} onSelectedChange={setOn} size="sm">
          Bandung
        </Chip>
      );
    }
    renderStrict(<Controlled />);
    const chip = screen.getByRole('button', { name: 'Bandung' });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    await user.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'false');
  });

  test('an input chip has a remove button named after its label', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const ref = createRef<HTMLElement>();
    renderStrict(
      <Chip ref={ref} variant="input" icon={<Pin />} onRemove={onRemove}>
        Surabaya
      </Chip>,
    );
    expect(ref.current).toHaveAttribute('data-variant', 'input');
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    await user.click(screen.getByRole('button', { name: 'Hapus Surabaya' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test('disabled chips do nothing', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    renderStrict(
      <>
        <Chip disabled>Jakarta</Chip>
        <Chip variant="input" disabled onRemove={onRemove} removeLabel="Hapus filter kota">
          Surabaya
        </Chip>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Jakarta' }));
    expect(screen.getByRole('button', { name: 'Jakarta' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Hapus filter kota' }));
    expect(onRemove).not.toHaveBeenCalled();
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <Chip defaultSelected icon={<Pin />}>
          Jakarta
        </Chip>
        <Chip variant="input" size="sm">
          Surabaya
        </Chip>
        <Chip disabled>Medan</Chip>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
