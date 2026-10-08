# Semantic colors Cargo

> Dibuat otomatis dari `packages/tokens/src/brand` dan `packages/tokens/src/semantic`. Jangan edit file ini langsung.

Desain dan kode memakai token semantic, bukan primitive. Setiap token menunjuk ke token lain; kolom Hex menunjukkan warna akhirnya untuk brand UIC dalam mode Light.

## Brand Theme (mode UIC)

| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |
|---|---|---|---|
| `color.brand.fill` | `color.imperial.70` | `#002D71` | Isi warna brand: tombol utama, toggle aktif, elemen terpilih. |
| `color.brand.fill-hover` | `color.imperial.80` | `#002358` | Isi brand saat kursor di atasnya. |
| `color.brand.fill-pressed` | `color.imperial.90` | `#001A40` | Isi brand saat ditekan. |
| `color.brand.fill-subtle` | `color.imperial.10` | `#E3EEFF` | Latar brand yang lembut: chip atau item terpilih. |
| `color.brand.on-fill` | `color.white` | `#FFFFFF` | Teks dan ikon di atas isi brand. |
| `color.brand.text` | `color.imperial.70` | `#002D71` | Teks dan link berwarna brand di atas latar terang. |
| `color.brand.text-hover` | `color.imperial.80` | `#002358` | Teks atau link brand saat kursor di atasnya. |
| `color.brand.border` | `color.imperial.70` | `#002D71` | Garis brand: elemen terpilih dan cincin fokus. |

## bg

| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |
|---|---|---|---|
| `color.bg.default` | `color.white` | `#FFFFFF` | Latar halaman, kartu, dan modal. |
| `color.bg.secondary` | `color.neutral.20` | `#F5F5F5` | Latar bagian yang dibedakan, misalnya sidebar. |
| `color.bg.tertiary` | `color.neutral.30` | `#EEEEEE` | Latar lapis ketiga, misalnya hover pada daftar. |
| `color.bg.disabled` | `color.neutral.40` | `#E0E0E0` | Latar komponen yang tidak aktif. Teks di atasnya: text/disabled. |
| `color.bg.inverse` | `color.neutral.100` | `#212121` | Latar gelap: tooltip dan snackbar. Teks di atasnya: text/inverse. |
| `color.bg.brand` | `color.brand.fill` | `#002D71` | Tombol utama dan elemen brand. Teks di atasnya: text/on-brand. |
| `color.bg.brand-hover` | `color.brand.fill-hover` | `#002358` | Tombol utama saat kursor di atasnya. |
| `color.bg.brand-pressed` | `color.brand.fill-pressed` | `#001A40` | Tombol utama saat ditekan. |
| `color.bg.brand-subtle` | `color.brand.fill-subtle` | `#E3EEFF` | Latar lembut brand, misalnya item terpilih. Teks di atasnya: text/brand. |
| `color.bg.error` | `color.red.70` | `#D70000` | Tombol hapus dan badge error. Teks di atasnya: text/on-error. |
| `color.bg.error-hover` | `color.red.80` | `#AC0000` | Tombol hapus saat kursor di atasnya. |
| `color.bg.error-pressed` | `color.red.90` | `#810000` | Tombol hapus saat ditekan. |
| `color.bg.error-subtle` | `color.red.10` | `#FFE1E1` | Latar pesan error. Teks di atasnya: text/error. |
| `color.bg.success` | `color.green.80` | `#20741B` | Badge sukses. Teks di atasnya: text/on-success. |
| `color.bg.success-subtle` | `color.green.10` | `#E2F8E1` | Latar pesan sukses. Teks di atasnya: text/success. |
| `color.bg.warning` | `color.yellow.70` | `#E6AA07` | Badge peringatan. Teks di atasnya: text/on-warning (gelap). |
| `color.bg.warning-subtle` | `color.yellow.10` | `#FEF8E6` | Latar pesan peringatan. Teks di atasnya: text/warning. |
| `color.bg.info` | `color.blue.70` | `#0C52A3` | Badge informasi. Teks di atasnya: text/on-info. |
| `color.bg.info-subtle` | `color.blue.10` | `#EDF5FE` | Latar pesan informasi. Teks di atasnya: text/info. |

## text

| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |
|---|---|---|---|
| `color.text.default` | `color.neutral.100` | `#212121` | Teks utama: judul dan isi. |
| `color.text.secondary` | `color.neutral.90` | `#424242` | Teks pendukung: subjudul dan label. |
| `color.text.tertiary` | `color.neutral.80` | `#616161` | Teks paling lembut yang masih terbaca: placeholder dan keterangan. |
| `color.text.disabled` | `color.neutral.60` | `#9E9E9E` | Teks komponen yang tidak aktif (tidak wajib memenuhi kontras). |
| `color.text.inverse` | `color.white` | `#FFFFFF` | Teks di atas bg/inverse. |
| `color.text.brand` | `color.brand.text` | `#002D71` | Teks berwarna brand, misalnya tab yang aktif. |
| `color.text.link` | `color.brand.text` | `#002D71` | Link di dalam teks. |
| `color.text.link-hover` | `color.brand.text-hover` | `#002358` | Link saat kursor di atasnya. |
| `color.text.on-brand` | `color.brand.on-fill` | `#FFFFFF` | Teks di atas bg/brand. |
| `color.text.on-error` | `color.white` | `#FFFFFF` | Teks di atas bg/error. |
| `color.text.on-success` | `color.white` | `#FFFFFF` | Teks di atas bg/success. |
| `color.text.on-warning` | `color.neutral.100` | `#212121` | Teks di atas bg/warning. Gelap, karena teks putih tidak terbaca di atas kuning. |
| `color.text.on-info` | `color.white` | `#FFFFFF` | Teks di atas bg/info. |
| `color.text.error` | `color.red.80` | `#AC0000` | Pesan error, misalnya teks validasi di bawah input. |
| `color.text.success` | `color.green.80` | `#20741B` | Pesan sukses. |
| `color.text.warning` | `color.yellow.90` | `#8A6604` | Pesan peringatan. |
| `color.text.info` | `color.blue.70` | `#0C52A3` | Pesan informasi. |

## icon

| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |
|---|---|---|---|
| `color.icon.default` | `color.neutral.100` | `#212121` | Ikon utama, misalnya ikon menu dan ikon di tombol teks. |
| `color.icon.secondary` | `color.neutral.80` | `#616161` | Ikon pendukung, misalnya ikon cari atau kalender di dalam input. |
| `color.icon.disabled` | `color.neutral.60` | `#9E9E9E` | Ikon pada komponen yang tidak aktif. |
| `color.icon.inverse` | `color.white` | `#FFFFFF` | Ikon di atas latar gelap bg/inverse, misalnya di tooltip atau snackbar. |
| `color.icon.brand` | `color.brand.text` | `#002D71` | Ikon berwarna brand, misalnya ikon tab yang aktif. |
| `color.icon.on-brand` | `color.brand.on-fill` | `#FFFFFF` | Ikon di atas bg/brand, misalnya ikon panah di tombol Kirim. |
| `color.icon.error` | `color.red.70` | `#D70000` | Ikon error, misalnya tanda seru di pesan error. |
| `color.icon.success` | `color.green.70` | `#279122` | Ikon sukses, misalnya tanda centang. |
| `color.icon.warning` | `color.yellow.80` | `#B88806` | Ikon peringatan, misalnya segitiga bertanda seru. |
| `color.icon.info` | `color.blue.60` | `#0F63C3` | Ikon informasi, misalnya ikon huruf i di pesan info. |

## border

| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |
|---|---|---|---|
| `color.border.subtle` | `color.neutral.40` | `#E0E0E0` | Garis pemisah yang sangat halus, misalnya di antara item daftar. Dekoratif. |
| `color.border.default` | `color.neutral.50` | `#BDBDBD` | Garis kartu dan pembatas bagian. Dekoratif, jangan jadi satu-satunya penanda batas input. |
| `color.border.strong` | `color.neutral.80` | `#616161` | Garis input, checkbox, dan kontrol lain yang harus terlihat jelas. |
| `color.border.disabled` | `color.neutral.60` | `#9E9E9E` | Garis komponen yang tidak aktif. |
| `color.border.brand` | `color.brand.border` | `#002D71` | Garis elemen terpilih, misalnya kartu terpilih atau tombol outline Batal. |
| `color.border.focus` | `color.brand.border` | `#002D71` | Cincin fokus saat berpindah elemen dengan keyboard. |
| `color.border.error` | `color.red.70` | `#D70000` | Garis input yang error. |
| `color.border.success` | `color.green.70` | `#279122` | Garis input yang valid. |
| `color.border.warning` | `color.yellow.80` | `#B88806` | Garis input dengan peringatan. |
| `color.border.info` | `color.blue.60` | `#0F63C3` | Garis kotak informasi. |
