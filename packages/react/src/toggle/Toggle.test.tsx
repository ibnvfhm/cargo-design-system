import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Toggle } from './Toggle.js';

describe('Toggle', () => {
  test('is a switch named by its text that turns on and off', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderStrict(<Toggle onChange={onChange}>Notifikasi email</Toggle>);
    const toggle = screen.getByRole('switch', { name: 'Notifikasi email' });
    expect(toggle).not.toBeChecked();
    await user.click(screen.getByText('Notifikasi email'));
    expect(toggle).toBeChecked();
    await user.keyboard(' ');
    expect(toggle).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('with a label above, the label and the text name it together', () => {
    renderStrict(
      <Toggle label="Notifikasi" defaultChecked>
        Email
      </Toggle>,
    );
    expect(screen.getByRole('switch', { name: 'Notifikasi Email' })).toBeChecked();
  });

  test('a label alone names it too', () => {
    renderStrict(<Toggle label="Mode gelap" />);
    expect(screen.getByRole('switch', { name: 'Mode gelap' })).toBeInTheDocument();
  });

  test('description and error describe it', () => {
    renderStrict(
      <Toggle description="Ringkasan setiap Senin." error="Gagal menyimpan.">
        Laporan mingguan
      </Toggle>,
    );
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAccessibleDescription('Ringkasan setiap Senin. Gagal menyimpan.');
    expect(toggle).toHaveAttribute('aria-invalid', 'true');
  });

  test('disabled, ref and className', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const { container } = renderStrict(
      <Toggle ref={ref} disabled className="extra">
        Wi-Fi
      </Toggle>,
    );
    await user.click(screen.getByText('Wi-Fi'));
    expect(ref.current).toBe(screen.getByRole('switch'));
    expect(ref.current).not.toBeChecked();
    expect(container.firstElementChild).toHaveClass('cargo-toggle', 'extra');
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <Toggle defaultChecked>Email</Toggle>
        <Toggle label="Notifikasi" description="Langsung tersimpan.">
          SMS
        </Toggle>
        <Toggle aria-label="Mode gelap" disabled />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
