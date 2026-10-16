import { Button } from '@cargo/react';

export default function ButtonDevice() {
  return (
    <>
      <Button size="md" device="desktop">
        Desktop
      </Button>
      <Button size="md" device="mobile">
        Mobile
      </Button>
    </>
  );
}
