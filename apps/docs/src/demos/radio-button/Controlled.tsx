import { RadioButton, RadioGroup } from '@cargo/react';
import { useState } from 'react';

export default function RadioControlled() {
  const [shipping, setShipping] = useState('');
  return (
    <RadioGroup
      label="Pengiriman"
      required
      value={shipping}
      onValueChange={setShipping}
      error={shipping ? undefined : 'Pilih salah satu.'}
    >
      <RadioButton value="reguler" description="2–3 hari">
        Reguler
      </RadioButton>
      <RadioButton value="kilat" description="Sampai hari ini">
        Kilat
      </RadioButton>
    </RadioGroup>
  );
}
