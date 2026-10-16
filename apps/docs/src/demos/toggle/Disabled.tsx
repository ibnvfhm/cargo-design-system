import { Toggle } from '@cargo/react';

export default function ToggleDisabled() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Toggle disabled>Sinkronisasi otomatis</Toggle>
      <Toggle disabled defaultChecked>
        Enkripsi data
      </Toggle>
    </div>
  );
}
