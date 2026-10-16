export const toggleMeta = {
    name: 'Toggle',
    figmaSet: 'Toggle',
    figmaNode: '133:3886',
    client: false,
    props: [
        { name: 'children', type: 'ReactNode', figma: 'Placeholder Text, Placeholder', description: 'Teks di samping saklar, sekaligus nama saklar.' },
        { name: 'label', type: 'ReactNode', figma: 'Label Text, Label', description: 'Judul di atas saklar. Dibaca bersama teks di sampingnya.' },
        { name: 'checked', type: 'boolean', figma: 'State=Active', description: 'Saklar menyala, kalau aplikasi yang menyimpan statusnya. Kalau tidak, pakai defaultChecked.' },
        { name: 'description', type: 'ReactNode', figma: 'Description Text, Description', description: 'Keterangan di bawah saklar.' },
        { name: 'error', type: 'ReactNode', figma: 'Error Text, Error', description: 'Pesan error di bawah saklar; saklar ditandai aria-invalid.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Saklar tidak aktif. Figma belum punya state ini; warnanya mengikuti Checkbox.' },
    ],
    attributes: 'Atribut lain, seperti name, defaultChecked, dan onChange, diteruskan ke <input type="checkbox" role="switch">, begitu juga ref. style dipasang di elemen terluar.',
    axes: {
        State: { prop: 'checked', values: { Inactive: 'false', Active: 'true' }, note: 'Atau defaultChecked kalau Toggle menyimpan statusnya sendiri.' },
    },
    properties: {
        'Placeholder Text': { prop: 'children' },
        Placeholder: { prop: 'children', note: 'Teks tampil kalau children diisi.' },
        'Label Text': { prop: 'label' },
        Label: { prop: 'label', note: 'Judul tampil kalau label diisi.' },
        'Description Text': { prop: 'description' },
        Description: { prop: 'description', note: 'Tampil kalau description diisi.' },
        'Error Text': { prop: 'error' },
        Error: { prop: 'error', note: 'Tampil kalau error diisi.' },
    },
    accessibility: [
        'Memakai <input type="checkbox" role="switch">: Tab untuk fokus, Spasi untuk menyalakan atau mematikan. Screen reader membacanya sebagai saklar, nyala atau mati.',
        'Saklar tanpa teks dan tanpa label wajib punya aria-label; TypeScript menolaknya kalau tidak ada.',
        'Pakai Toggle hanya untuk pengaturan yang langsung berlaku. Untuk pilihan yang baru berlaku setelah tombol Simpan, pakai Checkbox.',
    ],
};
