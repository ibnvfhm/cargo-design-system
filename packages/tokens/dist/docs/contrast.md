# Kontras warna Cargo

> Dibuat otomatis dari `packages/tokens/src` dan `packages/tokens/lib/pairs.mjs`. Jangan edit file ini langsung.

Setiap teks, ikon, dan garis dicek terhadap latar tempat ia biasa dipakai, untuk setiap brand dan mode. Teks butuh kontras minimal 4.5:1, ikon dan garis minimal 3:1 (WCAG 2.2 AA). Daftar 55 pasangannya ada di `lib/pairs.mjs`.

| Brand | Light | Dark |
|---|---|---|
| UIC | 55 dari 55 lolos | 55 dari 55 lolos |
| INTI | 55 dari 55 lolos | 55 dari 55 lolos |
| InMeterai | 49 dari 55 lolos | 52 dari 55 lolos |
| InCivas | 45 dari 55 lolos | 51 dari 55 lolos |
| InCustoms | 51 dari 55 lolos | 52 dari 55 lolos |
| InAccount | 53 dari 55 lolos | 53 dari 55 lolos |
| InBot | 51 dari 55 lolos | 51 dari 55 lolos |
| InProject | 55 dari 55 lolos | 55 dari 55 lolos |
| InSend | 52 dari 55 lolos | 51 dari 55 lolos |
| InDocs | 51 dari 55 lolos | 51 dari 55 lolos |
| InRecap | 53 dari 55 lolos | 52 dari 55 lolos |
| InPos | 52 dari 55 lolos | 51 dari 55 lolos |
| InCoop | 54 dari 55 lolos | 53 dari 55 lolos |

## Di bawah standar

Pasangan berikut sengaja dibiarkan di bawah standar atas keputusan designer, dan dicatat di `contrast-exceptions.json`. `npm test` gagal kalau ada pasangan lain yang turun di bawah standar, atau kalau pasangan yang dicatat ternyata sudah lolos.

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

### InAccount, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.45:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 4.40:1 | 4.5:1 | disengaja |

### InAccount, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.45:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 4.40:1 | 4.5:1 | disengaja |

### InBot, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.22:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 2.77:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 3.87:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.22:1 | 3:1 | disengaja |

### InBot, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.22:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 2.77:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 3.87:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.22:1 | 3:1 | disengaja |

### InSend, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.86:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.71:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.86:1 | 3:1 | disengaja |

### InSend, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.86:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.71:1 | 4.5:1 | disengaja |
| `color.text.holiday` | `color.bg.brand-subtle` | 4.42:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.86:1 | 3:1 | disengaja |

### InDocs, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.63:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.23:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 4.45:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.63:1 | 3:1 | disengaja |

### InDocs, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.63:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.23:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-pressed` | 4.45:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.63:1 | 3:1 | disengaja |

### InRecap, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.02:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.91:1 | 4.5:1 | disengaja |

### InRecap, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 3.02:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.91:1 | 4.5:1 | disengaja |
| `color.text.holiday` | `color.bg.brand-subtle` | 4.50:1 | 4.5:1 | disengaja |

### InPos, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.83:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.68:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.83:1 | 3:1 | disengaja |

### InPos, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 2.83:1 | 4.5:1 | disengaja |
| `color.text.on-brand` | `color.bg.brand-hover` | 3.68:1 | 4.5:1 | disengaja |
| `color.text.holiday` | `color.bg.brand-subtle` | 4.44:1 | 4.5:1 | disengaja |
| `color.icon.on-brand` | `color.bg.brand` | 2.83:1 | 3:1 | disengaja |

### InCoop, Light

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 4.05:1 | 4.5:1 | disengaja |

### InCoop, Dark

| Warna | Latar | Kontras | Minimal | Catatan |
|---|---|---|---|---|
| `color.text.on-brand` | `color.bg.brand` | 4.05:1 | 4.5:1 | disengaja |
| `color.text.holiday` | `color.bg.brand-subtle` | 4.38:1 | 4.5:1 | disengaja |
