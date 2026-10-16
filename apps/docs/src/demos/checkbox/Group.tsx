import { Checkbox, CheckboxGroup } from '@cargo/react';

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup label="Notifikasi" required description="Pilih minimal satu.">
      <Checkbox defaultChecked>Email</Checkbox>
      <Checkbox>SMS</Checkbox>
      <Checkbox description="Lewat aplikasi di ponselmu.">Push notification</Checkbox>
    </CheckboxGroup>
  );
}
