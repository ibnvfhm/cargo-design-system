# Semantic colors Cargo

> Dibuat otomatis dari `packages/tokens/src/brand` dan `packages/tokens/src/semantic`. Jangan edit file ini langsung.

Desain dan kode memakai token semantic, bukan primitive. Di mode Light, token semantic menunjuk ke primitive atau `brand.light.*`; di mode Dark, ke primitive atau `brand.dark.*`. Warna `brand.*` bergantung pada brand yang dipakai, jadi lihat tabel Brand Theme.

Setiap sel berisi token yang dituju (tanpa awalan `color.`) dan warna akhirnya.

## Brand Theme

Warna khas setiap brand, satu file per brand di `src/brand/`. Tidak dipakai langsung di desain; desain memakai token semantic.

### color.brand.light

Dipakai oleh Semantic mode Light.

| Token | UIC | INTI | InMeterai | InCivas | InCustoms | Dipakai untuk |
|---|---|---|---|---|---|---|
| `color.brand.light.fill` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Isi warna brand: tombol utama, toggle aktif, elemen terpilih. |
| `color.brand.light.fill-hover` | `imperial.80` `#002358` | `grape.60` `#682865` | `fuchsia.60` `#EC0C50` | `tosca.60` `#08918C` | `sea.60` `#0466F9` | Isi brand saat kursor di atasnya. |
| `color.brand.light.fill-pressed` | `imperial.90` `#001A40` | `grape.70` `#4C1D49` | `fuchsia.70` `#AC093A` | `tosca.70` `#066966` | `sea.70` `#02419E` | Isi brand saat ditekan. |
| `color.brand.light.fill-subtle` | `imperial.10` `#E3EEFF` | `grape.10` `#F2DDF1` | `fuchsia.10` `#FEE5EC` | `tosca.10` `#D4FDFB` | `sea.10` `#F2F7FF` | Latar brand yang lembut: chip atau item terpilih. |
| `color.brand.light.on-fill` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks dan ikon di atas isi brand. |
| `color.brand.light.text` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Teks dan link berwarna brand di atas latar terang. |
| `color.brand.light.text-hover` | `imperial.80` `#002358` | `grape.60` `#682865` | `fuchsia.60` `#EC0C50` | `tosca.60` `#08918C` | `sea.60` `#0466F9` | Teks atau link brand saat kursor di atasnya. |
| `color.brand.light.border` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Garis brand: elemen terpilih dan cincin fokus. |

### color.brand.dark

Dipakai oleh Semantic mode Dark.

| Token | UIC | INTI | InMeterai | InCivas | InCustoms | Dipakai untuk |
|---|---|---|---|---|---|---|
| `color.brand.dark.fill` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Isi warna brand di mode Dark: tombol utama, toggle aktif, elemen terpilih. |
| `color.brand.dark.fill-hover` | `imperial.60` `#0044A9` | `grape.40` `#A640A1` | `fuchsia.40` `#F76E97` | `tosca.40` `#13F3EB` | `sea.40` `#6DA6FD` | Isi brand di mode Dark saat kursor di atasnya. |
| `color.brand.dark.fill-pressed` | `imperial.50` `#005AE2` | `grape.30` `#BE57B9` | `fuchsia.30` `#FAA3BD` | `tosca.30` `#69F7F2` | `sea.30` `#A2C7FE` | Isi brand di mode Dark saat ditekan. |
| `color.brand.dark.fill-subtle` | `imperial.90` `#001A40` | `grape.90` `#260F25` | `fuchsia.90` `#2B020E` | `tosca.90` `#011A19` | `sea.90` `#011C44` | Latar brand yang lembut di mode Dark: chip atau item terpilih. |
| `color.brand.dark.on-fill` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks dan ikon di atas isi brand di mode Dark. |
| `color.brand.dark.text` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Teks dan link berwarna brand di atas latar gelap. |
| `color.brand.dark.text-hover` | `imperial.60` `#0044A9` | `grape.40` `#A640A1` | `fuchsia.40` `#F76E97` | `tosca.40` `#13F3EB` | `sea.40` `#6DA6FD` | Teks atau link brand di mode Dark saat kursor di atasnya. |
| `color.brand.dark.border` | `imperial.70` `#002D71` | `grape.50` `#843380` | `fuchsia.50` `#F5487C` | `tosca.50` `#0ABAB5` | `sea.50` `#458DFC` | Garis brand di mode Dark: elemen terpilih dan cincin fokus. |

## bg

