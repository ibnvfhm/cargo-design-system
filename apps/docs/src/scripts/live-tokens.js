// Fills in values that depend on the chosen brand and mode:
// [data-brand-ref] shows the primitive behind a Brand Theme token, [data-hex] the computed colour of a swatch.
const refs = JSON.parse(document.getElementById('brand-refs')?.textContent ?? '{}');

const toHex = (value) => {
  const channels = value.match(/[\d.]+/g);
  if (!channels || channels.length < 3) return '';
  return `#${channels
    .slice(0, 3)
    .map((channel) => Math.round(Number(channel)).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
};

function update() {
  const brand = document.documentElement.dataset.brand;
  document.querySelectorAll('[data-brand-ref]').forEach((element) => {
    const ref = refs[brand]?.[element.dataset.brandRef] ?? '';
    element.textContent = element.dataset.format === 'figma' ? ref.replace(/\./g, '/') : ref;
  });
  document.querySelectorAll('[data-hex]').forEach((element) => {
    const swatch = element.closest('[data-live]')?.querySelector('[data-swatch]');
    if (swatch) element.textContent = toHex(getComputedStyle(swatch).getPropertyValue(element.dataset.hex || 'background-color'));
  });
}

update();
document.addEventListener('cargo:theme', update);
