// Joins class names and skips empty ones: cx('cargo-badge', className).
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(' ');
}
