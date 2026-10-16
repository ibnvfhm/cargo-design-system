import { TextField } from '@cargo/react';
import { useState } from 'react';

export default function TextFieldClear() {
  const [name, setName] = useState('Budi Santoso');
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField
        label="Nama penerima"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Catatan kurir"
        defaultValue="Titip di pos satpam"
        clearable={false}
      />
    </div>
  );
}
