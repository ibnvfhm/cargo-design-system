# Cargo Design System

Satu sumber kebenaran untuk warna, tipografi, spacing, dan komponen di semua produk Cargo: UIC, INTI, InMeterai, InCivas, InCustoms, dan brand lain yang menyusul.

## Status

| Langkah | Isi | Status |
|---|---|---|
| 1 | Primitive colors: semua warna mentah | Selesai, di Figma dan di kode |
| 2 | Semantic colors: tugas tiap warna (latar, teks, ikon, garis, status) | Selesai |
| 3 | Tema brand (UIC, INTI, InMeterai, InCivas, InCustoms) dan mode gelap | Selesai: 5 brand, mode Light dan Dark |
| 4 | Token non-warna: tipografi, spacing, radius, shadow | Berikutnya |
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

Designer mengatur token di Figma Variables. Nilai yang sama ditulis di `packages/tokens/src`, lalu `npm run build` menerjemahkannya ke file untuk setiap platform, untuk setiap brand dan mode.

Satu token punya nama yang sama di semua tempat:

| Tempat | Nama |
|---|---|
| Figma | `color/bg/brand` |
| JSON | `color.bg.brand` |
| CSS | `--cargo-color-bg-brand` |
| JavaScript / TypeScript | `ColorBgBrand` |
| Flutter, Android (Compose), iOS (SwiftUI) | `CargoTokensLight.colorBgBrand` dan `CargoTokensDark.colorBgBrand` |

Brand dipilih dengan memakai file brand itu. Mode dipilih dengan `data-theme` di web, atau dengan kelas `Light`/`Dark` di mobile.

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
│   └── semantic/                collection Semantic, satu file per mode
│       ├── light.json
│       └── dark.json
├── lib/                         daftar brand dan mode, pasangan yang dicek kontrasnya, rumus kontras
├── contrast-exceptions.json     pasangan di bawah kontras minimum yang disengaja
├── build.mjs                    menerjemahkan token ke setiap platform (Style Dictionary)
├── test/                        cek otomatis: struktur, alias, deskripsi, kontras
└── dist/                        hasil build, jangan diedit langsung
    ├── css/<brand>.css                              mode Light dan Dark dalam satu file
    ├── js/<brand>/light.js, dark.js                 beserta .d.ts
    ├── flutter/<brand>/cargo_tokens_light.dart, cargo_tokens_dark.dart
    ├── android/<brand>/CargoTokensLight.kt, CargoTokensDark.kt
    ├── ios/<brand>/CargoTokensLight.swift, CargoTokensDark.swift
    └── docs/
        ├── colors.md            tabel primitive dan kontrasnya
        ├── semantic.md          Brand Theme semua brand, dan Semantic Light dan Dark
        └── contrast.md          hasil cek kontras untuk setiap brand dan mode
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

Pakai **token semantic**, bukan primitive. Contohnya tombol utama:

**Web (CSS, Next.js, React)**: muat file brand-nya sekali, misalnya di `app/layout.tsx`:
```ts
import '@cargo/tokens/css/uic';
```
lalu pakai token semantic:
```css
.button-primary {
  background: var(--cargo-color-bg-brand);
  color: var(--cargo-color-text-on-brand);
}
.button-primary:hover { background: var(--cargo-color-bg-brand-hover); }
.button-primary:focus-visible { outline: 2px solid var(--cargo-color-border-focus); }
```
Mode Dark otomatis mengikuti setelan sistem. Untuk memilih sendiri, pasang `data-theme="dark"` atau `data-theme="light"` di `<html>`, atau di elemen lain untuk satu bagian halaman saja.

**JavaScript / TypeScript**: satu modul per brand dan mode.
```ts
import { ColorBgBrand, ColorTextOnBrand } from '@cargo/tokens/js/uic/light';
```

**Flutter**: salin `dist/flutter/<brand>/`.
```dart
final dark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
Container(color: dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand)
```

**Android (Jetpack Compose)**: salin `dist/android/<brand>/`.
```kotlin
val bgBrand = if (isSystemInDarkTheme()) CargoTokensDark.colorBgBrand else CargoTokensLight.colorBgBrand
Box(Modifier.background(bgBrand))
```

**iOS (SwiftUI)**: salin `dist/ios/<brand>/`.
```swift
@Environment(\.colorScheme) private var colorScheme

Rectangle().fill(colorScheme == .dark ? CargoTokensDark.colorBgBrand : CargoTokensLight.colorBgBrand)
```
