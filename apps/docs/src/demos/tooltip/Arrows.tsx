import { Button, Tooltip } from '@cargo/react';

export default function TooltipArrows() {
  return (
    <>
      <Tooltip arrow="left" description="Panah 16px dari tepi kiri.">
        <Button variant="outlined" size="sm">
          left
        </Button>
      </Tooltip>
      <Tooltip arrow="center" description="Panah di tengah.">
        <Button variant="outlined" size="sm">
          center (bawaan)
        </Button>
      </Tooltip>
      <Tooltip arrow="right" description="Panah 16px dari tepi kanan.">
        <Button variant="outlined" size="sm">
          right
        </Button>
      </Tooltip>
    </>
  );
}
