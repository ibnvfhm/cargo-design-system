# Shadow Cargo

> Dibuat otomatis dari `packages/tokens/src/shadow` dan `packages/tokens/src/semantic/focus-ring.json`. Jangan edit file ini langsung.

Sama dengan effect style di Figma. Setiap nilai ditulis sebagai offset X, offset Y, blur, dan spread.

## shadow

Bayangan untuk ketinggian elemen, sama dengan effect style shadow/… di Figma. Sama di mode Light dan Dark.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `shadow.sm` | 0px 1px 2px 0px · hitam 20% | Bayangan tipis untuk kartu. |
| `shadow.md` | 0px 2px 4px 0px · hitam 30% | Bayangan sedang untuk search bar, dropdown, dan popover. |
| `shadow.lg` | 0px 4px 8px 0px · hitam 30% | Bayangan tebal untuk modal dan bottom sheet. |
| `shadow.top` | 0px -1px 2px 0px · hitam 20% | Bayangan ke atas untuk bottom navigation dan tombol yang menempel di bawah layar. |
| `shadow.inner` | inset 1px 2px 2px 0px · hitam 12% | Bayangan dalam untuk elemen yang tampak tertekan. |

## focus-ring

Cincin fokus. Warnanya menunjuk ke token semantic, jadi ikut brand dan mode Light/Dark. Cincin dalam ditulis lebih dulu, karena di CSS bayangan pertama digambar paling atas.

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `focus-ring.default` | 0px 0px 0px 2px · `bg.default`, lalu 0px 0px 0px 4px · `border.focus` | Cincin fokus tombol dan input: 2px warna latar (bg/default), lalu 2px border/focus. Warnanya ikut brand dan mode. |
| `focus-ring.error` | 0px 0px 0px 2px · `bg.default`, lalu 0px 0px 0px 4px · `border.error` | Cincin fokus tombol danger: 2px warna latar (bg/default), lalu 2px border/error. Warnanya ikut brand dan mode. |
