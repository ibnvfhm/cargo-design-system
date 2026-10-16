import { RadioButton, RadioGroup } from '@cargo/react';

export default function RadioGroupDemo() {
  return (
    <RadioGroup label="Metode pembayaran" required defaultValue="transfer">
      <RadioButton value="transfer">Transfer bank</RadioButton>
      <RadioButton value="ewallet" description="GoPay, OVO, atau DANA.">
        Dompet digital
      </RadioButton>
      <RadioButton value="cod">Bayar di tempat</RadioButton>
    </RadioGroup>
  );
}
