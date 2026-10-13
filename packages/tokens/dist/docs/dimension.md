# Dimension Cargo

> Dibuat otomatis dari `packages/tokens/src/dimension`. Jangan edit file ini langsung.

Ukuran yang sama untuk semua brand dan mode: spacing, radius, dan tebal garis. Nilainya dalam px, sama seperti di Figma. Di Android menjadi dp dan di iOS menjadi pt, dengan angka yang sama.

## space

Jarak: gap dan padding auto layout. Scoping di Figma: Gap. Grid 4px, ditambah 2 dan 6 untuk elemen kecil.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `space.0` | `0px` | Tanpa jarak. |
| `space.2` | `2px` | Jarak paling rapat, misalnya antara label dan teks bantuan di input. |
| `space.4` | `4px` | Jarak rapat, misalnya antara ikon dan teks di badge atau checkbox. |
| `space.6` | `6px` | Jarak rapat untuk komponen kecil, misalnya ikon dan teks di tombol kecil. |
| `space.8` | `8px` | Jarak umum antarelemen di dalam komponen, misalnya ikon dan teks di tombol. |
| `space.12` | `12px` | Padding komponen kecil, misalnya tombol dan chip. |
| `space.16` | `16px` | Padding standar kartu, modal, dan tooltip. |
| `space.20` | `20px` | Jarak antarkelompok di dalam kartu atau form. |
| `space.24` | `24px` | Jarak antarkelompok yang lebih longgar, misalnya antarbagian form. |
| `space.32` | `32px` | Jarak antarbagian di dalam modal atau halaman. |
| `space.40` | `40px` | Jarak antarbagian halaman. |
| `space.48` | `48px` | Jarak antarbagian halaman yang besar. |
| `space.64` | `64px` | Jarak antar-section di website. |
| `space.80` | `80px` | Jarak antar-section besar di website. |
| `space.96` | `96px` | Jarak antar-section besar di website. |
| `space.128` | `128px` | Jarak antar-section paling besar di website. |

## radius

Sudut membulat. Scoping di Figma: Corner radius. radius.full membuat bentuk pil dan lingkaran.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `radius.0` | `0px` | Sudut tajam. |
| `radius.2` | `2px` | Sudut sangat kecil, misalnya checkbox kecil. |
| `radius.4` | `4px` | Sudut kecil, misalnya checkbox dan langkah di stepper. |
| `radius.6` | `6px` | Sudut input (text field, search bar, text area) dan tombol kecil. |
| `radius.8` | `8px` | Sudut standar: tombol sedang, modal, tooltip, dan section message. |
| `radius.12` | `12px` | Sudut besar, misalnya kartu besar. |
| `radius.16` | `16px` | Sudut sangat besar, misalnya bottom sheet. |
| `radius.full` | `9999px` | Bentuk pil dan lingkaran: badge, toggle, radio, avatar. |

## border-width

Tebal garis. Scoping di Figma: Stroke.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `border-width.1` | `1px` | Garis standar: input, kartu, dan pemisah. |
| `border-width.2` | `2px` | Garis tebal: input yang fokus atau terpilih, dan cincin fokus. |
