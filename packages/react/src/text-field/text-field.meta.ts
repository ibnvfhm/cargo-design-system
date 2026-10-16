import type { ComponentMeta } from '../meta-types.js';

// Figma has an icon swap per Device and side; code has one prop per side, sized automatically.
const swaps = (part: string, left: string, right: string) =>
  Object.fromEntries(
    ['Desktop', 'Mobile'].flatMap((device) => [
      [`${device} Change Left ${part} Icon`, { prop: left }],
      [`${device} Change Right ${part} Icon`, { prop: right }],
    ]),
  );

const loginRow = 'Bukan bagian dari TextField. Susun sendiri di bawahnya, misalnya Checkbox "Ingat akun" dan tautan "Lupa kata sandi?".';

export const textFieldMeta: ComponentMeta = {
  name: 'TextField',
  figmaSet: 'Text Field',
  figmaNode: '114:649',
  client: true,
  props: [
    { name: 'label', type: 'ReactNode', figma: 'Label Text, Label', description: 'Label di atas kolom. Tanpa label, beri aria-label supaya kolom tetap punya nama.' },
    { name: 'placeholder', type: 'string', figma: 'Placeholder Text', description: 'Contoh isian di dalam kolom. Jangan dipakai sebagai pengganti label.' },
    { name: 'required', type: 'boolean', default: 'false', figma: 'Required Object', description: 'Kolom wajib diisi: menampilkan penanda wajib dan memasang atribut required.' },
    { name: 'requiredIndicator', type: "'text' | 'symbol'", default: "'text'", figma: 'Required Object › Type', description: 'Bentuk penanda wajib: text untuk "(Required)", symbol untuk "*".' },
    { name: 'description', type: 'ReactNode', figma: 'Description (Type=Normal)', description: 'Teks bantuan di bawah kolom.' },
    {
      name: 'error',
      type: 'ReactNode',
      figma: 'Description (Type=Error)',
      description: 'Pesan error. Menggantikan description, membuat garis kolom merah, dan memasang aria-invalid. Isi true untuk menandai error tanpa pesan.',
    },
    { name: 'leftIcon', type: 'ReactNode', figma: 'Left Placeholder Icon', description: 'Ikon di kiri isian. Ukurannya otomatis: 18px Desktop, 16px Mobile.' },
    { name: 'rightIcon', type: 'ReactNode', figma: 'Right Placeholder Icon', description: 'Ikon di kanan isian.' },
    { name: 'prefix', type: 'ReactNode', figma: 'Type=Prefix, Prefix Text', description: 'Kotak awalan di kiri, misalnya +62. Bisa berisi ikon; ukurannya otomatis 20px Desktop, 16px Mobile.' },
    { name: 'suffix', type: 'ReactNode', figma: 'Type=Suffix, Suffix Text', description: 'Kotak akhiran di kanan, misalnya kg.' },
    { name: 'clearable', type: 'boolean', default: 'true', figma: 'State=Pressed', description: 'Tombol hapus isian yang muncul saat kolom berisi. Isi false untuk menyembunyikannya.' },
    { name: 'clearLabel', type: 'string', default: "'Hapus isian'", description: 'Nama tombol hapus isian untuk screen reader.' },
    {
      name: 'device',
      type: "'desktop' | 'mobile'",
      figma: 'Device',
      description: 'Memaksa ukuran Desktop (kolom 44px) atau Mobile (32px). Tanpa prop ini, ukuran mengikuti data-device di atasnya atau lebar layar.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', figma: 'State=Disabled', description: 'Kolom tidak aktif.' },
  ],
  attributes: 'Atribut lain, seperti name, value, onChange, type, dan autoComplete, diteruskan ke <input>, begitu juga ref. style dipasang di elemen terluar.',
  axes: {
    Device: { prop: 'device', values: { Desktop: 'desktop', Mobile: 'mobile' }, note: 'Tanpa device, ukuran mengikuti lebar layar.' },
    State: {
      figmaOnly:
        'Muncul otomatis: Hover saat kursor di atas kolom, Focussed saat mengetik, Pressed saat kolom berisi (garis brand dan tombol hapus). Disabled menjadi prop disabled.',
    },
    Type: {
      prop: 'prefix, suffix',
      values: { Normal: '', Prefix: 'prefix', Suffix: 'suffix' },
      note: 'Isi prefix atau suffix dengan teks atau ikon, misalnya prefix="+62". Keduanya bisa dipakai bersamaan.',
    },
  },
  properties: {
    'Label Text': { prop: 'label' },
    Label: { prop: 'label', note: 'Label tampil kalau label diisi.' },
    'Placeholder Text': { prop: 'placeholder' },
    'Required Object': { prop: 'required', note: 'Penanda wajib tampil kalau required; bentuknya diatur requiredIndicator.' },
    'Left Placeholder Icon': { prop: 'leftIcon', note: 'Ikon tampil kalau leftIcon diisi.' },
    'Right Placeholder Icon': { prop: 'rightIcon', note: 'Ikon tampil kalau rightIcon diisi.' },
    ...swaps('Placeholder', 'leftIcon', 'rightIcon'),
    Prefix: { prop: 'prefix', note: 'Kotak awalan tampil kalau prefix diisi.' },
    'Prefix Text': { prop: 'prefix' },
    'Left Prefix Icon': { prop: 'prefix', note: 'Taruh ikon di dalam prefix bersama teksnya.' },
    'Right Prefix Icon': { prop: 'prefix' },
    ...swaps('Prefix', 'prefix', 'prefix'),
    Suffix: { prop: 'suffix', note: 'Kotak akhiran tampil kalau suffix diisi.' },
    'Suffix Text': { prop: 'suffix' },
    'Left Suffix Icon': { prop: 'suffix', note: 'Taruh ikon di dalam suffix bersama teksnya.' },
    'Right Suffix Icon': { prop: 'suffix' },
    ...swaps('Suffix', 'suffix', 'suffix'),
    Description: { prop: 'description, error', note: 'Teks di bawah kolom tampil kalau description atau error diisi.' },
    Support: { figmaOnly: loginRow },
    'Remember Account': { figmaOnly: loginRow },
    'Forget Password': { figmaOnly: loginRow },
    'Forget Text': { figmaOnly: loginRow },
  },
  helperSets: {
    'Required Object': {
      figmaNode: '1269:2868',
      axes: { Type: { prop: 'requiredIndicator', values: { Text: 'text', Symbol: 'symbol' } } },
      properties: {},
    },
    Description: {
      figmaNode: '1535:321',
      axes: { Type: { prop: 'description, error', values: { Normal: 'description', Error: 'error' }, note: 'Kalau error diisi, pesannya menggantikan description.' } },
      properties: { 'Description Text': { prop: 'description, error' } },
    },
  },
  accessibility: [
    'Label terhubung ke kolom: mengeklik label memfokuskan kolom, dan screen reader membacanya sebagai nama kolom.',
    'Tanpa label yang terlihat, kolom wajib punya aria-label atau aria-labelledby. TypeScript menolak TextField tanpa keduanya.',
    'Teks bantuan, pesan error, prefix, dan suffix dibaca sebagai keterangan kolom (aria-describedby). Saat error, kolom ditandai aria-invalid.',
    'Penanda wajib disembunyikan dari screen reader; yang dibaca adalah atribut required.',
    'Tombol hapus isian tidak masuk urutan Tab supaya form tidak bertambah panjang; dengan keyboard, isian dihapus dengan memilih teks lalu Delete.',
  ],
};
