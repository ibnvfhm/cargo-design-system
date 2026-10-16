import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { TextField } from './TextField.js';

const User = () => <svg data-testid="icon" viewBox="0 0 24 24" />;

describe('TextField', () => {
  test('the label names the input and the required mark is hidden from screen readers', () => {
    const { container } = renderStrict(<TextField label="Email" required placeholder="nama@contoh.com" />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('placeholder', 'nama@contoh.com');
    const mark = container.querySelector('.cargo-field__required');
    expect(mark).toHaveTextContent('(Required)');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
  });

  test('requiredIndicator="symbol" shows an asterisk', () => {
    const { container } = renderStrict(<TextField label="Email" required requiredIndicator="symbol" />);
    expect(container.querySelector('.cargo-field__required')).toHaveTextContent('*');
  });

  test('description, prefix and suffix describe the input', () => {
    renderStrict(<TextField label="Nomor telepon" prefix="+62" suffix="ponsel" description="Untuk kode verifikasi." />);
    const input = screen.getByRole('textbox', { name: 'Nomor telepon' });
    expect(input).toHaveAccessibleDescription('+62 ponsel Untuk kode verifikasi.');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  test('an error replaces the description and marks the input invalid', () => {
    const { container, rerender } = renderStrict(<TextField label="Email" description="Kami tidak membagikan email." error="Format email salah." />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Format email salah.');
    expect(container.querySelector('.cargo-text-field__field')).toHaveAttribute('data-invalid', 'true');
    expect(screen.queryByText('Kami tidak membagikan email.')).toBeNull();
    // error={true} marks the field and keeps the description.
    rerender(<TextField label="Email" description="Kami tidak membagikan email." error />);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Kami tidak membagikan email.');
  });

  test('keeps aria-describedby passed by the app', () => {
    renderStrict(
      <>
        <TextField label="Kata sandi" description="Minimal 8 karakter." aria-describedby="aturan" />
        <p id="aturan">Pakai huruf dan angka.</p>
      </>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Minimal 8 karakter. Pakai huruf dan angka.');
  });

  test('icons are hidden from screen readers', () => {
    const { container } = renderStrict(<TextField label="Nama" leftIcon={<User />} rightIcon={<User />} />);
    expect(screen.getAllByTestId('icon')).toHaveLength(2);
    container.querySelectorAll('.cargo-text-field__icon').forEach((icon) => expect(icon).toHaveAttribute('aria-hidden', 'true'));
  });

  test('without a placeholder, a blank one lets the styles tell an empty field from a filled one', () => {
    renderStrict(<TextField label="Nama" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', ' ');
  });

  test('the clear button empties an uncontrolled field and keeps focus in it', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderStrict(<TextField label="Nama" defaultValue="Budi" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Nama' });
    const clear = screen.getByRole('button', { name: 'Hapus isian' });
    expect(clear).toHaveAttribute('tabindex', '-1');
    await user.click(clear);
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('the clear button empties a controlled field through onChange', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('Budi');
      return <TextField label="Nama" value={value} onChange={(event) => setValue(event.target.value)} clearLabel="Kosongkan" />;
    }
    renderStrict(<Controlled />);
    await user.click(screen.getByRole('button', { name: 'Kosongkan' }));
    expect(screen.getByRole('textbox')).toHaveValue('');
    await user.type(screen.getByRole('textbox'), 'Sari');
    expect(screen.getByRole('textbox')).toHaveValue('Sari');
  });

  test('clearable={false} has no clear button', () => {
    renderStrict(<TextField label="Nama" defaultValue="Budi" clearable={false} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('device sets data-device; className and style go on the outer element; the ref is the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = renderStrict(
      <TextField ref={ref} label="Nama" device="mobile" className="extra" style={{ maxWidth: 320 }} name="nama" id="nama" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('cargo-text-field', 'extra');
    expect(root).toHaveAttribute('data-device', 'mobile');
    expect(root.style.maxWidth).toBe('320px');
    expect(ref.current).toBe(screen.getByRole('textbox'));
    expect(ref.current).toHaveAttribute('name', 'nama');
    expect(ref.current).toHaveAttribute('id', 'nama');
  });

  test('a field without a visible label is named by aria-label', () => {
    renderStrict(<TextField aria-label="Cari pesanan" leftIcon={<User />} />);
    expect(screen.getByRole('textbox', { name: 'Cari pesanan' })).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <TextField label="Email" required description="Kami tidak membagikan email." />
        <TextField label="Nomor telepon" prefix="+62" error="Nomor belum lengkap." defaultValue="812" />
        <TextField label="Berat" suffix="kg" disabled />
        <TextField aria-label="Cari" leftIcon={<User />} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
