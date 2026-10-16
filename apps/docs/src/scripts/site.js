// Site behaviour: brand and mode switches, the mobile menu, search, copy buttons and the page outline.
const root = document.documentElement;

const store = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Private mode or blocked storage: the choice simply is not remembered.
    }
  },
};

// Pages that show computed colours listen for this to refresh.
const announce = () => document.dispatchEvent(new CustomEvent('cargo:theme'));

/* Brand */

const brandSelects = document.querySelectorAll('[data-brand-select]');

function setBrand(brand) {
  root.dataset.brand = brand;
  brandSelects.forEach((select) => {
    select.value = brand;
  });
  document.querySelectorAll('[data-set-brand]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setBrand === brand));
  });
  store.set('cargo-docs-brand', brand);
  announce();
}

brandSelects.forEach((select) => {
  select.value = root.dataset.brand;
  select.addEventListener('change', () => setBrand(select.value));
});
document.querySelectorAll('[data-set-brand]').forEach((button) => {
  button.setAttribute('aria-pressed', String(button.dataset.setBrand === root.dataset.brand));
  button.addEventListener('click', () => setBrand(button.dataset.setBrand));
});

/* Light and Dark */

const themeButtons = document.querySelectorAll('[data-theme-toggle]');

function labelThemeButtons() {
  const label = root.dataset.theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap';
  themeButtons.forEach((button) => button.setAttribute('aria-label', label));
}

function setTheme(theme) {
  root.dataset.theme = theme;
  store.set('cargo-docs-theme', theme);
  labelThemeButtons();
  document.querySelectorAll('[data-set-theme]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setTheme === theme));
  });
  announce();
}

labelThemeButtons();
themeButtons.forEach((button) => button.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
document.querySelectorAll('[data-set-theme]').forEach((button) => {
  button.setAttribute('aria-pressed', String(button.dataset.setTheme === root.dataset.theme));
  button.addEventListener('click', () => setTheme(button.dataset.setTheme));
});

/* Sidebar drawer, below 1024px */

const sidebar = document.querySelector('[data-sidebar]');
const backdrop = document.querySelector('[data-sidebar-backdrop]');
const menuButton = document.querySelector('[data-sidebar-toggle]');

function setDrawer(open) {
  if (!sidebar) return;
  sidebar.toggleAttribute('data-open', open);
  backdrop.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) sidebar.querySelector('a')?.focus();
}

menuButton?.addEventListener('click', () => setDrawer(!sidebar.hasAttribute('data-open')));
backdrop?.addEventListener('click', () => setDrawer(false));
matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
  if (event.matches) setDrawer(false);
});

// Keep the current page visible in a long sidebar (desktop only; the phone menu opens at the top, with the brand picker).
const currentLink = sidebar?.querySelector('[aria-current="page"]');
if (currentLink && matchMedia('(min-width: 1024px)').matches && sidebar.scrollHeight > sidebar.clientHeight) {
  sidebar.scrollTop = currentLink.offsetTop - sidebar.clientHeight / 2;
}

/* Search */

const search = document.querySelector('[data-search]');
const topbar = document.querySelector('[data-topbar]');
const searchInput = search?.querySelector('[data-search-input]');
const searchResults = search?.querySelector('[data-search-results]');
let searchIndex = null;
let matches = [];
let activeMatch = -1;

const fold = (text) => text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

async function loadIndex() {
  if (!searchIndex) {
    const response = await fetch(search.dataset.index);
    searchIndex = (await response.json()).map((entry) => ({
      ...entry,
      title: fold(entry.t),
      lead: fold(entry.k ?? ''),
      text: fold(`${entry.t} ${entry.k ?? ''}`),
    }));
  }
  return searchIndex;
}

function score(entry, terms) {
  let total = 0;
  for (const term of terms) {
    if (entry.title.startsWith(term)) total += 4;
    else if (entry.title.includes(term)) total += 3;
    else if (entry.lead.startsWith(term)) total += 2;
    else if (entry.text.includes(term)) total += 1;
    else return 0;
  }
  return total;
}

function renderResults() {
  searchResults.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'search-empty';
    empty.textContent = 'Tidak ada hasil. Coba kata lain, misalnya "tombol" atau "warna".';
    searchResults.append(empty);
  }
  matches.forEach((entry, index) => {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = entry.u;
    link.id = `search-result-${index}`;
    link.setAttribute('role', 'option');
    link.setAttribute('aria-selected', String(index === activeMatch));
    const body = document.createElement('span');
    const title = document.createElement('span');
    title.className = 'search-result-title';
    title.textContent = entry.t;
    const meta = document.createElement('span');
    meta.className = 'search-result-meta';
    meta.textContent = entry.s;
    body.append(title, meta);
    link.append(body);
    searchResults.append(link);
  });
  searchInput.setAttribute('aria-activedescendant', activeMatch >= 0 ? `search-result-${activeMatch}` : '');
}

