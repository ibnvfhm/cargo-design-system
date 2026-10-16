import { Chip } from '@cargo/react';

export default function ChipSizes() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip defaultSelected>md</Chip>
        <Chip variant="input">md</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip size="sm" defaultSelected>
          sm
        </Chip>
        <Chip size="sm" variant="input">
          sm
        </Chip>
        <Chip size="sm" variant="input" disabled>
          Disabled
        </Chip>
      </div>
    </div>
  );
}
