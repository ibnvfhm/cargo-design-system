// One small example per component, shared by the server rendering and hydration tests.
import type { FunctionComponent } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  RadioButton,
  RadioGroup,
  TextArea,
  TextField,
  Toggle,
} from '../src/index.js';

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
  Checkbox: () => (
    <CheckboxGroup label="Notifikasi" required size="sm">
      <Checkbox defaultChecked>Email</Checkbox>
      <Checkbox indeterminate description="Sebagian">
        Semua
      </Checkbox>
    </CheckboxGroup>
  ),
  RadioButton: () => (
    <RadioGroup label="Pengiriman" defaultValue="a" error="Pilih salah satu.">
      <RadioButton value="a">Reguler</RadioButton>
      <RadioButton value="b" description="Sampai hari ini">
        Kilat
      </RadioButton>
    </RadioGroup>
  ),
  Toggle: () => (
    <Toggle label="Notifikasi" defaultChecked description="Langsung tersimpan.">
      Email
    </Toggle>
  ),
  Chip: () => (
    <p>
      <Chip defaultSelected>Jakarta</Chip>
      <Chip variant="input" size="sm">
        Surabaya
      </Chip>
    </p>
  ),
};
