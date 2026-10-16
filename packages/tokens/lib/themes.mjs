// One mode in Figma = one file in src/brand/; one Semantic mode = one file in src/semantic/.
// A Figma collection holds at most 10 modes, so the brands without a parent are modes of the Brand Theme collection,
// and the products of INTI (parent: 'inti') are modes of the INTI Product collection. In Figma, Brand Theme's INTI mode
// points at INTI Product, whose first mode (INTI) holds INTI's own colours. In code every product is a brand of its own.
export const BRANDS = [
  { id: 'uic', name: 'UIC' },
  { id: 'inti', name: 'INTI' },
  { id: 'inmeterai', name: 'InMeterai' },
  { id: 'incivas', name: 'InCivas' },
  { id: 'incustoms', name: 'InCustoms' },
  { id: 'inaccount', name: 'InAccount', parent: 'inti' },
  { id: 'inbot', name: 'InBot', parent: 'inti' },
  { id: 'inproject', name: 'InProject', parent: 'inti' },
  { id: 'insend', name: 'InSend', parent: 'inti' },
  { id: 'indocs', name: 'InDocs', parent: 'inti' },
  { id: 'inrecap', name: 'InRecap', parent: 'inti' },
  { id: 'inpos', name: 'InPos', parent: 'inti' },
  { id: 'incoop', name: 'InCoop', parent: 'inti' },
];

// The most modes one Figma collection can hold on the team's plan.
export const FIGMA_MAX_MODES = 10;

export const MODES = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
];
