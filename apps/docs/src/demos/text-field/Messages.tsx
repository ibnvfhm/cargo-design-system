import { TextField } from '@cargo/react';

export default function TextFieldMessages() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField
        label="Kata sandi"
        type="password"
        description="Minimal 8 karakter, dengan huruf dan angka."
      />
      <TextField
        label="Email"
        type="email"
        defaultValue="budi@"
        error="Format email belum benar."
      />
    </div>
  );
}
