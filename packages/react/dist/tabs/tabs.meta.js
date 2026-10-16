const notYet = 'Belum ada di kode.';
export const tabsMeta = {
    name: 'Tabs',
    client: true,
    props: [
        { name: 'variant', type: "'default' | 'no-underline'", default: "'default'", figma: 'Type', description: 'Default dengan garis bawah; No Underline tanpa garis, misalnya di dalam kartu. Berlaku untuk semua tab.' },
        { name: 'value', type: 'string', figma: 'State=Active', description: 'Tab yang terbuka, kalau aplikasi yang menyimpannya.' },
        { name: 'defaultValue', type: 'string', description: 'Tab yang terbuka di awal, kalau Tabs menyimpannya sendiri. Isi salah satu: value atau defaultValue.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Dipanggil dengan value tab yang baru dibuka.' },
    ],
    attributes: 'Atribut HTML lain diteruskan ke <div> terluar, begitu juga ref. TabList, Tab, dan TabPanel meneruskan atributnya ke elemennya masing-masing.',
    axes: {},
    properties: {},
    accessibility: [
        'Mengikuti pola Tabs WAI-ARIA: TabList berperan tablist, setiap Tab berperan tab, dan TabPanel berperan tabpanel yang dinamai tab-nya.',
        'Hanya tab yang terbuka yang masuk urutan Tab. Panah kiri dan kanan berpindah sekaligus membuka tab, Home dan End ke tab pertama dan terakhir.',
        'Beri TabList aria-label kalau tidak ada judul di dekatnya, misalnya aria-label="Profil".',
    ],
};
export const tabListMeta = {
    name: 'TabList',
    client: true,
    props: [{ name: 'children', type: 'ReactNode', description: 'Tab-tab dalam satu baris. Baris bisa digeser ke samping kalau tidak muat.' }],
    attributes: 'Atribut HTML lain, seperti aria-label, diteruskan ke <div role="tablist">, begitu juga ref.',
    axes: {},
    properties: {},
    accessibility: ['Menangani panah kiri, panah kanan, Home, dan End untuk berpindah tab.'],
};
export const tabMeta = {
    name: 'Tab',
    figmaSet: 'Tabs',
    figmaNode: '133:1370',
    client: true,
    props: [
        { name: 'value', type: 'string', description: 'Menghubungkan tab dengan TabPanel yang value-nya sama. Wajib diisi.' },
        { name: 'children', type: 'ReactNode', figma: 'Label Text, Label', description: 'Nama tab.' },
        { name: 'icon', type: 'ReactNode', figma: 'Icon', description: 'Ikon di kiri nama, Type=Regular. Ukurannya otomatis 22px.' },
        { name: 'activeIcon', type: 'ReactNode', figma: 'Icon (State=Active)', description: 'Ikon saat tab terbuka, Type=Fill. Tanpa activeIcon, icon yang dipakai.' },
        { name: 'number', type: 'ReactNode', figma: 'Number', description: 'Angka di Badge Counter setelah nama, misalnya jumlah dokumen.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Tab tidak bisa dibuka dan dilewati panah keyboard.' },
    ],
    attributes: 'Atribut lain diteruskan ke <button role="tab">, begitu juga ref.',
    axes: {
        State: { figmaOnly: 'Active adalah tab yang value-nya sama dengan value atau defaultValue di Tabs.' },
        Type: { prop: '<Tabs variant>', values: { Default: 'default', 'No Underline': 'no-underline' }, note: 'Diatur sekali di Tabs untuk semua tab.' },
    },
    properties: {
        'Label Text': { prop: 'children' },
        Label: { prop: 'children', note: 'Nama tampil kalau children diisi.' },
        Icon: { prop: 'icon, activeIcon', note: 'Ikon tampil kalau icon diisi.' },
        Number: { prop: 'number', note: 'Badge tampil kalau number diisi.' },
    },
    helperSets: {
        '.Tab': {
            figmaNode: '1009:382',
            axes: {},
            properties: {
                Label: { prop: 'children' },
                'Left Icon': { prop: 'icon' },
                'Change Left Icon': { prop: 'icon' },
                'Right Icon': { figmaOnly: notYet },
                'Change Right Icon': { figmaOnly: notYet },
                Notification: { figmaOnly: 'Badge Label belum ada di Tab; untuk angka, pakai number.' },
                'Close Icon': { figmaOnly: 'Tab yang bisa ditutup belum ada di kode.' },
                'Change Close Icon': { figmaOnly: notYet },
            },
        },
    },
    accessibility: ['Nama tab adalah teksnya, ditambah angka badge kalau ada, misalnya "Dokumen 3".', 'Ikon disembunyikan dari screen reader.'],
};
export const tabPanelMeta = {
    name: 'TabPanel',
    client: true,
    props: [
        { name: 'value', type: 'string', description: 'Value tab yang membuka panel ini. Wajib diisi.' },
        { name: 'children', type: 'ReactNode', description: 'Isi panel. Panel tersembunyi selama tab-nya tertutup.' },
    ],
    attributes: 'Atribut HTML lain diteruskan ke <div role="tabpanel">, begitu juga ref.',
    axes: {},
    properties: {},
    accessibility: ['Panel bisa difokus dengan Tab, supaya isinya terjangkau keyboard meski tidak berisi tombol atau tautan.'],
};
