# Changelog

Semua perubahan penting dicatat di sini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan nomor versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Belum dirilis]

### Diubah

- `color.black` dari `#212121` menjadi `#000000` (hitam murni). Warna teks utama tetap `#212121` lewat `color.neutral.100`.

## [0.1.0] - 2026-10-07

### Ditambahkan

- Paket `@cargo/tokens` dengan 112 primitive color tokens: `white`, `black`, palet system (`neutral`, `yellow`, `red`, `green`, `blue`, `purple`), dan palet brand (`imperial` untuk UIC, `grape` untuk INTI, `fuchsia` untuk InMeterai, `tosca` untuk InCivas, `sea` untuk InCustom).
- Hasil build untuk CSS, JavaScript/TypeScript, Flutter, Android (Compose), dan iOS (SwiftUI).
- Tabel warna dan kontras yang dibuat otomatis di `packages/tokens/dist/docs/colors.md`.
- Tes otomatis untuk struktur palet: 10 step, hex valid, dan urutan terang ke gelap.
