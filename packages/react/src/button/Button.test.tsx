import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Button } from './Button.js';

const Trash = () => <svg data-testid="icon" viewBox="0 0 24 24" />;

describe('Button', () => {
  test('defaults to the Figma default variant and never submits a form by accident', () => {
    renderStrict(<Button>Simpan</Button>);
    const button = screen.getByRole('button', { name: 'Simpan' });
    expect(button).toHaveClass('cargo-button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'lg');
    // Without device, the screen width decides.
    expect(button).not.toHaveAttribute('data-device');
  });

  test('maps variant, size and device to data attributes', () => {
    renderStrict(
      <Button variant="danger-outlined" size="sm" device="mobile">
        Hapus
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Hapus' });
    expect(button).toHaveAttribute('data-variant', 'danger-outlined');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveAttribute('data-device', 'mobile');
  });

  test('icons are hidden from screen readers; the text is the name', () => {
    const { container } = renderStrict(
      <Button leftIcon={<Trash />} rightIcon={<Trash />}>
        Hapus
      </Button>,
    );
    expect(screen.getAllByTestId('icon')).toHaveLength(2);
    container.querySelectorAll('.cargo-button__icon').forEach((icon) => expect(icon).toHaveAttribute('aria-hidden', 'true'));
    expect(screen.getByRole('button')).toHaveAccessibleName('Hapus');
  });

  test('an icon-only button is named by aria-label', () => {
    const { container } = renderStrict(<Button aria-label="Hapus" variant="danger-borderless" leftIcon={<Trash />} />);
    expect(screen.getByRole('button', { name: 'Hapus' })).toBeInTheDocument();
    expect(container.querySelector('.cargo-button__label')).toBeNull();
  });

  test('clicks with the mouse, Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderStrict(<Button onClick={onClick}>Kirim</Button>);
    await user.click(screen.getByRole('button'));
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  test('a disabled button cannot be clicked or focused', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderStrict(
      <Button disabled onClick={onClick}>
        Kirim
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    await user.tab();
    expect(onClick).not.toHaveBeenCalled();
    expect(button).not.toHaveFocus();
  });

  test('type="submit" submits its form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderStrict(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Button type="submit">Kirim</Button>
        <Button variant="outlined">Batal</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Batal' }));
    expect(onSubmit).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Kirim' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('forwards ref, className and other attributes', () => {
    const ref = createRef<HTMLButtonElement>();
    renderStrict(
      <Button ref={ref} className="extra" id="kirim" aria-describedby="catatan">
        Kirim
      </Button>,
    );
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(ref.current).toHaveClass('cargo-button', 'extra');
    expect(ref.current).toHaveAttribute('id', 'kirim');
    expect(ref.current).toHaveAttribute('aria-describedby', 'catatan');
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <Button>Simpan</Button>
        <Button variant="secondary" leftIcon={<Trash />}>
          Hapus
        </Button>
        <Button aria-label="Hapus" variant="danger" leftIcon={<Trash />} />
        <Button disabled>Kirim</Button>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
