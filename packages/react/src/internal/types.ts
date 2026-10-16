// Figma's Device property. Left unset, a component follows the screen width: Mobile below 768px and Desktop from
// 768px, the same breakpoint as the typography tokens. data-device on any ancestor sets it for a whole section.
export type Device = 'desktop' | 'mobile';
