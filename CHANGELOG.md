# Changelog

Semua perubahan penting dicatat di sini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan nomor versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Belum dirilis]

### Ditambahkan

- Brand Theme untuk lima brand (`src/brand/`): UIC, INTI, InMeterai, InCivas, dan InCustoms. Setiap brand punya 16 token: `color.brand.light.*` untuk mode Light dan `color.brand.dark.*` untuk mode Dark.
- 67 token semantic dalam dua mode, `src/semantic/light.json` dan `src/semantic/dark.json`: `color.bg.*` (21), `color.text.*` (20), `color.icon.*` (16), dan `color.border.*` (10). Semuanya alias, dan setiap token punya deskripsi yang sama dengan di Figma.
- Hasil build untuk setiap brand: satu file CSS berisi mode Light dan Dark (dipilih dengan `data-theme`, atau otomatis mengikuti setelan sistem), modul JavaScript/TypeScript untuk setiap mode, serta kelas `CargoTokensLight` dan `CargoTokensDark` untuk Flutter, Android (Compose), dan iOS (SwiftUI).
- Di CSS dan file mobile, token semantic menunjuk ke token lain, misalnya `--cargo-color-bg-brand: var(--cargo-color-brand-light-fill)`.
- Dokumentasi yang dibuat otomatis: `dist/docs/semantic.md` (Brand Theme semua brand, serta Semantic Light dan Dark) dan `dist/docs/contrast.md` (hasil cek kontras untuk setiap brand dan mode).
- `contrast-exceptions.json`: 30 pasangan warna yang sengaja dibiarkan di bawah kontras minimum atas keputusan designer.
- Tes otomatis untuk Brand Theme, Semantic, dan kontras. Untuk setiap brand dan mode, 52 pasangan teks, ikon, dan garis harus mencapai kontras minimum, kecuali pasangan yang dicatat.
- Collection Dimension (`src/dimension/`): 16 token spacing (`space.0` sampai `space.128`), 8 token radius (`radius.0` sampai `radius.16`, dan `radius.full` untuk bentuk pil), serta 2 token tebal garis (`border-width.1` dan `border-width.2`). Nama token sama dengan nilainya dalam px, di grid 4px ditambah 2 dan 6.
- Hasil build untuk Dimension: di CSS ikut di setiap file brand; di JavaScript ada `dist/js/dimension.js`; di Flutter, Android (Compose), dan iOS (SwiftUI) ada kelas `CargoDimension`. Angkanya sama di semua platform (px, dp, pt).
- Dokumentasi `dist/docs/dimension.md` dan tes skala ukuran.
- Tipografi (`src/typography/desktop.json` dan `mobile.json`): 2 font family (Inter dan Montserrat), 3 font weight, serta `font-size`, `line-height`, dan `letter-spacing` untuk 10 peran (`heading-1` sampai `display-3`), dalam mode Desktop dan Mobile.
- Hasil build tipografi: di CSS ikut di setiap file brand, dengan ukuran Mobile sebagai bawaan dan ukuran Desktop mulai lebar 768px, ditambah 30 class text style (misalnya `.cargo-text-body-medium`). Di JavaScript ada `dist/js/typography/desktop.js` dan `mobile.js`; di Flutter, Android (Compose), dan iOS (SwiftUI) ada kelas `CargoTypographyDesktop` dan `CargoTypographyMobile`.
- Dokumentasi `dist/docs/typography.md` dan tes tipografi.
- Shadow (`src/shadow/shadow.json`): `shadow.sm`, `shadow.md`, `shadow.lg`, `shadow.top`, dan `shadow.inner`, sama dengan effect style di Figma.
- Cincin fokus (`src/semantic/focus-ring.json`): `focus-ring.default` dan `focus-ring.error`. Warnanya menunjuk ke `color.bg.default`, `color.border.focus`, dan `color.border.error`, jadi ikut brand dan mode.
- Hasil build shadow: di CSS, shadow ada di setiap file brand dan cincin fokus ikut berganti di mode Dark. Di JavaScript ada `dist/js/shadow.js`, dan cincin fokus ada di file setiap brand. Di mobile ada kelas `CargoShadow`, dengan setiap shadow dipecah menjadi warna, offset, blur, dan spread.
- Dokumentasi `dist/docs/shadow.md` dan tes shadow.
- 10 token semantic baru yang dibutuhkan saat memasang token ke Badge (Langkah 5): `color.icon.on-error`, `on-success`, `on-warning`, dan `on-info` untuk ikon di atas latar status (nilainya sama dengan `text/on-…`), serta keluarga `accent` (ungu) untuk penanda kategori lain: `color.bg.accent`, `bg.accent-subtle`, `text.accent`, `text.on-accent`, `icon.accent`, dan `icon.on-accent`. Semuanya lolos tes kontras.
- `color.text.holiday` untuk tanggal libur di kalender, yaitu hari Minggu dan libur nasional (tanggal merah). Dipakai di Date Picker. Warnanya merah seperti `text/error` (`color.red.80` di Light, `color.red.40` di Dark), tapi tokennya terpisah supaya makna dan warnanya bisa diatur sendiri. Lolos tes kontras di latar biasa dan di latar rentang tanggal (`bg/brand-subtle`) untuk semua brand.
- Palet primitive `midnight` (10 step, `#F1F4F8` sampai `#000211`): netral kebiruan yang diturunkan dari latar mode Dark yang baru. Di Figma ada di collection Primitive sebagai `color/midnight/10` sampai `color/midnight/100`.

