export const chipMeta = {
    name: 'Chip',
    figmaSet: 'Chip',
    figmaNode: '2077:113',
    client: true,
    props: [
        { name: 'variant', type: "'filter' | 'input'", default: "'filter'", figma: 'Type', description: 'Filter bisa dinyalakan dan dimatikan; Input menampilkan nilai terpilih dengan tombol hapus.' },
        { name: 'size', type: "'md' | 'sm'", default: "'md'", figma: 'Size', description: 'Tinggi 28px (md) atau 24px (sm).' },
        { name: 'children', type: 'ReactNode', figma: 'Label', description: 'Teks chip.' },
        { name: 'icon', type: 'ReactNode', figma: 'Icon, Change Icon', description: 'Ikon di kiri teks. Ukurannya otomatis 16px.' },
        { name: 'selected', type: 'boolean', figma: 'State=Selected', description: 'Khusus Filter: filter menyala, kalau aplikasi yang menyimpan statusnya. Kalau tidak, pakai defaultSelected.' },
        { name: 'defaultSelected', type: 'boolean', default: 'false', description: 'Khusus Filter: status awal kalau Chip menyimpan statusnya sendiri.' },
        { name: 'onSelectedChange', type: '(selected: boolean) => void', description: 'Khusus Filter: dipanggil dengan status baru saat chip diklik.' },
        { name: 'onRemove', type: '() => void', description: 'Khusus Input: dipanggil saat tombol hapus (X) ditekan.' },
        { name: 'removeLabel', type: 'string', description: 'Khusus Input: nama tombol hapus untuk screen reader. Bawaannya "Hapus" diikuti teks chip.' },
        { name: 'disabled', type: 'boolean', default: 'false', figma: 'State=Disabled', description: 'Chip tidak aktif.' },
    ],
    attributes: 'Atribut HTML lain diteruskan ke <button> (Filter) atau <span> terluar (Input), begitu juga ref.',
    axes: {
        Type: { prop: 'variant', values: { Filter: 'filter', Input: 'input' } },
        State: { figmaOnly: 'Hover muncul otomatis. Selected menjadi selected (Filter) dan Disabled menjadi disabled.' },
        Size: { prop: 'size', values: { md: 'md', sm: 'sm' } },
    },
    properties: {
        Label: { prop: 'children' },
        Icon: { prop: 'icon', note: 'Ikon tampil kalau icon diisi.' },
        'Change Icon': { prop: 'icon' },
    },
    accessibility: [
        'Chip Filter adalah tombol yang bisa dinyalakan (aria-pressed): Tab untuk fokus, Enter atau Spasi untuk mengganti status.',
        'Pada chip Input, hanya tombol hapus yang bisa difokus. Namanya "Hapus" diikuti teks chip, misalnya "Hapus Jakarta".',
        'Jangan memakai Chip sebagai tombol aksi; pakai Button.',
    ],
};
