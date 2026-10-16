import { TextField } from '@cargo/react';

export default function TextFieldDisabled() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField label="ID pelanggan" defaultValue="CUST-00921" disabled />
      <TextField label="Berat paket" suffix="kg" placeholder="0" disabled />
    </div>
  );
}
