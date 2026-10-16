import { Checkbox, CheckboxGroup } from '@cargo/react';

export default function CheckboxSizes() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
      <CheckboxGroup label="Ukuran md">
        <Checkbox defaultChecked>Email</Checkbox>
        <Checkbox>SMS</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup label="Ukuran sm" size="sm">
        <Checkbox defaultChecked>Email</Checkbox>
        <Checkbox>SMS</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
