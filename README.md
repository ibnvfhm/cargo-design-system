# Cargo Design System

Satu sumber kebenaran untuk warna, tipografi, spacing, dan komponen di semua produk Cargo: UIC, INTI, InMeterai, InCivas, InCustom, dan brand lain yang menyusul.

## Status

| Langkah | Isi | Status |
|---|---|---|
| 1 | Primitive colors: semua warna mentah | Selesai, di Figma dan di kode |
| 2 | Semantic colors: tugas tiap warna (latar, teks, ikon, garis, status) | Selesai untuk brand UIC, mode Light |
| 3 | Tema brand (INTI, InMeterai, InCivas, InCustom) dan mode gelap | Berikutnya |
| 4 | Token non-warna: tipografi, spacing, radius, shadow | Belum |
| 5 | Memasang token ke komponen Figma | Belum |
| 6 | Paket developer dan situs dokumentasi | Belum |

## Cara kerjanya

Token disusun dalam tiga lapis. Lapis kanan menunjuk (alias) ke lapis kirinya, jadi kalau satu warna mentah diganti, semua token yang menunjuk ke sana ikut berubah.

```
Primitive              Brand Theme (mode UIC)      Semantic (mode Light)
warna mentah     ◄──   warna khas brand      ◄──   tugas warna, dipakai di desain dan kode
color.imperial.70      color.brand.fill            color.bg.brand
```

- **Primitive**: semua warna mentah, dinamai sesuai warnanya. Tidak dipakai langsung.
- **Brand Theme**: warna khas setiap brand. Satu file per brand; sekarang baru UIC.
- **Semantic**: tugas warna, misalnya latar tombol utama atau teks error. **Inilah yang dipakai designer dan developer.**

Designer mengatur token di Figma Variables. Nilai yang sama ditulis di `packages/tokens/src`, lalu `npm run build` menerjemahkannya ke file untuk setiap platform.

Satu token punya nama yang sama di semua tempat:

| Tempat | Nama |
|---|---|
| Figma | `color/bg/brand` |
| JSON | `color.bg.brand` |
| CSS | `--cargo-color-bg-brand` |
| JavaScript / TypeScript | `ColorBgBrand` |
| Flutter, Android (Compose), iOS (SwiftUI) | `CargoTokens.colorBgBrand` |

## Isi repo

```
packages/tokens/
├── src/
│   ├── primitive/color.json   collection Primitive di Figma
│   ├── brand/uic.json         collection Brand Theme, mode UIC
│   └── semantic/color.json    collection Semantic, mode Light
├── build.mjs                  menerjemahkan token ke setiap platform (Style Dictionary)
├── test/                      cek otomatis: struktur palet, alias, deskripsi, kontras
└── dist/                      hasil build, jangan diedit langsung
    ├── css/tokens.css
    ├── js/tokens.js, tokens.d.ts
    ├── flutter/cargo_tokens.dart
    ├── android/CargoTokens.kt
    ├── ios/CargoTokens.swift
    └── docs/
        ├── colors.md          tabel primitive dan kontrasnya
        └── semantic.md        tabel Brand Theme dan Semantic: menunjuk ke mana dan dipakai untuk apa
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
| `sea` | Brand InCustom |

Ditambah `white` (#FFFFFF) dan `black` (#000000, hitam murni). Warna teks utama memakai `neutral.100` (#212121), bukan `black`.

## Aturan token semantic

- **Selalu alias**, tidak pernah kode hex langsung.
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

## Mengubah atau menambah token

1. Ubah di Figma.
2. Ubah hal yang sama di `packages/tokens/src`, di file yang sesuai dengan collection-nya.
3. Jalankan dari root repo (butuh Node.js 22 atau lebih baru):
   ```sh
   npm install      # sekali saja
   npm run build    # membuat ulang dist/
   npm test         # memastikan struktur, alias, deskripsi, dan kontras benar
   ```
4. Commit `src` dan `dist` bersama-sama, lalu catat perubahannya di [`CHANGELOG.md`](CHANGELOG.md).

## Memakai token (untuk developer)

Paket `@cargo/tokens` belum dipublikasikan. Sementara itu, salin file yang dibutuhkan dari `packages/tokens/dist/`.

Pakai **token semantic**, bukan primitive. Contohnya tombol utama:

**Web (CSS, Next.js, React)**: muat `tokens.css` sekali, misalnya di `app/layout.tsx`, lalu:
```css
.button-primary {
  background: var(--cargo-color-bg-brand);
  color: var(--cargo-color-text-on-brand);
}
.button-primary:hover { background: var(--cargo-color-bg-brand-hover); }
.button-primary:focus-visible { outline: 2px solid var(--cargo-color-border-focus); }
```

**JavaScript / TypeScript**:
```ts
import { ColorBgBrand, ColorTextOnBrand } from '@cargo/tokens/js';
```

**Flutter**:
```dart
Container(color: CargoTokens.colorBgBrand)
```

**Android (Jetpack Compose)**:
```kotlin
Box(Modifier.background(CargoTokens.colorBgBrand))
```

**iOS (SwiftUI)**:
```swift
Rectangle().fill(CargoTokens.colorBgBrand)
```
