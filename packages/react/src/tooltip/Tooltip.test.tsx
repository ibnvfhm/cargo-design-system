import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Tooltip } from './Tooltip.js';

const isOpen = () => screen.getByRole('tooltip', { hidden: true }).hasAttribute('data-open');

describe('Tooltip', () => {
  test('describes its trigger and starts closed', () => {
    renderStrict(
      <Tooltip title="Ekspor" description="Unduh laporan sebagai Excel.">
        <button type="button">Ekspor</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Ekspor' });
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    expect(trigger).toHaveAccessibleDescription('Ekspor Unduh laporan sebagai Excel.');
    expect(tooltip).toHaveAttribute('popover', 'manual');
    expect(isOpen()).toBe(false);
  });

  test('opens after the hover delay, stays while the pointer is on it, and closes after leaving', async () => {
    const user = userEvent.setup();
    renderStrict(
      <Tooltip description="Hapus pesanan" delay={50}>
        <button type="button">Hapus</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button'));
    expect(isOpen()).toBe(false);
    await waitFor(() => expect(isOpen()).toBe(true));
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveAttribute('data-popover-open');
    await user.hover(screen.getByRole('tooltip', { hidden: true }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(isOpen()).toBe(true);
    await user.unhover(screen.getByRole('tooltip', { hidden: true }));
    await waitFor(() => expect(isOpen()).toBe(false));
  });

  test('keyboard focus opens it at once; Escape and blur close it', async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    renderStrict(
      <div onKeyDown={onKeyDown}>
        <Tooltip description="Simpan perubahan">
          <button type="button">Simpan</button>
        </Tooltip>
        <button type="button">Berikutnya</button>
      </div>,
    );
    await user.tab();
    expect(isOpen()).toBe(true);
    await user.keyboard('{Escape}');
    expect(isOpen()).toBe(false);
    // The Escape that closed the tooltip doesn't reach the page.
    expect(onKeyDown).not.toHaveBeenCalled();
    await user.tab({ shift: true });
    await user.tab();
    expect(isOpen()).toBe(true);
    await user.tab();
    expect(isOpen()).toBe(false);
  });

  test('keeps the trigger’s own ref and handlers', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onFocus = vi.fn();
    renderStrict(
      <Tooltip description="Info">
        <button ref={ref} type="button" onFocus={onFocus} aria-describedby="lain">
          Info
        </button>
      </Tooltip>,
    );
    await user.tab();
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(ref.current!.getAttribute('aria-describedby')).toMatch(/^lain /);
  });

  test('a controlled tooltip follows open', async () => {
    function Controlled() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <Tooltip open={open} onOpenChange={setOpen} side="left" arrow="top" description="Selalu tampil">
            <button type="button">Bantuan</button>
          </Tooltip>
          <button type="button" onClick={() => setOpen(false)}>
            Tutup
          </button>
        </>
      );
    }
    const user = userEvent.setup();
    renderStrict(<Controlled />);
    // Let floating-ui finish placing the open tooltip.
    await act(async () => {});
    expect(isOpen()).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Tutup' }));
    expect(isOpen()).toBe(false);
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(
      <Tooltip open title="Ekspor" description="Unduh laporan sebagai Excel.">
        <button type="button">Ekspor</button>
      </Tooltip>,
    );
    await act(async () => {});
    await expectNoAxeViolations(container);
  });
});
