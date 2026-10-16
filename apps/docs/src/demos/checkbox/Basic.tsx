import { Checkbox } from '@cargo/react';

export default function CheckboxBasic() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox>Ingat saya</Checkbox>
      <Checkbox defaultChecked>Kirim notifikasi email</Checkbox>
      <Checkbox description="Kami kirim promo paling banyak seminggu sekali.">
        Terima promo
      </Checkbox>
    </div>
  );
}
