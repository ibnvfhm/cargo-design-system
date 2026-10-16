import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { expectNoAxeViolations, renderStrict } from '../../test/helpers.js';
import { Tab, TabList, TabPanel, Tabs } from './Tabs.js';

const Icon = ({ name }: { name: string }) => <svg data-testid={name} viewBox="0 0 24 24" />;

function Profile(props: { onValueChange?: (value: string) => void }) {
  return (
    <Tabs defaultValue="data" {...props}>
      <TabList aria-label="Profil">
        <Tab value="data" icon={<Icon name="regular" />} activeIcon={<Icon name="fill" />}>
          Data diri
        </Tab>
        <Tab value="dokumen" number={3}>
          Dokumen
        </Tab>
        <Tab value="arsip" disabled>
          Arsip
        </Tab>
        <Tab value="riwayat">Riwayat</Tab>
      </TabList>
      <TabPanel value="data">Isi data diri</TabPanel>
      <TabPanel value="dokumen">Isi dokumen</TabPanel>
      <TabPanel value="arsip">Isi arsip</TabPanel>
      <TabPanel value="riwayat">Isi riwayat</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  test('follows the WAI-ARIA tabs pattern', () => {
    renderStrict(<Profile />);
    expect(screen.getByRole('tablist', { name: 'Profil' })).toBeInTheDocument();
    const tab = screen.getByRole('tab', { name: 'Data diri' });
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Dokumen 3' })).toHaveAttribute('tabindex', '-1');
    const panel = screen.getByRole('tabpanel', { name: 'Data diri' });
    expect(panel).toHaveTextContent('Isi data diri');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(screen.getByText('Isi dokumen')).not.toBeVisible();
  });

  test('a click opens a tab and swaps in its active icon', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderStrict(<Profile onValueChange={onValueChange} />);
    expect(screen.getByTestId('fill')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Dokumen 3' }));
    expect(screen.getByRole('tab', { name: 'Dokumen 3' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Isi dokumen')).toBeVisible();
    expect(screen.getByTestId('regular')).toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith('dokumen');
  });

  test('arrow keys, Home and End move between tabs and skip disabled ones', async () => {
    const user = userEvent.setup();
    renderStrict(<Profile />);
    await user.tab();
    expect(screen.getByRole('tab', { name: 'Data diri' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Dokumen 3' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    const riwayat = screen.getByRole('tab', { name: 'Riwayat' });
    expect(riwayat).toHaveFocus();
    expect(riwayat).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Data diri' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(riwayat).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Data diri' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(riwayat).toHaveFocus();
  });

  test('a controlled Tabs follows value', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('a');
      return (
        <Tabs value={value} onValueChange={setValue} variant="no-underline">
          <TabList aria-label="Pesanan">
            <Tab value="a">Aktif</Tab>
            <Tab value="b">Selesai</Tab>
          </TabList>
          <TabPanel value="a">Pesanan aktif</TabPanel>
          <TabPanel value="b">Pesanan selesai</TabPanel>
        </Tabs>
      );
    }
    const { container } = renderStrict(<Controlled />);
    expect(container.firstElementChild).toHaveAttribute('data-variant', 'no-underline');
    await user.click(screen.getByRole('tab', { name: 'Selesai' }));
    expect(screen.getByText('Pesanan selesai')).toBeVisible();
  });

  test('parts outside Tabs explain the mistake', () => {
    const error = console.error;
    console.error = () => {};
    expect(() => renderStrict(<Tab value="a">A</Tab>)).toThrow('<Tab> harus berada di dalam <Tabs>.');
    console.error = error;
  });

  test('has no accessibility violations', async () => {
    const { container } = renderStrict(<Profile />);
    await expectNoAxeViolations(container);
  });
});
