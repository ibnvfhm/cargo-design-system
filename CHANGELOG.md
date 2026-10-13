# Changelog

Semua perubahan penting dicatat di sini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan nomor versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Belum dirilis]

### Ditambahkan

- Brand Theme untuk lima brand (`src/brand/`): UIC, INTI, InMeterai, InCivas, dan InCustoms. Setiap brand punya 16 token: `color.brand.light.*` untuk mode Light dan `color.brand.dark.*` untuk mode Dark.
- 56 token semantic dalam dua mode, `src/semantic/light.json` dan `src/semantic/dark.json`: `color.bg.*` (19), `color.text.*` (17), `color.icon.*` (10), dan `color.border.*` (10). Semuanya alias, dan setiap token punya deskripsi yang sama dengan di Figma.
- Hasil build untuk setiap brand: satu file CSS berisi mode Light dan Dark (dipilih dengan `data-theme`, atau otomatis mengikuti setelan sistem), modul JavaScript/TypeScript untuk setiap mode, serta kelas `CargoTokensLight` dan `CargoTokensDark` untuk Flutter, Android (Compose), dan iOS (SwiftUI).
- Di CSS dan file mobile, token semantic menunjuk ke token lain, misalnya `--cargo-color-bg-brand: var(--cargo-color-brand-light-fill)`.
- Dokumentasi yang dibuat otomatis: `dist/docs/semantic.md` (Brand Theme semua brand, serta Semantic Light dan Dark) dan `dist/docs/contrast.md` (hasil cek kontras untuk setiap brand dan mode).
- `contrast-exceptions.json`: 45 pasangan warna yang sengaja dibiarkan di bawah kontras minimum atas keputusan designer.
- Tes otomatis untuk Brand Theme, Semantic, dan kontras. Untuk setiap brand dan mode, 41 pasangan teks, ikon, dan garis harus mencapai kontras minimum, kecuali pasangan yang dicatat.
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

### Diubah

- `color.black` dari `#212121` menjadi `#000000` (hitam murni). Warna teks utama tetap `#212121` lewat `color.neutral.100`.
- Hasil build dipisah per brand dan mode: `dist/css/tokens.css` menjadi `dist/css/<brand>.css`, `dist/js/tokens.js` menjadi `dist/js/<brand>/<mode>.js`, dan kelas mobile `CargoTokens` menjadi `CargoTokensLight` dan `CargoTokensDark` di folder setiap brand. Export paket menjadi `@cargo/tokens/css/<brand>` dan `@cargo/tokens/js/<brand>/<mode>`.
- Palet `sea` sekarang dicatat untuk brand InCustoms (sebelumnya tertulis InCustom).
- Deskripsi `color.text.default`, `color.text.secondary`, dan `color.text.tertiary`: label form sekarang memakai `text/default` (sebelumnya disebut di `text/secondary`), sedangkan keterangan dan penghitung karakter memakai `text/tertiary`. Nilai warnanya tidak berubah. README punya tabel aturan teks di form.

### Diperbaiki

- Catatan grup, misalnya "System: Warning" di palet primitive atau "Latar. Scoping di Figma: …" di Semantic, sekarang tampil di `dist/docs/colors.md` dan `semantic.md`. Sebelumnya catatan ini hilang saat build.

## [0.1.0] - 2026-10-07

### Ditambahkan

- Paket `@cargo/tokens` dengan 112 primitive color tokens: `white`, `black`, palet system (`neutral`, `yellow`, `red`, `green`, `blue`, `purple`), dan palet brand (`imperial` untuk UIC, `grape` untuk INTI, `fuchsia` untuk InMeterai, `tosca` untuk InCivas, `sea` untuk InCustom).
- Hasil build untuk CSS, JavaScript/TypeScript, Flutter, Android (Compose), dan iOS (SwiftUI).
- Tabel warna dan kontras yang dibuat otomatis di `packages/tokens/dist/docs/colors.md`.
- Tes otomatis untuk struktur palet: 10 step, hex valid, dan urutan terang ke gelap.
