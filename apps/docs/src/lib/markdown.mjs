// A small Markdown renderer for the texts this site shows: component descriptions from Figma and CHANGELOG.md.
// It covers what those texts use: headings, paragraphs, bullet and numbered lists, bold, inline code and links.

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function inline(text) {
  return text
    .split(/(`[^`]+`)/)
    .map((part) => {
      if (/^`[^`]+`$/.test(part)) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      return escapeHtml(part)
        .replace(/\\([*_\\])/g, (match, char) => `&#${char.charCodeAt(0)};`)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) =>
          /^https?:/.test(href) ? `<a href="${href}" target="_blank" rel="noopener">${label}</a>` : `<a href="${href}">${label}</a>`,
        );
    })
    .join('');
}

/**
 * @param {string} source Markdown text.
 * @param {object} [options]
 * @param {number} [options.shift] Added to every heading level, e.g. 1 turns "#" into <h2>.
 * @param {boolean} [options.labels] Turns a paragraph that is only bold text ("**Cara pakai**") into a small heading.
 * @param {number} [options.labelLevel] Heading level for those labels.
 */
export function renderMarkdown(source, { shift = 0, labels = false, labelLevel = 3 } = {}) {
  const html = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ');
    const label = labels && text.match(/^\*\*([^*]+)\*\*:?$/);
    html.push(label ? `<h${labelLevel} class="md-label">${inline(label[1])}</h${labelLevel}>` : `<p>${inline(text)}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    html.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join('')}</${list.type}>`);
    list = null;
  };
  const addItem = (type, text) => {
    flushParagraph();
    if (list?.type !== type) {
      flushList();
      list = { type, items: [] };
    }
    list.items.push(text);
  };

  for (const raw of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    let match;
    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if ((match = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushParagraph();
      flushList();
      const level = Math.min(6, match[1].length + shift);
      const text = match[2].replace(/^\[([^\]]+)\]/, '$1');
      html.push(`<h${level} id="${slugify(text)}">${inline(text)}</h${level}>`);
    } else if ((match = line.match(/^\s*[-*]\s+(.*)$/))) {
      addItem('ul', match[1]);
    } else if ((match = line.match(/^\s*\d+\.\s+(.*)$/))) {
      addItem('ol', match[1]);
    } else if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return html.join('\n');
}
