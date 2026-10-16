import { TextField } from '@cargo/react';

export default function TextFieldBasic() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField label="Nama lengkap" placeholder="Masukkan nama lengkap" />
      <TextField label="Email" type="email" placeholder="nama@perusahaan.com" required />
      <TextField
        label="Nomor KTP"
        inputMode="numeric"
        placeholder="16 digit"
        required
        requiredIndicator="symbol"
      />
    </div>
  );
}
