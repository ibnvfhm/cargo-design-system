import { Button, Tooltip } from '@cargo/react';

export default function TooltipSides() {
  return (
    <>
      <Tooltip side="bottom" description="Panah di bawah, tooltip di atas.">
        <Button variant="outlined" size="sm">
          bottom (bawaan)
        </Button>
      </Tooltip>
      <Tooltip side="top" description="Panah di atas, tooltip di bawah.">
        <Button variant="outlined" size="sm">
          top
        </Button>
      </Tooltip>
      <Tooltip side="left" description="Panah di kiri, tooltip di kanan.">
        <Button variant="outlined" size="sm">
          left
        </Button>
      </Tooltip>
      <Tooltip side="right" description="Panah di kanan, tooltip di kiri.">
        <Button variant="outlined" size="sm">
          right
        </Button>
      </Tooltip>
    </>
  );
}
