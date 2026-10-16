// One small example per component, shared by the server rendering and hydration tests.
import type { FunctionComponent } from 'react';
import { Badge, Button, TextArea, TextField } from '../src/index.js';

export const examples: Record<string, FunctionComponent> = {
  Badge: () => (
    <p>
      <Badge>Label</Badge>
      <Badge type="counter">9</Badge>
      <Badge type="dot">Baru</Badge>
    </p>
  ),
  Button: () => (
    <p>
      <Button>Simpan</Button>
      <Button variant="outlined" size="md" device="mobile">
        Batal
      </Button>
      <Button aria-label="Tambah" leftIcon={<svg viewBox="0 0 24 24" />} />
    </p>
  ),
  TextField: () => (
    <form>
      <TextField label="Email" required description="Kami tidak membagikan email." />
      <TextField label="Nomor telepon" prefix="+62" defaultValue="812" error="Nomor belum lengkap." device="mobile" />
    </form>
  ),
  TextArea: () => (
    <form>
      <TextArea label="Catatan" counter maxLength={100} defaultValue="Antar sore" />
    </form>
  ),
};
