import { Tab, TabList, TabPanel, Tabs } from '@cargo/react';
import { Clock, FileText, User } from '../icons';

export default function TabsBasic() {
  return (
    <Tabs defaultValue="data" style={{ width: '100%' }}>
      <TabList aria-label="Profil karyawan">
        <Tab value="data" icon={<User />} activeIcon={<User fill />}>
          Data diri
        </Tab>
        <Tab
          value="dokumen"
          icon={<FileText />}
          activeIcon={<FileText fill />}
          number={3}
        >
          Dokumen
        </Tab>
        <Tab value="riwayat" icon={<Clock />} activeIcon={<Clock fill />}>
          Riwayat
        </Tab>
      </TabList>
      <TabPanel value="data" style={{ paddingTop: 16 }}>
        Nama, tanggal lahir, dan alamat.
      </TabPanel>
      <TabPanel value="dokumen" style={{ paddingTop: 16 }}>
        KTP, NPWP, dan kontrak kerja.
      </TabPanel>
      <TabPanel value="riwayat" style={{ paddingTop: 16 }}>
        Perubahan data dalam 30 hari terakhir.
      </TabPanel>
    </Tabs>
  );
}
