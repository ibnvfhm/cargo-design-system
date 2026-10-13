# Kontras warna Cargo

> Dibuat otomatis dari `packages/tokens/src` dan `packages/tokens/lib/pairs.mjs`. Jangan edit file ini langsung.

Setiap teks, ikon, dan garis dicek terhadap latar tempat ia biasa dipakai, untuk setiap brand dan mode. Teks butuh kontras minimal 4.5:1, ikon dan garis minimal 3:1 (WCAG 2.2 AA). Daftar 50 pasangannya ada di `lib/pairs.mjs`.

| Brand | Light | Dark |
|---|---|---|
| UIC | 50 dari 50 lolos | 43 dari 50 lolos |
| INTI | 50 dari 50 lolos | 42 dari 50 lolos |
| InMeterai | 44 dari 50 lolos | 47 dari 50 lolos |
| InCivas | 40 dari 50 lolos | 46 dari 50 lolos |
| InCustoms | 46 dari 50 lolos | 47 dari 50 lolos |

## Di bawah standar

Pasangan berikut sengaja dibiarkan di bawah standar atas keputusan designer, dan dicatat di `contrast-exceptions.json`. `npm test` gagal kalau ada pasangan lain yang turun di bawah standar, atau kalau pasangan yang dicatat ternyata sudah lolos.

### UIC, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.brand` | `color.bg.default` | 1.24:1 | 4.5:1 | disengaja |
| `color.text.brand` | `color.bg.brand-subtle` | 1.32:1 | 4.5:1 | disengaja |
| `color.text.link` | `color.bg.secondary` | 1.61:1 | 4.5:1 | disengaja |
| `color.text.link-hover` | `color.bg.default` | 1.84:1 | 4.5:1 | disengaja |
| `color.icon.brand` | `color.bg.default` | 1.24:1 | 3:1 | disengaja |
| `color.border.brand` | `color.bg.default` | 1.24:1 | 3:1 | disengaja |
| `color.border.focus` | `color.bg.default` | 1.24:1 | 3:1 | disengaja |

### INTI, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.brand` | `color.bg.default` | 2.12:1 | 4.5:1 | disengaja |
| `color.text.brand` | `color.bg.brand-subtle` | 2.35:1 | 4.5:1 | disengaja |
| `color.text.link` | `color.bg.secondary` | 2.77:1 | 4.5:1 | disengaja |
| `color.text.link-hover` | `color.bg.default` | 2.97:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 4.00:1 | 4.5:1 | disengaja |
| `color.icon.brand` | `color.bg.default` | 2.12:1 | 3:1 | disengaja |
| `color.border.brand` | `color.bg.default` | 2.12:1 | 3:1 | disengaja |
| `color.border.focus` | `color.bg.default` | 2.12:1 | 3:1 | disengaja |

### InMeterai, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.brand` | `color.bg.default` | 3.44:1 | 4.5:1 | disengaja |
| `color.text.brand` | `color.bg.brand-subtle` | 2.89:1 | 4.5:1 | disengaja |
| `color.text.link` | `color.bg.secondary` | 3.16:1 | 4.5:1 | disengaja |
| `color.text.link-hover` | `color.bg.default` | 4.44:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand` | 3.44:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 4.44:1 | 4.5:1 | disengaja |

### InMeterai, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.44:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 2.75:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 1.90:1 | 4.5:1 | disengaja |

### InCivas, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.brand` | `color.bg.default` | 2.41:1 | 4.5:1 | disengaja |
| `color.text.brand` | `color.bg.brand-subtle` | 2.21:1 | 4.5:1 | disengaja |
| `color.text.link` | `color.bg.secondary` | 2.21:1 | 4.5:1 | disengaja |
| `color.text.link-hover` | `color.bg.default` | 3.86:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand` | 2.41:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.86:1 | 4.5:1 | disengaja |
| `color.icon.brand` | `color.bg.default` | 2.41:1 | 3:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.41:1 | 3:1 | disengaja |
| `color.border.brand` | `color.bg.default` | 2.41:1 | 3:1 | disengaja |
| `color.border.focus` | `color.bg.default` | 2.41:1 | 3:1 | disengaja |

### InCivas, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.41:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 1.40:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 1.30:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.41:1 | 3:1 | disengaja |

### InCustoms, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.brand` | `color.bg.default` | 3.25:1 | 4.5:1 | disengaja |
| `color.text.brand` | `color.bg.brand-subtle` | 3.02:1 | 4.5:1 | disengaja |
| `color.text.link` | `color.bg.secondary` | 2.98:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand` | 3.25:1 | 4.5:1 | disengaja |

### InCustoms, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.25:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 2.46:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 1.73:1 | 4.5:1 | disengaja |
