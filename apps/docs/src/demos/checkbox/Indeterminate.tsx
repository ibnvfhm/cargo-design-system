import { Checkbox } from '@cargo/react';
import { useState } from 'react';

const cities = ['Jakarta', 'Bandung', 'Surabaya'];

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = useState(['Jakarta']);
  const all = checked.length === cities.length;
  const some = checked.length > 0 && !all;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox
        checked={all}
        indeterminate={some}
        onChange={() => setChecked(all ? [] : cities)}
      >
        Semua kota
      </Checkbox>
      <div style={{ display: 'grid', gap: 12, paddingLeft: 28 }}>
        {cities.map((city) => (
          <Checkbox
            key={city}
            checked={checked.includes(city)}
            onChange={(event) =>
              setChecked(
                event.target.checked
                  ? [...checked, city]
                  : checked.filter((item) => item !== city),
              )
            }
          >
            {city}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
