import { TextField } from '@cargo/react';
import { Calendar, MagnifyingGlass } from '../icons';

export default function TextFieldWithIcons() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField
        aria-label="Cari pesanan"
        type="search"
        placeholder="Cari nomor pesanan"
        leftIcon={<MagnifyingGlass />}
      />
      <TextField
        label="Tanggal kirim"
        placeholder="DD/MM/YYYY"
        rightIcon={<Calendar />}
      />
    </div>
  );
}
