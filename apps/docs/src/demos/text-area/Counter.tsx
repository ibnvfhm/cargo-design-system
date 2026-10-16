import { TextArea } from '@cargo/react';

export default function TextAreaCounter() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <TextArea
        label="Catatan untuk penjual"
        placeholder="Contoh: warna merah"
        counter
        maxLength={100}
        rows={3}
      />
    </div>
  );
}
