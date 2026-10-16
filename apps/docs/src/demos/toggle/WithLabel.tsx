import { Toggle } from '@cargo/react';

export default function ToggleWithLabel() {
  return (
    <Toggle
      label="Laporan mingguan"
      description="Dikirim setiap Senin pagi ke email kantormu."
      defaultChecked
    >
      Kirim ringkasan
    </Toggle>
  );
}
