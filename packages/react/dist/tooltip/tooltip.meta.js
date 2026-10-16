export const tooltipMeta = {
    name: 'Tooltip',
    figmaSet: 'Tooltips',
    figmaNode: '200:1825',
    client: true,
    props: [
        { name: 'description', type: 'ReactNode', figma: 'Description', description: 'Isi tooltip. Dibaca screen reader sebagai keterangan pemicunya. Wajib diisi.' },
        { name: 'title', type: 'ReactNode', figma: 'Title Text, Title', description: 'Judul di atas isi.' },
        {
            name: 'side',
            type: "'top' | 'bottom' | 'left' | 'right'",
            default: "'bottom'",
            figma: 'Side',
            description: 'Sisi tooltip tempat panah berada, sama seperti di Figma: bottom berarti tooltip di atas pemicunya. Pindah ke sisi lain kalau tidak muat.',
        },
        {
            name: 'arrow',
            type: "'left' | 'center' | 'right' | 'top' | 'bottom'",
            default: "'center'",
            figma: 'Arrow',
            description: 'Posisi panah di sepanjang sisi itu. side top dan bottom memakai left, center, atau right; left dan right memakai top, center, atau bottom.',
        },
        { name: 'children', type: 'ReactElement', description: 'Elemen yang dijelaskan, misalnya Button. Wajib satu elemen yang bisa difokus.' },
        { name: 'open', type: 'boolean', description: 'Membuka tooltip dari aplikasi. Tanpa open, tooltip terbuka saat hover dan fokus keyboard.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Dipanggil saat tooltip mau dibuka atau ditutup.' },
        { name: 'delay', type: 'number', default: '300', description: 'Jeda dalam milidetik sebelum tooltip muncul saat hover.' },
    ],
    attributes: 'Tooltip tidak menambah elemen pembungkus: atribut dan ref tetap di elemen pemicunya. className dipasang di tooltip.',
    axes: {
        Side: { prop: 'side', values: { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' }, note: 'Bawaan Figma Side=Top (tooltip di bawah pemicu); bawaan kode bottom, tooltip di atas.' },
        Arrow: { prop: 'arrow', values: { Left: 'left', Center: 'center', Right: 'right', Top: 'top', Bottom: 'bottom' }, note: 'Bawaan Figma Left; bawaan kode center.' },
    },
    properties: {
        Description: { prop: 'description' },
        'Title Text': { prop: 'title' },
        Title: { prop: 'title', note: 'Judul tampil kalau title diisi.' },
    },
    accessibility: [
        'Muncul saat kursor berada di atas pemicu (setelah 300 ms) dan saat pemicu difokus dengan keyboard; hilang saat Escape, saat fokus pindah, atau saat kursor pergi.',
        'Kursor bisa berpindah ke atas tooltip tanpa membuatnya hilang, sesuai WCAG 1.4.13.',
        'Isinya dibaca sebagai keterangan pemicu (aria-describedby). Jangan taruh informasi penting atau tombol di dalam tooltip.',
        'Tombol disabled tidak menerima kursor dan fokus. Kalau tooltip perlu menjelaskan tombol disabled, bungkus tombolnya dengan <span tabIndex={0}>.',
    ],
};
