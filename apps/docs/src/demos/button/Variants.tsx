import { Button } from '@cargo/react';

export default function ButtonVariants() {
  return (
    <>
      <Button>Simpan</Button>
      <Button variant="secondary">Ekspor</Button>
      <Button variant="tertiary">Tambah catatan</Button>
      <Button variant="outlined">Batal</Button>
      <Button variant="borderless">Lihat detail</Button>
      <Button variant="danger">Hapus</Button>
      <Button variant="danger-outlined">Hapus draf</Button>
      <Button variant="danger-borderless">Batalkan pesanan</Button>
    </>
  );
}
