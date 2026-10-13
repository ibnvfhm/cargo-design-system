# Tipografi Cargo

> Dibuat otomatis dari `packages/tokens/src/typography`. Jangan edit file ini langsung.

Mode Desktop dan Mobile sama dengan collection Typography di Figma. Web memakai ukuran Mobile, lalu ukuran Desktop mulai lebar layar 768px. Aplikasi HP memakai ukuran Mobile.

## font-family

Jenis huruf. Scoping di Figma: Font family.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `font-family.ui` | `Inter` | Huruf untuk aplikasi: heading, title, body, small, dan extra-small. |
| `font-family.display` | `Montserrat` | Huruf untuk judul besar di website: display-1 sampai display-3. |

## font-weight

Tebal huruf. Scoping di Figma: Font weight.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `font-weight.regular` | `400` | Tebal huruf normal (400). |
| `font-weight.medium` | `500` | Tebal huruf sedang (500). |
| `font-weight.bold` | `700` | Tebal huruf tebal (700). |

## Peran

Setiap peran punya `font-size`, `line-height`, dan `letter-spacing`, misalnya `body.font-size`. Kolom berisi ukuran / tinggi baris / spasi huruf.

| Peran | Dipakai untuk | Desktop | Mobile |
|---|---|---|---|
| `heading-1` | Judul halaman. | 36px / 54px / -1px | 24px / 34px / -0.48px |
| `heading-2` | Judul bagian. | 24px / 34px / -0.48px | 18px / 24px / -0.18px |
| `heading-3` | Judul kartu atau sub-bagian. | 18px / 24px / -0.18px | 16px / 22px / -0.16px |
| `title` | Judul kecil dan label tombol besar. | 16px / 22px / -0.16px | 14px / 20px / -0.14px |
| `body` | Teks isi dan label tombol. | 14px / 20px / -0.14px | 12px / 16px / 0px |
| `small` | Teks pendukung: keterangan, teks bantuan, label kecil. | 12px / 16px / 0px | 10px / 14px / 0.1px |
| `extra-small` | Teks paling kecil: badge dan label checkbox kecil. | 10px / 14px / 0.1px | 8px / 11px / 0.16px |
| `display-1` | Judul hero di website. | 60px / 62px / -1.2px | 48px / 50px / -0.48px |
| `display-2` | Judul bagian besar di website. | 48px / 50px / 0px | 38px / 40px / -0.76px |
| `display-3` | Judul sub-bagian di website. | 38px / 40px / -0.38px | 28px / 30px / 0px |

## Text style

Sama dengan text style di Figma: setiap peran dalam setiap tebal, jadi 30 style. `display-1` sampai `display-3` memakai `font-family.display`, peran lain memakai `font-family.ui`. Di CSS, text style menjadi class, misalnya `body/medium` menjadi `.cargo-text-body-medium`.
