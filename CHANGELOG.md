# Changelog

Semua perubahan penting dicatat di sini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan nomor versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Belum dirilis]

### Ditambahkan

- Brand Theme untuk UIC (`src/brand/uic.json`): 8 token `color.brand.*`. Warna utamanya navy `color.imperial.70`.
- 56 token semantic untuk mode Light (`src/semantic/color.json`): `color.bg.*` (19), `color.text.*` (17), `color.icon.*` (10), dan `color.border.*` (10). Semuanya alias, dan setiap token punya deskripsi yang sama dengan di Figma.
- Di CSS dan file mobile, token semantic menunjuk ke token lain, misalnya `--cargo-color-bg-brand: var(--cargo-color-brand-fill)`.
- Tabel Brand Theme dan Semantic yang dibuat otomatis di `packages/tokens/dist/docs/semantic.md`.
- Tes otomatis untuk token semantic: harus alias, harus punya deskripsi, dan 36 pasangan teks, ikon, serta garis harus mencapai kontras minimum.

### Diubah

- `color.black` dari `#212121` menjadi `#000000` (hitam murni). Warna teks utama tetap `#212121` lewat `color.neutral.100`.

## [0.1.0] - 2026-10-07

### Ditambahkan

- Paket `@cargo/tokens` dengan 112 primitive color tokens: `white`, `black`, palet system (`neutral`, `yellow`, `red`, `green`, `blue`, `purple`), dan palet brand (`imperial` untuk UIC, `grape` untuk INTI, `fuchsia` untuk InMeterai, `tosca` untuk InCivas, `sea` untuk InCustom).
- Hasil build untuk CSS, JavaScript/TypeScript, Flutter, Android (Compose), dan iOS (SwiftUI).
- Tabel warna dan kontras yang dibuat otomatis di `packages/tokens/dist/docs/colors.md`.
- Tes otomatis untuk struktur palet: 10 step, hex valid, dan urutan terang ke gelap.
