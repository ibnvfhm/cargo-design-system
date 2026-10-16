# Cargo Design System

Satu sumber kebenaran untuk warna, tipografi, spacing, dan komponen di semua produk Cargo: UIC, INTI, InMeterai, InCivas, InCustoms, dan brand lain yang menyusul.

## Status

| Langkah | Isi | Status |
|---|---|---|
| 1 | Primitive colors: semua warna mentah | Selesai, di Figma dan di kode |
| 2 | Semantic colors: tugas tiap warna (latar, teks, ikon, garis, status) | Selesai |
| 3 | Tema brand (UIC, INTI, InMeterai, InCivas, InCustoms) dan mode gelap | Selesai: 5 brand, mode Light dan Dark |
| 4 | Token non-warna: tipografi, spacing, radius, shadow | Selesai: spacing, radius, tebal garis, tipografi, dan shadow |
| 5 | Memasang token ke komponen Figma | Selesai: semua komponen dan ikon memakai token, style lama sudah dihapus, dan 33 halaman komponen sudah direview |
| 6 | Paket developer dan situs dokumentasi | Berjalan: situs dokumentasi sudah online di [cargo-design-system-docs.vercel.app](https://cargo-design-system-docs.vercel.app) (lihat [Situs dokumentasi](#situs-dokumentasi)); paket token belum dipublikasikan |

## Cara kerjanya

Token disusun dalam tiga lapis. Lapis kanan menunjuk (alias) ke lapis kirinya, jadi kalau satu warna mentah diganti, semua token yang menunjuk ke sana ikut berubah.

```
Primitive              Brand Theme (mode UIC)         Semantic
warna mentah     ◄──   warna khas brand        ◄──    tugas warna, dipakai di desain dan kode

color.imperial.70 ◄──  color.brand.light.fill  ◄──    color.bg.brand   (mode Light)
color.imperial.70 ◄──  color.brand.dark.fill   ◄──    color.bg.brand   (mode Dark)
```

- **Primitive**: semua warna mentah, dinamai sesuai warnanya. Tidak dipakai langsung.
- **Brand Theme**: warna khas setiap brand. Satu mode di Figma untuk setiap brand, dan satu file untuk setiap brand di kode. Grup `light` dipakai mode Light, grup `dark` dipakai mode Dark.
- **Semantic**: tugas warna, misalnya latar tombol utama atau teks error. Ada dua mode, Light dan Dark, dengan nama token yang sama; yang berbeda hanya warna yang dituju. **Inilah yang dipakai designer dan developer.**

Di Figma, setiap frame memilih satu mode Brand Theme (brand-nya) dan satu mode Semantic (Light atau Dark). Kombinasi apa pun dari 5 brand dan 2 mode pasti cocok.

Ukuran ada di collection terpisah, **Dimension**: spacing, radius, dan tebal garis. Ukuran sama untuk semua brand dan mode, jadi cukup satu lapis. Designer langsung memakai `space/16` atau `radius/8`, tanpa lapis semantic.

Tipografi ada di collection **Typography**, dengan mode Desktop dan Mobile seperti Light dan Dark. Text style di Figma memakai variable ini, jadi satu style otomatis berganti ukuran mengikuti mode frame-nya.

Shadow ada sebagai **effect style**, karena Figma belum bisa menyimpan shadow sebagai variable: `shadow/sm`, `md`, `lg`, `top`, dan `inner`, ditambah cincin fokus `focus-ring/default` dan `focus-ring/error`. Warna cincin fokus tersambung ke variable Semantic, jadi ikut brand dan mode.

Designer mengatur token di Figma Variables. Nilai yang sama ditulis di `packages/tokens/src`, lalu `npm run build` menerjemahkannya ke file untuk setiap platform, untuk setiap brand dan mode.

Satu token punya nama yang sama di semua tempat:

| Tempat | Warna | Ukuran | Tipografi |
|---|---|---|---|
| Figma | `color/bg/brand` | `space/16` | `body/font-size` |
| JSON | `color.bg.brand` | `space.16` | `body.font-size` |
| CSS | `--cargo-color-bg-brand` | `--cargo-space-16` | `--cargo-body-font-size` |
| JavaScript / TypeScript | `ColorBgBrand` | `Space16` | `BodyFontSize` |
| Flutter, Android (Compose), iOS (SwiftUI) | `CargoTokensLight.colorBgBrand` dan `CargoTokensDark.colorBgBrand` | `CargoDimension.space16` | `CargoTypographyMobile.bodyFontSize` dan `CargoTypographyDesktop.bodyFontSize` |

Text style `body/medium` di Figma menjadi class `.cargo-text-body-medium` di CSS. Effect style `shadow/md` menjadi `--cargo-shadow-md` di CSS, `ShadowMd` di JavaScript, dan `CargoShadow.shadowMdBlur` (beserta warna, offset, dan spread-nya) di mobile.

Brand dipilih dengan memakai file brand itu. Mode dipilih dengan `data-theme` di web, atau dengan kelas `Light`/`Dark` di mobile. Ukuran, tipografi, dan shadow sama di semua brand: di CSS sudah ikut di setiap file brand, sedangkan di JavaScript dan mobile ada di file tersendiri.

## Situs dokumentasi

Situs dokumentasi ada di `apps/docs`, dibuat dengan [Astro](https://astro.build). Tampilannya mengikuti Soul Design System: bar atas gelap, menu samping, dan beranda dengan hero. Situs ini juga memakai token Cargo, jadi brand (5 brand) dan mode Light/Dark bisa diganti langsung dari bar atas.

Isinya:
- **Beranda dan Mulai**: pengenalan, panduan memakai library Figma, panduan memasang token, status, dan changelog.
- **Foundations**: token warna, palet primitive, tema brand, kontras, tipografi, spacing dan radius, shadow, dan 186 ikon yang bisa dicari. Semuanya dibaca langsung dari `packages/tokens/src`, jadi selalu sama dengan file token.
- **Komponen**: satu halaman per halaman komponen di Figma, berisi gambar pratinjau (Light dan Dark), Kapan dipakai, Cara pakai, Hindari, varian, dan properti.

Menjalankan di komputer sendiri (butuh Node.js 22.12 atau lebih baru):
```sh
npm install          # sekali saja
npm run docs         # buka http://localhost:4321
npm run docs:build   # membuat situs statis di apps/docs/dist
```

Situsnya online di [cargo-design-system-docs.vercel.app](https://cargo-design-system-docs.vercel.app), diterbitkan lewat [Vercel](https://vercel.com). Pengaturannya ada di `vercel.json`. Root Directory proyek di Vercel harus folder paling atas repo (`./`), bukan `apps/docs` yang dipilih Vercel secara otomatis, supaya `vercel.json` terbaca. Vercel menjalankan `npm ci` dan `npm run docs:build`, lalu menerbitkan `apps/docs/dist`. Setiap perubahan di branch utama repo (saat ini `claude/ecstatic-cannon-vg2an8`) diterbitkan ulang otomatis dalam beberapa menit. Header `X-Robots-Tag: noindex` membuat situs tidak muncul di mesin pencari; hapus header itu kalau situs ini mau dibuka untuk umum.

Data dari Figma disimpan di repo, karena situs tidak membaca Figma secara langsung:

| File | Isi |
|---|---|
| `apps/docs/src/data/components.json` | Halaman, component set, varian, properti, dan deskripsi komponen |
| `apps/docs/src/data/icons.json` | 186 ikon (SVG 24px, Regular dan Fill) beserta kata kuncinya |
| `apps/docs/src/assets/komponen/` | Gambar pratinjau setiap component set, brand UIC, mode Light dan Dark |

Kalau komponen, deskripsi, atau ikon di Figma berubah, data ini perlu diekspor ulang dari Figma. Perubahan token cukup lewat `packages/tokens/src`, tanpa ekspor ulang.

## Isi repo

```
apps/docs/                      situs dokumentasi (Astro)
├── src/pages/                   halaman: Beranda, Mulai, Foundations, Komponen
├── src/data/                    data dari Figma: komponen dan ikon
└── src/assets/komponen/         gambar pratinjau komponen dari Figma

packages/tokens/
├── src/
│   ├── primitive/color.json     collection Primitive di Figma
│   ├── brand/                   collection Brand Theme, satu file per mode (brand)
│   │   ├── uic.json
│   │   ├── inti.json
│   │   ├── inmeterai.json
│   │   ├── incivas.json
│   │   └── incustoms.json
│   ├── semantic/                collection Semantic, satu file per mode
│   │   ├── light.json
│   │   ├── dark.json
│   │   └── focus-ring.json      effect style focus-ring/…, warnanya menunjuk ke token semantic
│   ├── dimension/               collection Dimension, satu file per grup
│   │   ├── space.json
│   │   ├── radius.json
│   │   └── border-width.json
│   ├── typography/              collection Typography, satu file per mode
│   │   ├── desktop.json
│   │   └── mobile.json
│   └── shadow/shadow.json       effect style shadow/…
├── lib/                         daftar brand dan mode, pasangan yang dicek kontrasnya, rumus kontras
├── contrast-exceptions.json     pasangan di bawah kontras minimum yang disengaja
├── build.mjs                    menerjemahkan token ke setiap platform (Style Dictionary)
├── test/                        cek otomatis: struktur, alias, deskripsi, kontras, skala ukuran
└── dist/                        hasil build, jangan diedit langsung
    ├── css/<brand>.css                              warna Light dan Dark, ukuran, tipografi, class text style, dan shadow dalam satu file
    ├── js/<brand>/light.js, dark.js                 warna dan cincin fokus, beserta .d.ts
    ├── js/dimension.js                              ukuran, beserta .d.ts
    ├── js/typography/desktop.js, mobile.js          tipografi, beserta .d.ts
    ├── js/shadow.js                                 shadow, beserta .d.ts
    ├── flutter/<brand>/cargo_tokens_light.dart, cargo_tokens_dark.dart
    ├── flutter/cargo_dimension.dart, cargo_typography_desktop.dart, cargo_typography_mobile.dart, cargo_shadow.dart
    ├── android/<brand>/CargoTokensLight.kt, CargoTokensDark.kt
    ├── android/CargoDimension.kt, CargoTypographyDesktop.kt, CargoTypographyMobile.kt, CargoShadow.kt
    ├── ios/<brand>/CargoTokensLight.swift, CargoTokensDark.swift
    ├── ios/CargoDimension.swift, CargoTypographyDesktop.swift, CargoTypographyMobile.swift, CargoShadow.swift
    └── docs/
        ├── colors.md            tabel primitive dan kontrasnya
        ├── semantic.md          Brand Theme semua brand, dan Semantic Light dan Dark
        ├── contrast.md          hasil cek kontras untuk setiap brand dan mode
        ├── dimension.md         spacing, radius, dan tebal garis
        ├── typography.md        jenis dan tebal huruf, peran, dan text style
        └── shadow.md            shadow dan cincin fokus
```

## Aturan primitive colors

- **Nama palet = nama warna**, bukan nama brand atau fungsi: `grape`, bukan `inti` atau `primary`.
- **Skala 10–100**: 10 paling terang, 100 paling gelap, 10 step di setiap palet.
- **Huruf kecil, tanpa spasi**: `color/yellow/10`.
- **Nilai asli dipertahankan**, jadi setiap palet punya batas warna teks sendiri. Lihat kolom "Teks kecil" di [`dist/docs/colors.md`](packages/tokens/dist/docs/colors.md).
- **Tidak dipakai langsung di desain.** Di Figma, scoping-nya dikosongkan.

| Palet | Asal |
|---|---|
| `neutral`, `yellow`, `red`, `green`, `blue`, `purple` | System: Neutral, Warning, Danger, Success, Info, Purple |
| `imperial` | Brand UIC |
| `grape` | Brand INTI |
| `fuchsia` | Brand InMeterai |
| `tosca` | Brand InCivas |
| `sea` | Brand InCustoms |
| `midnight` | Netral kebiruan untuk mode Dark, diturunkan dari latar #000211 (`midnight.100`) |

Ditambah `white` (#FFFFFF) dan `black` (#000000, hitam murni). Warna teks utama memakai `neutral.100` (#212121), bukan `black`. Latar mode Dark memakai `midnight.100` (#000211), dan lapisan di atasnya (sidebar, hover, garis) memakai step `midnight` yang lebih terang.

## Aturan Brand Theme

- **Setiap brand punya 16 token dengan nama yang sama**: 8 di grup `light` dan 8 di grup `dark`, yaitu `fill`, `fill-hover`, `fill-pressed`, `fill-subtle`, `on-fill`, `text`, `text-hover`, dan `border`.
- **Selalu alias ke primitive**, tidak pernah kode hex langsung.
- **Tidak dipakai langsung di desain.** Di Figma, scoping-nya dikosongkan.
- **Menambah brand**: tambah mode di collection Brand Theme di Figma, tambah file `src/brand/<brand>.json` dengan 16 token yang sama, lalu tambah satu baris di `lib/themes.mjs`.

## Aturan token semantic

- **Selalu alias**, tidak pernah kode hex langsung.
- **Dua mode, nama sama**: setiap token ada di `light.json` dan `dark.json` dengan nama dan deskripsi yang sama. Mode Light menunjuk ke primitive atau `brand.light.*`, mode Dark ke primitive atau `brand.dark.*`.
- **Empat kelompok**, masing-masing dengan scoping sendiri di Figma:

  | Kelompok | Isi | Scoping di Figma |
  |---|---|---|
  | `bg` (22) | latar | Fill: Frame dan Shape |
  | `text` (20) | teks | Fill: Text |
  | `icon` (16) | ikon | Fill: Shape, dan Stroke |
  | `border` (10) | garis | Stroke |

- **Panel yang melayang** (modal, dialog, bottom sheet, dropdown, toast, dan date picker) memakai `bg/elevated`. Di Light warnanya sama dengan `bg/default` (putih). Di Dark sedikit lebih terang (#161E2C), supaya tepi panel terlihat di latar #000211 yang membuat bayangan tidak tampak.
- **Tingkat penekanan**: `default`, `secondary`, `tertiary`. Kata "primary" sengaja tidak dipakai supaya tidak tertukar dengan warna brand.
- **Status**: `success`, `warning`, `error`, `info`. Ditambah `accent` (ungu) untuk penanda kategori lain, misalnya badge Accent, dan `text/holiday` (merah) untuk tanggal libur di kalender, misalnya hari Minggu di Date Picker.
- **Pasangan latar dan teks**: latar berwarna punya pasangan `text/on-…` dan `icon/on-…`, misalnya `bg/brand` dengan `text/on-brand` dan `icon/on-brand`, atau `bg/warning` dengan `text/on-warning` (gelap).
- **Teks di form**, sama di Text Fields, Text Area, Checkbox, Radio, dan Toggle:

  | Teks | Token |
  |---|---|
  | Label dan isi yang diketik | `text/default` |
  | Placeholder, keterangan, dan penghitung karakter | `text/tertiary` |
  | Pesan error | `text/error` |

- **Setiap token punya deskripsi.** Teksnya sama di Figma, di file token, dan sebagai komentar di semua hasil build.

Daftar lengkapnya ada di [`dist/docs/semantic.md`](packages/tokens/dist/docs/semantic.md).

## Aturan Dimension

- **Satu lapis**, dipakai langsung di desain dan kode.
- **Nama = nilai dalam px**: `space/16` bernilai 16px. Satu-satunya pengecualian adalah `radius/full` (9999), untuk semua bentuk pil dan lingkaran.
- **Grid 4px**, ditambah 2 dan 6 untuk elemen kecil. Tidak ada 10.
- **Tiga grup**, masing-masing dengan scoping sendiri di Figma:

  | Grup | Isi | Scoping di Figma |
  |---|---|---|
  | `space` (16) | gap dan padding | Gap |
  | `radius` (8) | sudut membulat | Corner radius |
  | `border-width` (2) | tebal garis | Stroke |

- **Angkanya sama di semua platform**: px di web, dp di Android, pt di iOS.

Daftar lengkapnya ada di [`dist/docs/dimension.md`](packages/tokens/dist/docs/dimension.md).

## Aturan tipografi

- **Dua mode, nama sama**: Desktop dan Mobile. Web memakai ukuran Mobile di layar kecil, lalu ukuran Desktop mulai lebar 768px. Aplikasi HP memakai ukuran Mobile.
- **10 peran**: `heading-1`, `heading-2`, `heading-3`, `title`, `body`, `small`, dan `extra-small` (huruf Inter, untuk aplikasi), serta `display-1` sampai `display-3` (huruf Montserrat, untuk judul besar di website).
- **Setiap peran punya tiga token**: `font-size`, `line-height`, dan `letter-spacing`, semuanya dalam px. Letter spacing ditulis dalam px karena begitulah Figma menyimpannya; nilainya berasal dari persen ukuran huruf, misalnya -2% × 24px = -0.48px.
- **Tebal huruf**: `regular` (400), `medium` (500), `bold` (700).
- **30 text style** = 10 peran × 3 tebal, misalnya `body/medium`.
- **Scoping di Figma** sesuai propertinya: Font family, Font weight, Font size, Line height, dan Letter spacing.
- Di file token, ketiga token peran memakai `$type` `fontSize`, supaya di Android hasilnya `sp` (ikut setelan ukuran huruf pengguna), bukan `dp`.

Daftar lengkapnya ada di [`dist/docs/typography.md`](packages/tokens/dist/docs/typography.md).

## Aturan shadow

- **Effect style di Figma**, bukan variable, karena Figma belum bisa menyimpan shadow sebagai variable.
- **Lima shadow**, sama di mode Light dan Dark:

  | Effect style | Dipakai untuk |
  |---|---|
  | `shadow/sm` | Kartu |
  | `shadow/md` | Search bar, dropdown, popover |
  | `shadow/lg` | Modal, bottom sheet |
  | `shadow/top` | Bottom navigation dan tombol yang menempel di bawah layar |
  | `shadow/inner` | Elemen yang tampak tertekan |

- **Cincin fokus**: `focus-ring/default` dan `focus-ring/error`. Bentuknya 2px warna latar (`bg/default`), lalu 2px warna fokus (`border/focus` atau `border/error`). Warnanya tersambung ke variable Semantic, jadi ikut brand dan mode. Aplikasi mobile tidak mendapat cincin fokus.
- **Di mobile**, setiap shadow dipecah menjadi warna, offset X, offset Y, blur, dan spread, karena Android, iOS, dan Flutter menggambar shadow dengan caranya masing-masing.

Daftar lengkapnya ada di [`dist/docs/shadow.md`](packages/tokens/dist/docs/shadow.md).

## Kontras

Untuk setiap brand dan mode, 55 pasangan dicek: setiap teks, ikon, dan garis terhadap latar tempat ia biasa dipakai. Teks butuh kontras minimal 4.5:1, ikon dan garis 3:1 (WCAG 2.2 AA). Daftar pasangannya ada di `lib/pairs.mjs`, dan hasilnya di [`dist/docs/contrast.md`](packages/tokens/dist/docs/contrast.md).

Beberapa pasangan sengaja dibiarkan di bawah standar atas keputusan designer. Pasangan itu dicatat di [`contrast-exceptions.json`](packages/tokens/contrast-exceptions.json). `npm test` gagal kalau ada pasangan lain yang turun di bawah standar, atau kalau pasangan yang dicatat ternyata sudah lolos (hapus dari daftar).

## Mengubah atau menambah token

1. Ubah di Figma.
2. Ubah hal yang sama di `packages/tokens/src`, di file yang sesuai dengan collection dan mode-nya.
3. Jalankan dari root repo (butuh Node.js 22 atau lebih baru):
   ```sh
   npm install      # sekali saja
   npm run build    # membuat ulang dist/
   npm test         # memastikan struktur, alias, deskripsi, dan kontras benar
   ```
4. Commit `src` dan `dist` bersama-sama, lalu catat perubahannya di [`CHANGELOG.md`](CHANGELOG.md).

## Memakai token (untuk developer)

Paket `@cargo/tokens` belum dipublikasikan. Sementara itu, salin file brand yang dibutuhkan dari `packages/tokens/dist/`.

Untuk warna, pakai **token semantic**, bukan primitive. Contohnya tombol utama:

**Web (CSS, Next.js, React)**: muat file brand-nya sekali, misalnya di `app/layout.tsx`:
```ts
import '@cargo/tokens/css/uic';
```
lalu pakai token semantic dan ukuran:
```css
.button-primary {
  padding: var(--cargo-space-8) var(--cargo-space-16);
  border-radius: var(--cargo-radius-8);
  background: var(--cargo-color-bg-brand);
  color: var(--cargo-color-text-on-brand);
}
.button-primary:hover { background: var(--cargo-color-bg-brand-hover); }
.button-primary:focus-visible { box-shadow: var(--cargo-focus-ring-default); }
.card { box-shadow: var(--cargo-shadow-sm); }
```
Mode Dark otomatis mengikuti setelan sistem. Untuk memilih sendiri, pasang `data-theme="dark"` atau `data-theme="light"` di `<html>`, atau di elemen lain untuk satu bagian halaman saja.

Untuk teks, pakai class text style. Ukurannya otomatis berganti di lebar 768px:
```html
<h1 class="cargo-text-heading-1-bold">Pengajuan cuti</h1>
<p class="cargo-text-body-regular">Permintaanmu sudah dikirim.</p>
```
Font Inter dan Montserrat perlu dimuat sendiri, misalnya dari Google Fonts.

**JavaScript / TypeScript**: warna dan cincin fokus ada di satu modul per brand dan mode; ukuran, tipografi, dan shadow masing-masing di modul tersendiri.
```ts
import { ColorBgBrand, ColorTextOnBrand } from '@cargo/tokens/js/uic/light';
import { Space16, Radius8 } from '@cargo/tokens/js/dimension';
import { BodyFontSize, BodyLineHeight } from '@cargo/tokens/js/typography/desktop';
import { ShadowMd } from '@cargo/tokens/js/shadow';
```

Aplikasi mobile memakai ukuran tipografi Mobile.

**Flutter**: salin `dist/flutter/<brand>/`, lalu `cargo_dimension.dart`, `cargo_typography_mobile.dart`, dan `cargo_shadow.dart` dari `dist/flutter/`.
```dart
final dark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
Container(
  padding: EdgeInsets.all(CargoDimension.space16),
  color: dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand,
)
```

**Android (Jetpack Compose)**: salin `dist/android/<brand>/`, lalu `CargoDimension.kt`, `CargoTypographyMobile.kt`, dan `CargoShadow.kt` dari `dist/android/`.
```kotlin
val bgBrand = if (isSystemInDarkTheme()) CargoTokensDark.colorBgBrand else CargoTokensLight.colorBgBrand
Box(Modifier.background(bgBrand).padding(CargoDimension.space16))
```

**iOS (SwiftUI)**: salin `dist/ios/<brand>/`, lalu `CargoDimension.swift`, `CargoTypographyMobile.swift`, dan `CargoShadow.swift` dari `dist/ios/`.
```swift
@Environment(\.colorScheme) private var colorScheme

Text("Kirim")
  .padding(CargoDimension.space16)
  .background(colorScheme == .dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand)
```
