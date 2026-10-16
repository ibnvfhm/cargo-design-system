import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { RadioButton, RadioGroup } from './RadioButton.js';

describe('RadioGroup and RadioButton', () => {
  test('a radiogroup named by its label; one shared name, one choice at a time', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderStrict(
      <RadioGroup label="Metode pembayaran" onValueChange={onValueChange}>
        <RadioButton value="transfer">Transfer bank</RadioButton>
        <RadioButton value="cod">Bayar di tempat</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Metode pembayaran' })).toBeInTheDocument();
    const [transfer, cod] = screen.getAllByRole('radio');
    expect(transfer).toHaveAttribute('name', cod!.getAttribute('name')!);
    await user.click(screen.getByText('Transfer bank'));
    await user.click(screen.getByText('Bayar di tempat'));
    expect(transfer).not.toBeChecked();
    expect(cod).toBeChecked();
    expect(onValueChange.mock.calls).toEqual([['transfer'], ['cod']]);
  });

  test('defaultValue selects a radio at first; the arrow keys move the choice', async () => {
    const user = userEvent.setup();
    renderStrict(
      <RadioGroup label="Ukuran" defaultValue="m" name="ukuran">
        <RadioButton value="s">S</RadioButton>
        <RadioButton value="m">M</RadioButton>
        <RadioButton value="l">L</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'M' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'M' })).toHaveAttribute('name', 'ukuran');
    await user.click(screen.getByRole('radio', { name: 'M' }));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'L' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'L' })).toHaveFocus();
  });

  test('a controlled group follows value', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('a');
      return (
        <>
          <RadioGroup label="Pengiriman" value={value} onValueChange={setValue}>
            <RadioButton value="a">Reguler</RadioButton>
            <RadioButton value="b">Kilat</RadioButton>
          </RadioGroup>
          <output>{value}</output>
        </>
      );
    }
    renderStrict(<Controlled />);
    expect(screen.getByRole('radio', { name: 'Reguler' })).toBeChecked();
    await user.click(screen.getByText('Kilat'));
    expect(screen.getByRole('radio', { name: 'Kilat' })).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('b');
  });

  test('required, error and descriptions', () => {
    const { container } = renderStrict(
      <RadioGroup label="Pengiriman" required error="Pilih salah satu." description="Ongkir dihitung saat bayar.">
        <RadioButton value="a" description="2–3 hari">
          Reguler
        </RadioButton>
        <RadioButton value="b">Kilat</RadioButton>
      </RadioGroup>,
    );
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Ongkir dihitung saat bayar. Pilih salah satu.');
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeRequired());
    expect(screen.getByRole('radio', { name: 'Reguler' })).toHaveAccessibleDescription('2–3 hari');
    expect(container.querySelector('.cargo-field__required')).toHaveTextContent('*');
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <RadioGroup label="Pengiriman" required defaultValue="a" error="Pilih salah satu.">
        <RadioButton value="a">Reguler</RadioButton>
        <RadioButton value="b" disabled>
          Kilat
        </RadioButton>
      </RadioGroup>,
    );
    await expectNoAxeViolations(container);
  });
});
