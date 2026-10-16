import { Toggle } from '@cargo/react';

export default function ToggleBasic() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Toggle>Notifikasi email</Toggle>
      <Toggle defaultChecked>Simpan riwayat pencarian</Toggle>
    </div>
  );
}
