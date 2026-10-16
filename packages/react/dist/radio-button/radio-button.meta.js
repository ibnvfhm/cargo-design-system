export const radioGroupMeta = {
    name: 'RadioGroup',
    client: true,
    props: [
        { name: 'label', type: 'ReactNode', figma: 'Label Text, Label', description: 'Judul kelompok, sekaligus nama kelompok untuk screen reader. Wajib diisi.' },
        { name: 'value', type: 'string', figma: 'State=Selected', description: 'Nilai pilihan yang terpilih, kalau aplikasi yang menyimpannya.' },
        { name: 'defaultValue', type: 'string', description: 'Nilai yang terpilih di awal, kalau RadioGroup menyimpan pilihannya sendiri.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Dipanggil dengan nilai pilihan yang baru dipilih.' },
        { name: 'name', type: 'string', description: 'Atribut name setiap radio, untuk form. Dibuat otomatis kalau kosong.' },
        { name: 'required', type: 'boolean', default: 'false', figma: 'Required', description: 'Menampilkan penanda wajib, dan browser meminta satu pilihan saat form dikirim.' },
        { name: 'requiredIndicator', type: "'text' | 'symbol'", default: "'symbol'", description: 'Bentuk penanda wajib. Radio Button di Figma memakai "*".' },
        { name: 'description', type: 'ReactNode', figma: 'Description Text', description: 'Keterangan untuk seluruh kelompok.' },
        { name: 'error', type: 'ReactNode', figma: 'Error Text, Error', description: 'Pesan error untuk seluruh kelompok; kelompok ditandai aria-invalid.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Atribut fieldset: semua pilihan tidak aktif.' },
    ],
    attributes: 'Atribut HTML lain diteruskan ke <fieldset role="radiogroup">, begitu juga ref.',
    axes: {},
    properties: {},
    accessibility: [
        'Kelompok berupa <fieldset role="radiogroup"> yang dinamai judulnya. Panah atas, bawah, kiri, dan kanan memindahkan pilihan, seperti radio biasa.',
        'Tab masuk ke pilihan yang terpilih, atau ke pilihan pertama kalau belum ada.',
        'Penanda wajib disembunyikan dari screen reader; yang dibaca adalah aria-required.',
    ],
};
export const radioButtonMeta = {
    name: 'RadioButton',
    figmaSet: 'Radio Button',
    figmaNode: '133:1176',
    client: true,
    props: [
        { name: 'value', type: 'string', description: 'Nilai yang dilaporkan RadioGroup saat pilihan ini dipilih. Wajib diisi.' },
        { name: 'children', type: 'ReactNode', figma: 'Placeholder Text, Placeholder', description: 'Teks di samping lingkaran, sekaligus nama pilihan.' },
        { name: 'description', type: 'ReactNode', figma: 'Description Text, Description', description: 'Keterangan untuk satu pilihan ini.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Pilihan ini tidak aktif. Figma belum punya state ini; warnanya mengikuti Checkbox.' },
    ],
    attributes: 'Atribut lain diteruskan ke <input type="radio">, begitu juga ref. style dipasang di elemen terluar.',
    axes: {
        State: {
            figmaOnly: 'Hover dan Focussed muncul otomatis. Selected adalah pilihan yang value-nya sama dengan value RadioGroup.',
        },
    },
    properties: {
        'Placeholder Text': { prop: 'children' },
        Placeholder: { prop: 'children', note: 'Teks tampil kalau children diisi.' },
        'Description Text': { prop: 'description' },
        Description: { prop: 'description', note: 'Keterangan satu pilihan. Untuk seluruh kelompok, pakai description di RadioGroup.' },
        'Error Text': { prop: '<RadioGroup error>' },
        Error: { prop: '<RadioGroup error>', note: 'Pesan error berlaku untuk seluruh kelompok.' },
        'Label Text': { prop: '<RadioGroup label>' },
        Label: { prop: '<RadioGroup label>', note: 'Judul kelompok ada di RadioGroup.' },
        Required: { prop: '<RadioGroup required>' },
    },
    accessibility: [
        'Memakai <input type="radio"> asli dengan name yang sama untuk satu kelompok, sehingga hanya satu yang bisa terpilih.',
        'Teks di sampingnya adalah nama pilihan, dan mengekliknya juga memilih.',
    ],
};
