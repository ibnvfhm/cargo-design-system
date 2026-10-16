import { Tab, TabList, TabPanel, Tabs } from '@cargo/react';

export default function TabsNoUnderline() {
  return (
    <Tabs defaultValue="aktif" variant="no-underline" style={{ width: '100%' }}>
      <TabList aria-label="Pesanan">
        <Tab value="aktif" number={2}>
          Aktif
        </Tab>
        <Tab value="selesai">Selesai</Tab>
        <Tab value="dibatalkan" disabled>
          Dibatalkan
        </Tab>
      </TabList>
      <TabPanel value="aktif">Dua pesanan sedang dikirim.</TabPanel>
      <TabPanel value="selesai">Belum ada pesanan selesai.</TabPanel>
      <TabPanel value="dibatalkan">Tidak ada pesanan dibatalkan.</TabPanel>
    </Tabs>
  );
}