Latar. Scoping di Figma: Fill untuk Frame dan Shape.

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `color.bg.default` | `white` `#FFFFFF` | `neutral.100` `#212121` | Latar halaman, kartu, dan modal. |
| `color.bg.secondary` | `neutral.20` `#F5F5F5` | `black` `#000000` | Latar bagian yang dibedakan, misalnya sidebar. |
| `color.bg.tertiary` | `neutral.30` `#EEEEEE` | `neutral.90` `#424242` | Latar lapis ketiga, misalnya hover pada daftar. |
| `color.bg.disabled` | `neutral.40` `#E0E0E0` | `neutral.90` `#424242` | Latar komponen yang tidak aktif. Teks di atasnya: text/disabled. |
| `color.bg.inverse` | `neutral.100` `#212121` | `white` `#FFFFFF` | Latar yang berlawanan dengan bg/default (gelap di mode Light, terang di mode Dark): tooltip dan snackbar. Teks di atasnya: text/inverse. |
| `color.bg.brand` | `brand.light.fill` | `brand.dark.fill` | Tombol utama dan elemen brand. Teks di atasnya: text/on-brand. |
| `color.bg.brand-hover` | `brand.light.fill-hover` | `brand.dark.fill-hover` | Tombol utama saat kursor di atasnya. |
| `color.bg.brand-pressed` | `brand.light.fill-pressed` | `brand.dark.fill-pressed` | Tombol utama saat ditekan. |
| `color.bg.brand-subtle` | `brand.light.fill-subtle` | `brand.dark.fill-subtle` | Latar lembut brand, misalnya item terpilih. Teks di atasnya: text/brand. |
| `color.bg.error` | `red.70` `#D70000` | `red.70` `#D70000` | Tombol hapus dan badge error. Teks di atasnya: text/on-error. |
| `color.bg.error-hover` | `red.80` `#AC0000` | `red.80` `#AC0000` | Tombol hapus saat kursor di atasnya. |
| `color.bg.error-pressed` | `red.90` `#810000` | `red.90` `#810000` | Tombol hapus saat ditekan. |
| `color.bg.error-subtle` | `red.10` `#FFE1E1` | `red.100` `#560000` | Latar pesan error. Teks di atasnya: text/error. |
| `color.bg.success` | `green.80` `#20741B` | `green.80` `#20741B` | Badge sukses. Teks di atasnya: text/on-success. |
| `color.bg.success-subtle` | `green.10` `#E2F8E1` | `green.100` `#103A0E` | Latar pesan sukses. Teks di atasnya: text/success. |
| `color.bg.warning` | `yellow.70` `#E6AA07` | `yellow.70` `#E6AA07` | Badge peringatan. Teks di atasnya: text/on-warning (gelap). |
| `color.bg.warning-subtle` | `yellow.10` `#FEF8E6` | `yellow.100` `#5C4403` | Latar pesan peringatan. Teks di atasnya: text/warning. |
| `color.bg.info` | `blue.70` `#0C52A3` | `blue.70` `#0C52A3` | Badge informasi. Teks di atasnya: text/on-info. |
| `color.bg.info-subtle` | `blue.10` `#EDF5FE` | `blue.100` `#052141` | Latar pesan informasi. Teks di atasnya: text/info. |
| `color.bg.accent` | `purple.50` `#7833D8` | `purple.50` `#7833D8` | Badge kategori lain (ungu). Teks di atasnya: text/on-accent. |
| `color.bg.accent-subtle` | `purple.10` `#F2EFFD` | `purple.100` `#180533` | Latar penanda kategori lain (ungu), misalnya badge Accent. Teks di atasnya: text/accent. |

## text

Teks. Scoping di Figma: Fill untuk Text.

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `color.text.default` | `neutral.100` `#212121` | `white` `#FFFFFF` | Teks utama: judul, isi, dan label form. |
| `color.text.secondary` | `neutral.90` `#424242` | `neutral.40` `#E0E0E0` | Teks pendukung: subjudul dan informasi tambahan, misalnya tanggal di kartu. |
| `color.text.tertiary` | `neutral.80` `#616161` | `neutral.50` `#BDBDBD` | Teks paling lembut yang masih terbaca: placeholder, keterangan, dan penghitung karakter. |
| `color.text.disabled` | `neutral.60` `#9E9E9E` | `neutral.70` `#757575` | Teks komponen yang tidak aktif (tidak wajib memenuhi kontras). |
| `color.text.inverse` | `white` `#FFFFFF` | `neutral.100` `#212121` | Teks di atas bg/inverse. |
| `color.text.brand` | `brand.light.text` | `brand.dark.text` | Teks berwarna brand, misalnya tab yang aktif. |
| `color.text.link` | `brand.light.text` | `brand.dark.text` | Link di dalam teks. |
| `color.text.link-hover` | `brand.light.text-hover` | `brand.dark.text-hover` | Link saat kursor di atasnya. |
| `color.text.on-brand` | `brand.light.on-fill` | `brand.dark.on-fill` | Teks di atas bg/brand. |
| `color.text.on-error` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks di atas bg/error. |
| `color.text.on-success` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks di atas bg/success. |
| `color.text.on-warning` | `neutral.100` `#212121` | `neutral.100` `#212121` | Teks di atas bg/warning. Gelap, karena teks putih tidak terbaca di atas kuning. |
| `color.text.on-info` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks di atas bg/info. |
| `color.text.error` | `red.80` `#AC0000` | `red.40` `#FF5B5B` | Pesan error, misalnya teks validasi di bawah input. |
| `color.text.success` | `green.80` `#20741B` | `green.50` `#36C92F` | Pesan sukses. |
| `color.text.warning` | `yellow.90` `#8A6604` | `yellow.60` `#F8C024` | Pesan peringatan. |
| `color.text.info` | `blue.70` `#0C52A3` | `blue.30` `#60A5F3` | Pesan informasi. |
| `color.text.accent` | `purple.50` `#7833D8` | `purple.30` `#9C74EC` | Teks penanda kategori lain (ungu). |
| `color.text.on-accent` | `white` `#FFFFFF` | `white` `#FFFFFF` | Teks di atas bg/accent. |

