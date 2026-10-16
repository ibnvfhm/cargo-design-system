import { Button } from '@cargo/react';

export default function ButtonDisabled() {
  return (
    <>
      <Button disabled>Simpan</Button>
      <Button variant="secondary" disabled>
        Ekspor
      </Button>
      <Button variant="borderless" disabled>
        Lihat detail
      </Button>
    </>
  );
}
