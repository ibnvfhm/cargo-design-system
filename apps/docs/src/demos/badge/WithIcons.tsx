import { Badge } from '@cargo/react';
import { Lightning, Star } from '../icons';

export default function BadgeWithIcons() {
  return (
    <>
      <Badge leftIcon={<Lightning fill />}>Cepat</Badge>
      <Badge variant="accent" rightIcon={<Star fill />}>
        Favorit
      </Badge>
      <Badge variant="success" appearance="solid" leftIcon={<Lightning fill />} rightIcon={<Star fill />}>
        Unggulan
      </Badge>
    </>
  );
}