### Diubah

- Latar mode Dark menjadi `#000211` (`color.midnight.100`), sebelumnya `#212121` (`color.neutral.100`). Token lain di mode Dark ikut disesuaikan dengan palet `midnight`: `text/inverse` dan `icon/inverse` menjadi `midnight.100`; `bg/secondary` menjadi `midnight.90` (#161E2C; sebelumnya hitam murni, sekarang sedikit lebih terang dari latar karena tidak bisa lebih gelap lagi); `bg/tertiary` dan `bg/disabled` menjadi `midnight.80` (#29313F); `border/subtle` menjadi `midnight.80`, `border/default` menjadi `midnight.70` (#495260), `border/disabled` menjadi `midnight.60` (#5C6573), dan `border/strong` menjadi `midnight.50` (#838B98). Rasio kontras setiap lapisan terhadap latar dijaga sama seperti sebelumnya. Cincin fokus ikut berganti karena memakai `bg/default`. Semua tes kontras tetap lolos untuk 5 brand.
- `color.black` dari `#212121` menjadi `#000000` (hitam murni). Warna teks utama tetap `#212121` lewat `color.neutral.100`.
- Hasil build dipisah per brand dan mode: `dist/css/tokens.css` menjadi `dist/css/<brand>.css`, `dist/js/tokens.js` menjadi `dist/js/<brand>/<mode>.js`, dan kelas mobile `CargoTokens` menjadi `CargoTokensLight` dan `CargoTokensDark` di folder setiap brand. Export paket menjadi `@cargo/tokens/css/<brand>` dan `@cargo/tokens/js/<brand>/<mode>`.
- Palet `sea` sekarang dicatat untuk brand InCustoms (sebelumnya tertulis InCustom).
- Brand Theme UIC mode Dark: teks, link, ikon, dan garis brand (termasuk cincin fokus) sekarang memakai `color.imperial.30`, dan link saat hover memakai `color.imperial.20`. Sebelumnya teks, ikon, dan garis itu memakai `color.imperial.70`, yang hanya 1.24:1 di latar gelap, dan link hover memakai `color.imperial.60`. Isi brand menjadi `color.imperial.50`, hover tetap `color.imperial.60`, dan pressed menjadi `color.imperial.70`, jadi label putih tetap terbaca di setiap state. Semua pasangan UIC Dark sekarang lolos tes kontras, dan 7 pengecualiannya dihapus dari `contrast-exceptions.json`.
- Brand Theme INTI mode Dark: teks, link, ikon, dan garis brand (termasuk cincin fokus) sekarang memakai `color.grape.20`, dan link saat hover memakai `color.grape.10`. Sebelumnya teks, ikon, dan garis itu memakai `color.grape.50`, yang hanya 2.12:1 di latar gelap, dan link hover memakai `color.grape.40`. Isi brand menjadi `color.grape.40`, hover `color.grape.50`, dan pressed `color.grape.60`. Sebelumnya pressed memakai `color.grape.30`, sehingga label putih hanya 4.00:1. Semua pasangan INTI Dark sekarang lolos tes kontras, dan 8 pengecualiannya dihapus dari `contrast-exceptions.json`.
- Deskripsi `color.text.default`, `color.text.secondary`, dan `color.text.tertiary`: label form sekarang memakai `text/default` (sebelumnya disebut di `text/secondary`), sedangkan keterangan dan penghitung karakter memakai `text/tertiary`. Nilai warnanya tidak berubah. README punya tabel aturan teks di form.

### Diperbaiki

- Catatan grup, misalnya "System: Warning" di palet primitive atau "Latar. Scoping di Figma: …" di Semantic, sekarang tampil di `dist/docs/colors.md` dan `semantic.md`. Sebelumnya catatan ini hilang saat build.

## [0.1.0] - 2026-10-07

### Ditambahkan

- Paket `@cargo/tokens` dengan 112 primitive color tokens: `white`, `black`, palet system (`neutral`, `yellow`, `red`, `green`, `blue`, `purple`), dan palet brand (`imperial` untuk UIC, `grape` untuk INTI, `fuchsia` untuk InMeterai, `tosca` untuk InCivas, `sea` untuk InCustom).
- Hasil build untuk CSS, JavaScript/TypeScript, Flutter, Android (Compose), dan iOS (SwiftUI).
- Tabel warna dan kontras yang dibuat otomatis di `packages/tokens/dist/docs/colors.md`.
- Tes otomatis untuk struktur palet: 10 step, hex valid, dan urutan terang ke gelap.
