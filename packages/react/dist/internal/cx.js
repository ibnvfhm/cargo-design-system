// Joins class names and skips empty ones: cx('cargo-badge', className).
export function cx(...names) {
    return names.filter(Boolean).join(' ');
}
