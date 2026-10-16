import { TextField } from '@cargo/react';
import { Phone } from '../icons';

export default function TextFieldAffixes() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <TextField
        label="Nomor telepon"
        type="tel"
        prefix="+62"
        placeholder="812 3456 7890"
      />
      <TextField label="Berat paket" inputMode="decimal" suffix="kg" placeholder="0" />
      <TextField
        label="Telepon kantor"
        type="tel"
        prefix={
          <>
            <Phone /> +62
          </>
        }
        placeholder="21 555 0101"
      />
    </div>
  );
}
