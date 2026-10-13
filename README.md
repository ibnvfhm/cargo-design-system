# Cargo Design System

Satu sumber kebenaran untuk warna, tipografi, spacing, dan komponen di semua produk Cargo: UIC, INTI, InMeterai, InCivas, InCustoms, dan brand lain yang menyusul.

## Status

| Langkah | Isi | Status |
|---|---|---|
| 1 | Primitive colors: semua warna mentah | Selesai, di Figma dan di kode |
| 2 | Semantic colors: tugas tiap warna (latar, teks, ikon, garis, status) | Selesai |
| 3 | Tema brand (UIC, INTI, InMeterai, InCivas, InCustoms) dan mode gelap | Selesai: 5 brand, mode Light dan Dark |
| 4 | Token non-warna: tipografi, spacing, radius, shadow | Sedang berjalan: spacing, radius, dan tebal garis selesai; tipografi dan shadow berikutnya |
| 5 | Memasang token ke komponen Figma | Belum |
| 6 | Paket developer dan situs dokumentasi | Belum |

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

Designer mengatur token di Figma Variables. Nilai yang sama ditulis di `packages/tokens/src`, lalu `npm run build` menerjemahkannya ke file untuk setiap platform, untuk setiap brand dan mode.

Satu token punya nama yang sama di semua tempat:

| Tempat | Warna | Ukuran |
|---|---|---|
| Figma | `color/bg/brand` | `space/16` |
| JSON | `color.bg.brand` | `space.16` |
| CSS | `--cargo-color-bg-brand` | `--cargo-space-16` |
| JavaScript / TypeScript | `ColorBgBrand` | `Space16` |
| Flutter, Android (Compose), iOS (SwiftUI) | `CargoTokensLight.colorBgBrand` dan `CargoTokensDark.colorBgBrand` | `CargoDimension.space16` |

Brand dipilih dengan memakai file brand itu. Mode dipilih dengan `data-theme` di web, atau dengan kelas `Light`/`Dark` di mobile. Ukuran sama di semua brand dan mode: di CSS sudah ikut di setiap file brand, sedangkan di JavaScript dan mobile ada di file tersendiri.

## Isi repo

```
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
│   │   └── dark.json
│   └── dimension/               collection Dimension, satu file per grup
│       ├── space.json
│       ├── radius.json
│       └── border-width.json
├── lib/                         daftar brand dan mode, pasangan yang dicek kontrasnya, rumus kontras
├── contrast-exceptions.json     pasangan di bawah kontras minimum yang disengaja
├── build.mjs                    menerjemahkan token ke setiap platform (Style Dictionary)
├── test/                        cek otomatis: struktur, alias, deskripsi, kontras, skala ukuran
└── dist/                        hasil build, jangan diedit langsung
    ├── css/<brand>.css                              warna mode Light dan Dark, plus semua ukuran, dalam satu file
    ├── js/<brand>/light.js, dark.js                 warna, beserta .d.ts
    ├── js/dimension.js                              ukuran, beserta .d.ts
    ├── flutter/<brand>/cargo_tokens_light.dart, cargo_tokens_dark.dart
    ├── flutter/cargo_dimension.dart
    ├── android/<brand>/CargoTokensLight.kt, CargoTokensDark.kt
    ├── android/CargoDimension.kt
    ├── ios/<brand>/CargoTokensLight.swift, CargoTokensDark.swift
    ├── ios/CargoDimension.swift
    └── docs/
        ├── colors.md            tabel primitive dan kontrasnya
        ├── semantic.md          Brand Theme semua brand, dan Semantic Light dan Dark
        ├── contrast.md          hasil cek kontras untuk setiap brand dan mode
        └── dimension.md         spacing, radius, dan tebal garis
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

Ditambah `white` (#FFFFFF) dan `black` (#000000, hitam murni). Warna teks utama memakai `neutral.100` (#212121), bukan `black`.

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
  | `bg` (19) | latar | Fill: Frame dan Shape |
  | `text` (17) | teks | Fill: Text |
  | `icon` (10) | ikon | Fill: Shape, dan Stroke |
  | `border` (10) | garis | Stroke |

- **Tingkat penekanan**: `default`, `secondary`, `tertiary`. Kata "primary" sengaja tidak dipakai supaya tidak tertukar dengan warna brand.
- **Status**: `success`, `warning`, `error`, `info`.
- **Pasangan latar dan teks**: latar berwarna punya pasangan `text/on-…`, misalnya `bg/brand` dengan `text/on-brand`, atau `bg/warning` dengan `text/on-warning` (gelap).
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

## Kontras

Untuk setiap brand dan mode, 41 pasangan dicek: setiap teks, ikon, dan garis terhadap latar tempat ia biasa dipakai. Teks butuh kontras minimal 4.5:1, ikon dan garis 3:1 (WCAG 2.2 AA). Daftar pasangannya ada di `lib/pairs.mjs`, dan hasilnya di [`dist/docs/contrast.md`](packages/tokens/dist/docs/contrast.md).

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
.button-primary:focus-visible { outline: var(--cargo-border-width-2) solid var(--cargo-color-border-focus); }
```
Mode Dark otomatis mengikuti setelan sistem. Untuk memilih sendiri, pasang `data-theme="dark"` atau `data-theme="light"` di `<html>`, atau di elemen lain untuk satu bagian halaman saja.

**JavaScript / TypeScript**: warna ada di satu modul per brand dan mode, ukuran di satu modul tersendiri.
```ts
import { ColorBgBrand, ColorTextOnBrand } from '@cargo/tokens/js/uic/light';
import { Space16, Radius8 } from '@cargo/tokens/js/dimension';
```

**Flutter**: salin `dist/flutter/<brand>/` dan `dist/flutter/cargo_dimension.dart`.
```dart
final dark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
Container(
  padding: EdgeInsets.all(CargoDimension.space16),
  color: dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand,
)
```

**Android (Jetpack Compose)**: salin `dist/android/<brand>/` dan `dist/android/CargoDimension.kt`.
```kotlin
val bgBrand = if (isSystemInDarkTheme()) CargoTokensDark.colorBgBrand else CargoTokensLight.colorBgBrand
Box(Modifier.background(bgBrand).padding(CargoDimension.space16))
```

**iOS (SwiftUI)**: salin `dist/ios/<brand>/` dan `dist/ios/CargoDimension.swift`.
```swift
@Environment(\.colorScheme) private var colorScheme

Text("Kirim")
  .padding(CargoDimension.space16)
  .background(colorScheme == .dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand)
```