function closeResults() {
  searchResults.hidden = true;
  searchInput.setAttribute('aria-expanded', 'false');
  activeMatch = -1;
}

async function runSearch() {
  const terms = fold(searchInput.value).split(/\s+/).filter(Boolean);
  if (!terms.length) return closeResults();
  const index = await loadIndex();
  matches = index
    .map((entry) => ({ entry, score: score(entry, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.entry.w - a.entry.w || a.entry.t.length - b.entry.t.length)
    .slice(0, 10)
    .map((item) => item.entry);
  activeMatch = matches.length ? 0 : -1;
  renderResults();
  searchResults.hidden = false;
  searchInput.setAttribute('aria-expanded', 'true');
}

function openMobileSearch() {
  topbar.setAttribute('data-search-open', '');
  searchInput.focus();
}

function closeMobileSearch() {
  topbar.removeAttribute('data-search-open');
  closeResults();
}

if (search) {
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('focus', () => {
    loadIndex();
    if (searchInput.value) runSearch();
  });
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!matches.length) return;
      event.preventDefault();
      activeMatch = (activeMatch + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length;
      renderResults();
      document.getElementById(`search-result-${activeMatch}`)?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && matches[activeMatch]) {
      event.preventDefault();
      window.location.href = matches[activeMatch].u;
    } else if (event.key === 'Escape') {
      closeResults();
      closeMobileSearch();
      searchInput.blur();
    }
  });
  document.querySelector('[data-search-open]')?.addEventListener('click', openMobileSearch);
  search.querySelector('[data-search-close]')?.addEventListener('click', closeMobileSearch);
  document.addEventListener('click', (event) => {
    if (!search.contains(event.target) && !event.target.closest('[data-search-open]')) closeResults();
  });
}

document.addEventListener('keydown', (event) => {
  const typing = event.target.closest('input, textarea, select, [contenteditable="true"]');
  if (event.key === '/' && !typing && search) {
    event.preventDefault();
    if (matchMedia('(max-width: 767px)').matches) openMobileSearch();
    else searchInput.focus();
  }
  if (event.key === 'Escape' && sidebar?.hasAttribute('data-open')) {
    setDrawer(false);
    menuButton.focus();
  }
});

/* Copy buttons */

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
  } catch {
    return;
  }
  const label = button.querySelector('[data-copy-label]');
  const original = label?.textContent;
  button.setAttribute('data-copied', '');
  if (label) label.textContent = 'Tersalin';
  setTimeout(() => {
    button.removeAttribute('data-copied');
    if (label) label.textContent = original;
  }, 1600);
});

/* "Di halaman ini" */

const toc = document.querySelector('[data-toc]');
const pageBody = document.querySelector('[data-page-body]');
// Pages that ask for it (component pages) list h3 too, indented under their h2. Collapsed parts are left out.
const tocSelector = pageBody?.dataset.tocDepth === '3' ? 'h2, h3' : 'h2';
const headings = pageBody
  ? [...pageBody.querySelectorAll(tocSelector)].filter((heading) => heading.textContent.trim() && !heading.closest('details'))
  : [];

if (toc && headings.length >= 2) {
  const list = toc.querySelector('ul');
  const taken = new Set([...document.querySelectorAll('[id]')].map((element) => element.id));
  let section = '';
  for (const heading of headings) {
    if (!heading.id) {
      // An h3 takes its h2's id as a prefix, so two "Cara pakai" headings on one page get different ids.
      let base = fold(heading.textContent).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (heading.tagName === 'H3' && section) base = `${section}-${base}`;
      let id = base;
      for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;
      heading.id = id;
      taken.add(id);
    }
    if (heading.tagName === 'H2') section = heading.id;
    const item = document.createElement('li');
    if (heading.tagName === 'H3') item.className = 'toc-sub';
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    item.append(link);
    list.append(item);
  }
  toc.hidden = false;
  const links = [...list.querySelectorAll('a')];
  let ticking = false;
  const update = () => {
    ticking = false;
    let current = 0;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top < 140) current = index;
    });
    links.forEach((link, index) => link.toggleAttribute('aria-current', index === current));
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}
