import { Button, Tooltip } from '@cargo/react';
import { Download, Info } from '../icons';

export default function TooltipBasic() {
  return (
    <>
      <Tooltip description="Unduh laporan bulan ini sebagai Excel.">
        <Button variant="outlined" size="md" leftIcon={<Download />}>
          Ekspor
        </Button>
      </Tooltip>
      <Tooltip title="Biaya layanan" description="Dipakai untuk asuransi pengiriman.">
        <Button
          variant="borderless"
          size="md"
          aria-label="Info biaya layanan"
          leftIcon={<Info />}
        />
      </Tooltip>
    </>
  );
}
