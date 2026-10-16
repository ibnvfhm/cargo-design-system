import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Checkbox } from './Checkbox.js';
import { CheckboxGroup } from './CheckboxGroup.js';

describe('Checkbox', () => {
  test('is named by its text and toggles with a click on the text and with Space', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderStrict(<Checkbox onChange={onChange}>Ingat saya</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Ingat saya' });
    expect(checkbox).not.toBeChecked();
    await user.click(screen.getByText('Ingat saya'));
    expect(checkbox).toBeChecked();
    await user.keyboard(' ');
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('indeterminate sets the DOM property and the data attribute', () => {
    const { rerender } = renderStrict(
      <Checkbox indeterminate checked={false} onChange={() => {}}>
        Pilih semua
      </Checkbox>,
    );
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox');
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
    expect(checkbox).toBePartiallyChecked();
    rerender(<Checkbox checked onChange={() => {}}>Pilih semua</Checkbox>);
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox).not.toHaveAttribute('data-indeterminate');
    expect(checkbox).toBeChecked();
  });

  test('description and error describe it; an error marks it invalid', () => {
    renderStrict(
      <Checkbox description="Kami kirim promo seminggu sekali." error="Wajib dicentang.">
        Setuju
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Setuju' });
    expect(checkbox).toHaveAccessibleDescription('Kami kirim promo seminggu sekali. Wajib dicentang.');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  test('size is only written when given, so a CheckboxGroup can set it', () => {
    const { container, rerender } = renderStrict(<Checkbox>Satu</Checkbox>);
    expect(container.firstElementChild).not.toHaveAttribute('data-size');
    rerender(<Checkbox size="sm">Satu</Checkbox>);
    expect(container.firstElementChild).toHaveAttribute('data-size', 'sm');
  });

  test('a disabled checkbox cannot be toggled', async () => {
    const user = userEvent.setup();
    renderStrict(<Checkbox disabled>Ingat saya</Checkbox>);
    await user.click(screen.getByText('Ingat saya'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('a box without text is named by aria-label; ref is the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = renderStrict(<Checkbox ref={ref} aria-label="Pilih baris 1" className="extra" style={{ marginTop: 4 }} />);
    expect(ref.current).toBe(screen.getByRole('checkbox', { name: 'Pilih baris 1' }));
    expect(container.firstElementChild).toHaveClass('cargo-checkbox', 'extra');
    expect(container.querySelector('.cargo-checkbox__text')).toBeNull();
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <Checkbox defaultChecked>Email</Checkbox>
        <Checkbox indeterminate description="Sebagian">
          Semua
        </Checkbox>
        <Checkbox disabled error="Wajib dicentang.">
          Setuju
        </Checkbox>
        <Checkbox aria-label="Pilih baris 1" size="sm" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});

describe('CheckboxGroup', () => {
  test('is a group named by its label, with the required mark hidden from screen readers', () => {
    const { container } = renderStrict(
      <CheckboxGroup label="Notifikasi" required description="Pilih minimal satu.">
        <Checkbox>Email</Checkbox>
        <Checkbox>SMS</Checkbox>
      </CheckboxGroup>,
    );
    const group = screen.getByRole('group', { name: 'Notifikasi' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveAccessibleDescription('Pilih minimal satu.');
    const mark = container.querySelector('.cargo-field__required');
    expect(mark).toHaveTextContent('*');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
  });

  test('size reaches the checkboxes through the styles, and disabled disables them all', () => {
    renderStrict(
      <CheckboxGroup label="Notifikasi" size="sm" disabled error="Pilih minimal satu.">
        <Checkbox>Email</Checkbox>
        <Checkbox size="md">SMS</Checkbox>
      </CheckboxGroup>,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('data-size', 'sm');
    expect(group).toHaveAttribute('data-invalid', 'true');
    screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toBeDisabled());
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <CheckboxGroup label="Notifikasi" required error="Pilih minimal satu.">
        <Checkbox>Email</Checkbox>
        <Checkbox description="Biaya SMS ditanggung kami.">SMS</Checkbox>
      </CheckboxGroup>,
    );
    await expectNoAxeViolations(container);
  });
});
