import { serviceHeroActions } from '~/data/pages/services';

export { serviceHeroActions };

export const materialHrefs = {
  hub: '/services/roofing-materials',
  metal: '/services/roofing-materials/metal-roofing',
  asphalt: '/services/roofing-materials/asphalt-shingle-roofing',
  stone: '/services/roofing-materials/stone-coated-steel-roofing',
  tile: '/services/roofing-materials/tile-roofing',
  slate: '/services/roofing-materials/slate-roofing',
};

export const materialCards = {
  metal: {
    title: 'Metal Roofing',
    description:
      'Clean architectural lines and long-term durability designed for modern properties, with careful engineering for coastal salt exposure.',
    href: materialHrefs.metal,
    linkText: 'Explore Metal Roofing',
  },
  asphalt: {
    title: 'Asphalt Shingle Roofing',
    description:
      'A traditional, cost-effective choice offering a broad variety of styles, colors, and budget options for sloped residential roofs.',
    href: materialHrefs.asphalt,
    linkText: 'Explore Asphalt Shingle Roofing',
  },
  stone: {
    title: 'Stone-Coated Steel Roofing',
    description: 'Combines heavy-duty steel strength with the textured, traditional appearance of shake or tile profiles.',
    href: materialHrefs.stone,
    linkText: 'Explore Stone-Coated Steel Roofing',
  },
  tile: {
    title: 'Clay & Concrete Tile Roofing',
    description:
      'Distinctive island styling that creates a classic architectural look, requiring careful review of your home\'s structural load capacity.',
    href: materialHrefs.tile,
    linkText: 'Explore Tile Roofing',
  },
  slate: {
    title: 'Slate & Rubber Slate Roofing',
    description: 'Premium natural stone or lightweight synthetic slate delivering luxury architectural aesthetics.',
    href: materialHrefs.slate,
    linkText: 'Explore Slate Roofing',
  },
};

export const hubMaterialCards = [
  materialCards.metal,
  materialCards.asphalt,
  materialCards.stone,
  materialCards.tile,
];

const coastalExplore = {
  title: 'Metal Roofing',
  description:
    'Clean architectural lines and long-term durability designed for modern properties, with careful engineering for coastal exposure.',
  href: materialHrefs.metal,
  linkText: 'Explore Metal Roofing',
};

const tileExplore = {
  title: 'Tile Roofing',
  description:
    'Distinctive clay or concrete island styling that creates a classic look, requiring careful review of structural load capacity.',
  href: materialHrefs.tile,
  linkText: 'Explore Tile Roofing',
};

export const exploreFromMetal = [materialCards.asphalt, materialCards.stone, tileExplore];
export const exploreFromAsphalt = [coastalExplore, materialCards.stone, tileExplore, materialCards.slate];
export const exploreFromStone = [coastalExplore, materialCards.asphalt, tileExplore];
export const exploreFromTile = [coastalExplore, materialCards.asphalt, materialCards.stone];
export const exploreFromSlate = [coastalExplore, materialCards.asphalt, materialCards.stone, tileExplore];
