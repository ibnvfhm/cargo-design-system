// Figma has a swap property per Device, Size and side; code has one prop per side, sized automatically.
const swaps = Object.fromEntries(['Desktop', 'Mobile'].flatMap((device) => ['Lg', 'Md', 'Sm'].flatMap((size) => [
    [`${device} ${size} Swap Left Icon`, { prop: 'leftIcon' }],
    [`${device} ${size} Swap Right Icon`, { prop: 'rightIcon' }],
])));
export const buttonMeta = {
    name: 'Button',
    figmaSet: 'Button',
    figmaNode: '1249:2271',
    client: false,
    props: [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'tertiary' | 'outlined' | 'borderless' | 'danger' | 'danger-outlined' | 'danger-borderless'",
            default: "'primary'",
            figma: 'Type',
            description: 'Jenis tombol sesuai pentingnya aksi. Namanya bukan type karena type sudah dipakai HTML.',
        },
        { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'lg'", figma: 'Size', description: 'Ukuran. Tingginya ikut Device: Desktop 54, 44, 32 px; Mobile 44, 32, 26 px.' },
        {
            name: 'device',
            type: "'desktop' | 'mobile'",
            figma: 'Device',
            description: 'Memaksa ukuran Desktop atau Mobile. Tanpa prop ini, ukuran mengikuti data-device pada elemen di atasnya, atau lebar layar: Mobile di bawah 768px, Desktop mulai 768px.',
        },
        { name: 'children', type: 'ReactNode', figma: 'Text, Show Text', description: 'Teks tombol. Tanpa teks, tombol hanya berisi ikon dan wajib punya aria-label.' },
        { name: 'leftIcon', type: 'ReactNode', figma: 'Left Icon, Swap Left Icon', description: 'Ikon di kiri teks. Ukuran dan warnanya otomatis mengikuti Size, Device, dan variant.' },
        { name: 'rightIcon', type: 'ReactNode', figma: 'Right Icon, Swap Right Icon', description: 'Ikon di kanan teks.' },
        { name: 'disabled', type: 'boolean', default: 'false', figma: 'State=Disabled', description: 'Tombol tidak aktif: tidak bisa diklik dan tidak bisa difokus.' },
        {
            name: 'type',
            type: "'button' | 'submit' | 'reset'",
            default: "'button'",
            description: 'Atribut HTML. Bawaannya button supaya tidak mengirim form tanpa sengaja; pakai submit untuk tombol kirim form.',
        },
    ],
    attributes: 'Atribut HTML lain, seperti onClick, form, dan aria-describedby, diteruskan ke <button>, begitu juga ref.',
    axes: {
        Device: {
            prop: 'device',
            values: { Desktop: 'desktop', Mobile: 'mobile' },
            note: 'Tanpa device, ukuran mengikuti lebar layar: Mobile di bawah 768px, Desktop mulai 768px.',
        },
        Type: {
            prop: 'variant',
            values: {
                Primary: 'primary',
                Secondary: 'secondary',
                Tertiary: 'tertiary',
                Outlined: 'outlined',
                Borderless: 'borderless',
                Danger: 'danger',
                'Danger Outlined': 'danger-outlined',
                'Danger Borderless': 'danger-borderless',
            },
        },
        Size: { prop: 'size', values: { lg: 'lg', md: 'md', sm: 'sm' } },
        State: {
            figmaOnly: 'Muncul otomatis: Hover saat kursor di atas tombol, Pressed saat ditekan, Focussed saat berpindah dengan keyboard. Disabled menjadi prop disabled.',
        },
    },
    properties: {
        Text: { prop: 'children' },
        'Left Icon': { prop: 'leftIcon', note: 'Ikon tampil kalau leftIcon diisi.' },
        'Right Icon': { prop: 'rightIcon', note: 'Ikon tampil kalau rightIcon diisi.' },
        'Show Text': { prop: 'children', note: 'Tanpa children, tombol hanya berisi ikon. Beri aria-label, misalnya aria-label="Hapus".' },
        ...swaps,
    },
    accessibility: [
        'Memakai elemen <button> asli: bisa difokus dengan Tab dan ditekan dengan Enter atau Spasi.',
        'Tombol ikon saja wajib punya aria-label, misalnya aria-label="Hapus". TypeScript menolak tombol ikon tanpa aria-label atau aria-labelledby.',
        'Ikon disembunyikan dari screen reader; yang dibaca adalah teks tombol.',
        'Cincin fokus hanya muncul saat berpindah dengan keyboard, seperti state Focussed di Figma. Varian Danger memakai cincin merah.',
        'Tombol disabled tidak bisa difokus, jadi alasannya tidak terbaca. Kalau pengguna perlu tahu kenapa tombol tidak aktif, tulis alasannya di dekat tombol.',
    ],
};
