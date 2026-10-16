import { Badge } from '@cargo/react';

export default function BadgeSizes() {
  return (
    <>
      <Badge size="md">Md</Badge>
      <Badge size="sm">Sm</Badge>
      <Badge size="xs">Xs</Badge>
      <Badge type="counter" size="md">9</Badge>
      <Badge type="counter" size="sm">9</Badge>
      <Badge type="counter" size="xs">9</Badge>
    </>
  );
}
