import { Chip } from '@cargo/react';
import { MapPin } from '../icons';

export default function ChipFilter() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Chip defaultSelected>Semua</Chip>
      <Chip>Dikirim</Chip>
      <Chip>Selesai</Chip>
      <Chip icon={<MapPin />}>Terdekat</Chip>
    </div>
  );
}
