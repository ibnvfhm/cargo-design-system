import data from '../data/components.json';
import shotData from '../data/variant-shots.json';

export const FIGMA_FILE_KEY = 'coH5y39eGFKMWPdU1EtY6f';
export const figmaUrl = (nodeId) =>
  `https://www.figma.com/design/${FIGMA_FILE_KEY}/Cargo-Design-System?node-id=${nodeId.replace(':', '-')}`;

export const EXPORTED = data.exported;

// One entry per Figma page, grouped the way people look for them.
export const CATEGORIES = [
  {
    id: 'aksi',
    name: 'Aksi',
    description: 'Tombol dan kumpulan tombol untuk menjalankan aksi.',
    pages: ['Button', 'Button Group', 'Bulk Action Bar'],
  },
  {
    id: 'input',
    name: 'Input dan form',
    description: 'Kolom isian dan kontrol untuk memasukkan atau memilih data.',
    pages: ['Text Fields', 'Text Area', 'Search Bar', 'Select & Dropdown', 'Checkbox & Radio Button', 'Toggle', 'Chips', 'Date Picker', 'File Upload'],
  },
  {
    id: 'navigasi',
    name: 'Navigasi',
    description: 'Cara pengguna berpindah halaman, bagian, dan langkah.',
    pages: ['Top Bar', 'Side Menu', 'Navigation Bottom', 'Tabs', 'Breadcrumb', 'Pagination', 'Stepper'],
  },
  {
    id: 'data',
    name: 'Tampilan data',
    description: 'Menyusun dan menandai informasi supaya mudah dibaca.',
    pages: ['Data Table', 'List Data', 'Cards', 'Accordion', 'Avatar', 'Badge', 'Featured Icon'],
  },
  {
    id: 'umpan-balik',
    name: 'Umpan balik dan overlay',
    description: 'Pesan, status, dan panel yang muncul di atas halaman.',
    pages: ['Banner Info & Notif', 'Section Message', 'Tooltip', 'Modals', 'Bottom Sheet', 'Loading', 'Empty State'],
  },
];

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Sets whose name starts with a dot (".Tab", "Bottom Sheet/.Slot") are building blocks: Figma does not publish them.
const isHelper = (name) => name.split('/').some((part) => part.trim().startsWith('.'));

// The first paragraph of a description is its one-line summary.
export const summaryOf = (md = '') => md.split(/\n\s*\n/)[0].replace(/\*\*/g, '').trim();

// Previews are exported from Figma at 2x and shown at half their pixel size.
export const PREVIEW_SCALE = 2;
const previews = import.meta.glob('../assets/komponen/*.{png,webp}', { eager: true, import: 'default' });
const previewOf = (file) => Object.entries(previews).find(([path]) => path.endsWith(`/${file}`))?.[1];

// One image per Size or State value, listed in src/data/variant-shots.json and exported like the previews.
const variantImages = new Map(
  Object.entries(import.meta.glob('../assets/komponen/varian/*.webp', { eager: true, import: 'default' })).map(([path, image]) => [
    path.split('/').pop().replace(/\.webp$/, ''),
    image,
  ]),
);
const variantImage = (name) => {
  const image = variantImages.get(name);
  if (!image) throw new Error(`Gambar varian ${name}.webp tidak ada di src/assets/komponen/varian`);
  return image;
};
const shotsOf = (pageName, setName) =>
  shotData.rows
    .filter((row) => row.page === pageName && row.set === setName)
    .map((row) => ({
      axis: row.axis,
      fixed: row.fixed,
      default: row.default,
      items: row.values.map((value) => ({
        value,
        light: variantImage(`${row.file}--${slugify(value)}--light`),
        dark: variantImage(`${row.file}--${slugify(value)}--dark`),
      })),
    }));

export const components = CATEGORIES.flatMap((category) =>
  category.pages.map((pageName) => {
    const page = data.pages.find((p) => p.page === pageName);
    if (!page) throw new Error(`Halaman Figma "${pageName}" tidak ada di components.json`);
    const slug = slugify(page.page);
    const sets = page.sets.map((set) => {
      const setSlug = slugify(set.name);
      return {
        ...set,
        slug: setSlug,
        helper: isHelper(set.name),
        summary: summaryOf(set.md),
        preview: {
          light: previewOf(`${slug}--${setSlug}--light.webp`) ?? previewOf(`${slug}--${setSlug}--light.png`),
          dark: previewOf(`${slug}--${setSlug}--dark.webp`) ?? previewOf(`${slug}--${setSlug}--dark.png`),
        },
        shots: shotsOf(page.page, set.name),
      };
    });
    const main = sets.find((set) => !set.helper) ?? sets[0];
    return {
      ...page,
      slug,
      category,
      sets,
      main,
      summary: main.summary,
      variants: sets.reduce((total, set) => total + set.variants, 0),
    };
  }),
);

// Fail the build when a Figma page is missing from the categories, so a re-export never drops a page silently.
const uncategorised = data.pages.filter((page) => !components.some((component) => component.pageId === page.pageId));
if (uncategorised.length) {
  throw new Error(`Halaman tanpa kategori di src/lib/components.mjs: ${uncategorised.map((page) => page.page).join(', ')}`);
}

// Likewise when a renamed page or set leaves rows in variant-shots.json with nowhere to show.
const strayShots = shotData.rows.filter((row) => !data.pages.some((page) => page.page === row.page && page.sets.some((set) => set.name === row.set)));
if (strayShots.length) {
  throw new Error(`Baris variant-shots.json tanpa component set: ${strayShots.map((row) => `${row.page} / ${row.set}`).join(', ')}`);
}

// Every component page has these tabs, each at its own address under /komponen/<slug>/.
export const COMPONENT_TABS = [
  { id: 'penggunaan', label: 'Penggunaan', path: '' },
  { id: 'properti-desain', label: 'Properti desain', path: 'properti-desain/' },
];

export const PROPERTY_TYPES = {
  VARIANT: 'Varian',
  TEXT: 'Teks',
  BOOLEAN: 'Tampil/sembunyi',
  INSTANCE_SWAP: 'Tukar komponen',
};
