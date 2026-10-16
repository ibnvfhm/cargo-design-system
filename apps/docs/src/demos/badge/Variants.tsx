import { Badge, type BadgeVariant } from '@cargo/react';

const variants: Array<[BadgeVariant, string]> = [
  ['primary', 'Utama'],
  ['info', 'Info'],
  ['warning', 'Menunggu'],
  ['success', 'Disetujui'],
  ['danger', 'Ditolak'],
  ['gray', 'Draf'],
  ['accent', 'Lainnya'],
];

export default function BadgeVariants() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {variants.map(([variant, text]) => (
          <Badge key={variant} variant={variant}>
            {text}
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {variants.map(([variant, text]) => (
          <Badge key={variant} variant={variant} appearance="solid">
            {text}
          </Badge>
        ))}
      </div>
    </div>
  );
}
