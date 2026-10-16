import { Chip } from '@cargo/react';
import { useState } from 'react';

export default function ChipInput() {
  const [cities, setCities] = useState(['Jakarta', 'Bandung', 'Surabaya']);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {cities.map((city) => (
        <Chip
          key={city}
          variant="input"
          onRemove={() => setCities(cities.filter((item) => item !== city))}
        >
          {city}
        </Chip>
      ))}
      {cities.length === 0 && <span>Semua kota dihapus.</span>}
    </div>
  );
}
