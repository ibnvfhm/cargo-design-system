import { CATEGORIES, components } from './components.mjs';

export const SITE = {
  name: 'Cargo Design System',
  tagline: 'Satu bahasa desain untuk semua produk Cargo.',
  description:
    'Cargo Design System adalah kumpulan token, komponen, dan panduan yang dipakai bersama oleh designer dan developer untuk membangun produk UIC, INTI, InMeterai, InCivas, dan InCustoms.',
  figma: 'https://www.figma.com/design/coH5y39eGFKMWPdU1EtY6f/Cargo-Design-System',
  repo: 'https://github.com/ibnvfhm/cargo-design-system',
};

// Every internal link goes through url(), so the site keeps working if it is later served from a sub-path.
export const url = (path) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

// Path without the base and with a trailing slash, for comparing against nav links.
export const normalize = (pathname) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  return path.endsWith('/') ? path : `${path}/`;
};

export const SECTIONS = [
  { id: 'beranda', label: 'Beranda', href: '/' },
  { id: 'foundations', label: 'Foundations', href: '/foundations/' },
  { id: 'komponen', label: 'Komponen', href: '/komponen/' },
];

export const sectionOf = (path) => {
  if (path.startsWith('/foundations/')) return 'foundations';
  if (path.startsWith('/komponen/')) return 'komponen';
  return 'beranda';
};

// Sidebar groups for each section. A group without a title is shown without a heading.
export const SIDEBAR = {
  beranda: [
    { items: [{ label: 'Selamat datang', href: '/' }] },
    {
      title: 'Cara memulai',
      items: [
        { label: 'Pengenalan', href: '/mulai/' },
        { label: 'Mulai mendesain', href: '/mulai/designer/' },
        { label: 'Mulai mengembangkan', href: '/mulai/developer/' },
      ],
    },
    {
      title: 'Pembaruan',
      items: [
        { label: 'Status', href: '/mulai/status/' },
        { label: 'Changelog', href: '/mulai/changelog/' },
      ],
    },
  ],
  foundations: [
    { items: [{ label: 'Ringkasan', href: '/foundations/' }] },
    {
      title: 'Warna',
      items: [
        { label: 'Token warna', href: '/foundations/warna/' },
        { label: 'Palet primitive', href: '/foundations/palet/' },
        { label: 'Tema brand', href: '/foundations/brand/' },
        { label: 'Kontras', href: '/foundations/kontras/' },
      ],
    },
    {
      title: 'Teks dan ruang',
      items: [
        { label: 'Tipografi', href: '/foundations/tipografi/' },
        { label: 'Spacing dan radius', href: '/foundations/ukuran/' },
      ],
    },
    {
      title: 'Efek dan aset',
      items: [
        { label: 'Shadow dan elevasi', href: '/foundations/shadow/' },
        { label: 'Ikonografi', href: '/foundations/ikon/' },
      ],
    },
  ],
  komponen: [
    { items: [{ label: 'Semua komponen', href: '/komponen/' }] },
    ...CATEGORIES.map((category) => ({
      title: category.name,
      items: components
        .filter((component) => component.category.id === category.id)
        .map((component) => ({ label: component.page, href: `/komponen/${component.slug}/` })),
    })),
  ],
};

export const formatDate = (date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);
