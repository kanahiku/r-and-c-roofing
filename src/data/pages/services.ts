export function serviceHeroActions(primaryText: string) {
  return [
    { variant: 'primary' as const, text: primaryText, href: '/contact' },
    { variant: 'ghost-light' as const, text: 'Call Now', href: 'tel:+18088882524' },
  ];
}

export const roofingServiceLinks = {
  hub: { title: 'Roofing Services', description: 'Explore all roofing services.', href: '/services', linkText: 'View Roofing Services' },
  repair: {
    title: 'Roof Repair',
    description: 'Targeted fixes for active leaks and localized wind damage when the surrounding system is still sound.',
    href: '/services/roof-repair',
    linkText: 'View Roof Repair',
  },
  replacement: {
    title: 'Roof Replacement & New Installation',
    description: 'Complete tear-offs and new installations built to wind-uplift codes and severe weather standards.',
    href: '/services/roof-replacement-and-new-installation',
    linkText: 'View Roof Replacement',
  },
  residential: {
    title: 'Residential Roofing',
    description: 'Roofing solutions designed to protect Oahu homes against UV, rain, and coastal exposure.',
    href: '/services/residential-roofing',
    linkText: 'View Residential Roofing',
  },
  commercial: {
    title: 'Commercial Roofing',
    description: 'Engineered solutions and structural restoration for commercial buildings and association boards.',
    href: '/services/commercial-roofing',
    linkText: 'View Commercial Roofing',
  },
  gutters: {
    title: 'Gutter Installation & Repair',
    description: 'Custom seamless gutter systems that direct heavy island rainfall away from your foundation.',
    href: '/services/gutter-installation-and-repair',
    linkText: 'View Gutter Services',
  },
  materials: {
    title: 'Roofing Materials',
    description: 'Compare metal, asphalt, stone-coated steel, and tile for lifespan and island conditions.',
    href: '/services/roofing-materials',
    linkText: 'Compare Roofing Materials',
  },
  inspections: {
    title: 'Roof Inspections',
    description: 'HAAG-certified assessments that find the exact root cause before you commit to construction.',
    href: '/roof-inspections',
    linkText: 'View Roof Inspections',
  },
  claims: {
    title: 'Insurance Claim Help',
    description: 'Contractor-side documentation when storm or wind damage is part of an insurance claim.',
    href: '/claims',
    linkText: 'Explore Insurance Claim Help',
  },
};

export const coreRoofingServices = [
  roofingServiceLinks.repair,
  roofingServiceLinks.replacement,
  roofingServiceLinks.residential,
  roofingServiceLinks.commercial,
  roofingServiceLinks.gutters,
  roofingServiceLinks.materials,
];

export function otherRoofingServices(excludeHrefs: string[]) {
  return Object.values(roofingServiceLinks).filter((item) => !excludeHrefs.includes(item.href) && item.href !== '/services');
}
