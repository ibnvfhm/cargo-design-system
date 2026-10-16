import { Checkbox } from '@cargo/react';

export default function CheckboxStates() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox error="Centang untuk melanjutkan.">
        Saya setuju dengan syarat dan ketentuan
      </Checkbox>
      <Checkbox disabled>Tidak tersedia</Checkbox>
      <Checkbox disabled defaultChecked>
        Sudah aktif
      </Checkbox>
    </div>
  );
}
