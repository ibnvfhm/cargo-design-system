# Cargo Design System

Satu sumber kebenaran untuk warna, tipografi, spacing, dan komponen di semua produk Cargo: UIC, INTI, InMeterai, InCivas, InCustom, dan brand lain yang menyusul.

## Status

| Langkah | Isi | Status |
|---|---|---|
| 1 | Primitive colors: semua warna mentah | Selesai di kode. Di Figma tinggal palet `grape` (INTI). |
| 2 | Semantic colors: tugas tiap warna (background, teks, border, ikon, status) | Berikutnya |
| 3 | Tema brand dan mode gelap | Belum |
| 4 | Token non-warna: tipografi, spacing, radius, shadow | Belum |
| 5 | Memasang token ke komponen Figma | Belum |
| 6 | Paket developer dan situs dokumentasi | Belum |

## Cara kerjanya

Designer mengatur token di Figma Variables. Nilai yang sama ditulis di `packages/tokens/src`, lalu `npm run build` menerjemahkannya ke file untuk setiap platform.

```
Figma Variables  ──►  src/primitive/color.json  ──►  npm run build  ──►  dist/
(collection Primitive)     (sumber nilai)          (Style Dictionary)   CSS, JS, Flutter, Android, iOS, docs
```

Satu token punya nama yang sama di semua tempat:

| Tempat | Nama |
|---|---|
| Figma | `color/imperial/50` |
| JSON | `color.imperial.50` |
| CSS | `--cargo-color-imperial-50` |
| JavaScript / TypeScript | `ColorImperial50` |
| Flutter, Android (Compose), iOS (SwiftUI) | `CargoTokens.colorImperial50` |

## Isi repo

```
packages/tokens/
├── src/primitive/color.json   sumber nilai, sama persis dengan collection Primitive di Figma
├── build.mjs                  menerjemahkan token ke setiap platform (Style Dictionary)
├── test/                      cek otomatis: 10 step per palet, hex valid, urut terang ke gelap
└── dist/                      hasil build, jangan diedit langsung
    ├── css/tokens.css
    ├── js/tokens.js, tokens.d.ts
    ├── flutter/cargo_tokens.dart
    ├── android/CargoTokens.kt
    ├── ios/CargoTokens.swift
    └── docs/colors.md         tabel warna dan kontras, dibuat otomatis
```

## Aturan primitive colors

- **Nama palet = nama warna**, bukan nama brand atau fungsi: `grape`, bukan `inti` atau `primary`. Fungsi warna diberikan oleh token semantic di Langkah 2.
- **Skala 10–100**: 10 paling terang, 100 paling gelap, 10 step di setiap palet.
- **Huruf kecil, tanpa spasi**: `color/yellow/10`.
- **Nilai asli dipertahankan**, jadi setiap palet punya batas warna teks sendiri. Lihat kolom "Teks kecil" di [`dist/docs/colors.md`](packages/tokens/dist/docs/colors.md).
- **Primitive tidak dipakai langsung di desain.** Di Figma, scoping-nya dikosongkan; desain dan komponen nanti memakai token semantic.

Palet yang ada sekarang:

| Palet | Asal |
|---|---|
| `neutral`, `yellow`, `red`, `green`, `blue`, `purple` | System: Neutral, Warning, Danger, Success, Info, Purple |
| `imperial` | Brand UIC |
| `grape` | Brand INTI |
| `fuchsia` | Brand InMeterai |
| `tosca` | Brand InCivas |
| `sea` | Brand InCustom |

Ditambah `white` (#FFFFFF) dan `black` (#212121, sama dengan `neutral.100`).

## Mengubah atau menambah token

1. Ubah di Figma (collection `Primitive`).
2. Ubah nilai yang sama di `packages/tokens/src/primitive/color.json`.
3. Jalankan dari root repo (butuh Node.js 22 atau lebih baru):
   ```sh
   npm install      # sekali saja
   npm run build    # membuat ulang dist/
   npm test         # memastikan struktur palet benar
   ```
4. Commit `src` dan `dist` bersama-sama, lalu catat perubahannya di [`CHANGELOG.md`](CHANGELOG.md).

## Memakai token (untuk developer)

Paket `@cargo/tokens` belum dipublikasikan. Sementara itu, salin file yang dibutuhkan dari `packages/tokens/dist/`.

> Untuk sekarang primitive hanya untuk mencoba. Setelah Langkah 2 selesai, komponen memakai token semantic seperti `bg/brand`, bukan nomor palet langsung.

**Web (CSS, Next.js, React)**: muat `tokens.css` sekali, misalnya di `app/layout.tsx`, lalu:
```css
.button { background: var(--cargo-color-imperial-50); color: var(--cargo-color-white); }
```

**JavaScript / TypeScript**:
```ts
import { ColorImperial50 } from '@cargo/tokens/js';
```

**Flutter**:
```dart
Container(color: CargoTokens.colorImperial50)
```

**Android (Jetpack Compose)**:
```kotlin
Box(Modifier.background(CargoTokens.colorImperial50))
```

**iOS (SwiftUI)**:
```swift
Rectangle().fill(CargoTokens.colorImperial50)
```
