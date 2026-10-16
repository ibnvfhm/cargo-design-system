import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, createRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { TextArea } from './TextArea.js';

describe('TextArea', () => {
  test('the label names the textarea', () => {
    renderStrict(<TextArea label="Catatan" placeholder="Tulis catatan" />);
    const textarea = screen.getByRole('textbox', { name: 'Catatan' });
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Tulis catatan');
    expect(textarea).not.toHaveAttribute('rows');
  });

  test('shows the description and the error together, as Figma does', () => {
    const { container } = renderStrict(<TextArea label="Alasan" description="Dibaca oleh atasanmu." error="Alasan wajib diisi." />);
    const textarea = screen.getByRole('textbox', { name: 'Alasan' });
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAccessibleDescription('Alasan wajib diisi. Dibaca oleh atasanmu.');
    expect(container.querySelector('[data-tone="error"]')).toHaveTextContent('Alasan wajib diisi.');
  });

  test('the counter follows typing, out of maxLength', async () => {
    const user = userEvent.setup();
    renderStrict(<TextArea label="Alamat" counter maxLength={100} defaultValue="Jl." />);
    const textarea = screen.getByRole('textbox', { name: 'Alamat' });
    expect(screen.getByText('3/100')).toBeInTheDocument();
    await user.type(textarea, ' Melati');
    expect(screen.getByText('10/100')).toBeInTheDocument();
    expect(textarea).toHaveAccessibleDescription('10/100');
  });

  test('the counter follows a controlled value, and counts without maxLength', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('');
      return <TextArea label="Catatan" counter value={value} onChange={(event) => setValue(event.target.value)} />;
    }
    renderStrict(<Controlled />);
    expect(screen.getByText('0')).toBeInTheDocument();
    await user.type(screen.getByRole('textbox'), 'Halo');
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('the counter picks up text typed before hydration', async () => {
    const ui = <TextArea label="Catatan" counter maxLength={50} />;
    const container = document.createElement('div');
    container.innerHTML = renderToString(ui);
    document.body.append(container);
    container.querySelector('textarea')!.value = 'Sudah diketik';
    const root = await act(async () => hydrateRoot(container, ui));
    expect(container.querySelector('.cargo-text-area__counter')).toHaveTextContent('13/50');
    await act(async () => root.unmount());
    container.remove();
  });

  test('required shows the mark and sets the attribute', () => {
    const { container } = renderStrict(<TextArea label="Alasan" required requiredIndicator="symbol" />);
    expect(screen.getByRole('textbox')).toBeRequired();
    expect(container.querySelector('.cargo-field__required')).toHaveTextContent('*');
  });

  test('rows, className, style and ref', () => {
    const ref = createRef<HTMLTextAreaElement>();
    const { container } = renderStrict(<TextArea ref={ref} label="Catatan" rows={4} className="extra" style={{ maxWidth: 400 }} />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
    expect(ref.current).toHaveAttribute('rows', '4');
    expect(container.firstElementChild).toHaveClass('cargo-text-area', 'extra');
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <div>
        <TextArea label="Catatan" description="Opsional." counter maxLength={100} />
        <TextArea label="Alasan" required error="Alasan wajib diisi." />
        <TextArea aria-label="Pesan" disabled />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