## icon

Ikon. Scoping di Figma: Fill untuk Shape, dan Stroke.

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `color.icon.default` | `neutral.100` `#212121` | `white` `#FFFFFF` | Ikon utama, misalnya ikon menu dan ikon di tombol teks. |
| `color.icon.secondary` | `neutral.80` `#616161` | `neutral.50` `#BDBDBD` | Ikon pendukung, misalnya ikon cari atau kalender di dalam input. |
| `color.icon.disabled` | `neutral.60` `#9E9E9E` | `neutral.70` `#757575` | Ikon pada komponen yang tidak aktif. |
| `color.icon.inverse` | `white` `#FFFFFF` | `neutral.100` `#212121` | Ikon di atas bg/inverse, misalnya di tooltip atau snackbar. |
| `color.icon.brand` | `brand.light.text` | `brand.dark.text` | Ikon berwarna brand, misalnya ikon tab yang aktif. |
| `color.icon.on-brand` | `brand.light.on-fill` | `brand.dark.on-fill` | Ikon di atas bg/brand, misalnya ikon panah di tombol Kirim. |
| `color.icon.error` | `red.70` `#D70000` | `red.50` `#FF2D2D` | Ikon error, misalnya tanda seru di pesan error. |
| `color.icon.success` | `green.70` `#279122` | `green.60` `#2FAE29` | Ikon sukses, misalnya tanda centang. |
| `color.icon.warning` | `yellow.80` `#B88806` | `yellow.70` `#E6AA07` | Ikon peringatan, misalnya segitiga bertanda seru. |
| `color.icon.info` | `blue.60` `#0F63C3` | `blue.40` `#2C87EF` | Ikon informasi, misalnya ikon huruf i di pesan info. |
| `color.icon.on-error` | `white` `#FFFFFF` | `white` `#FFFFFF` | Ikon di atas bg/error, misalnya ikon di tombol Danger. |
| `color.icon.on-success` | `white` `#FFFFFF` | `white` `#FFFFFF` | Ikon di atas bg/success. |
| `color.icon.on-warning` | `neutral.100` `#212121` | `neutral.100` `#212121` | Ikon di atas bg/warning. |
| `color.icon.on-info` | `white` `#FFFFFF` | `white` `#FFFFFF` | Ikon di atas bg/info. |
| `color.icon.accent` | `purple.50` `#7833D8` | `purple.30` `#9C74EC` | Ikon penanda kategori lain (ungu). |
| `color.icon.on-accent` | `white` `#FFFFFF` | `white` `#FFFFFF` | Ikon di atas bg/accent. |

## border

Garis. Scoping di Figma: Stroke.

| Token | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `color.border.subtle` | `neutral.40` `#E0E0E0` | `neutral.90` `#424242` | Garis pemisah yang sangat halus, misalnya di antara item daftar. Dekoratif. |
| `color.border.default` | `neutral.50` `#BDBDBD` | `neutral.80` `#616161` | Garis kartu dan pembatas bagian. Dekoratif, jangan jadi satu-satunya penanda batas input. |
| `color.border.strong` | `neutral.80` `#616161` | `neutral.60` `#9E9E9E` | Garis input, checkbox, dan kontrol lain yang harus terlihat jelas. |
| `color.border.disabled` | `neutral.60` `#9E9E9E` | `neutral.70` `#757575` | Garis komponen yang tidak aktif. |
| `color.border.brand` | `brand.light.border` | `brand.dark.border` | Garis elemen terpilih, misalnya kartu terpilih atau tombol outline Batal. |
| `color.border.focus` | `brand.light.border` | `brand.dark.border` | Cincin fokus saat berpindah elemen dengan keyboard. |
| `color.border.error` | `red.70` `#D70000` | `red.50` `#FF2D2D` | Garis input yang error. |
| `color.border.success` | `green.70` `#279122` | `green.60` `#2FAE29` | Garis input yang valid. |
| `color.border.warning` | `yellow.80` `#B88806` | `yellow.70` `#E6AA07` | Garis input dengan peringatan. |
| `color.border.info` | `blue.60` `#0F63C3` | `blue.40` `#2C87EF` | Garis kotak informasi. |
