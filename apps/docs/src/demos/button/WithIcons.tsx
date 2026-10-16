import { Button } from '@cargo/react';
import { CaretDown, Download, Plus, TrashBin } from '../icons';

export default function ButtonWithIcons() {
  return (
    <>
      <Button leftIcon={<Plus />}>Tambah</Button>
      <Button variant="outlined" rightIcon={<CaretDown />}>
        Urutkan
      </Button>
      <Button variant="secondary" leftIcon={<Download />}>
        Unduh
      </Button>
      <Button variant="outlined" aria-label="Tambah" leftIcon={<Plus />} />
      <Button variant="danger-borderless" aria-label="Hapus" leftIcon={<TrashBin />} />
    </>
  );
}
