export const inspectionHeroActions = [
  { variant: 'primary', text: 'Schedule Inspection', href: '/contact' },
  { variant: 'ghost-light', text: 'Call Now', href: 'tel:+18088882524' },
];

export const inspectionServices = [
  {
    title: 'HAAG Certified Inspections',
    description: 'Advanced damage assessment backed by forensic engineering standards.',
    href: '/roof-inspections/haag-certified-inspection',
    linkText: 'View HAAG Certified Inspections',
  },
  {
    title: 'Pre-Purchase Inspections',
    description: 'Understand structural conditions before buying an Oahu property.',
    href: '/roof-inspections/pre-purchase-roof-inspection',
    linkText: 'View Pre-Purchase Inspections',
  },
  {
    title: 'Pre-Listing Inspections',
    description: 'Identify issues before putting your home on the real estate market.',
    href: '/roof-inspections/pre-listing-roof-inspection',
    linkText: 'View Pre-Listing Inspections',
  },
  {
    title: 'Storm Damage Inspections',
    description: 'Evaluate visible roofing impacts after high winds or severe weather.',
    href: '/roof-inspections/storm-and-wind-damage-inspection',
    linkText: 'View Storm Damage Inspections',
  },
  {
    title: 'Maintenance Inspections',
    description: 'Track aging materials and identify minor issues before they escalate.',
    href: '/roof-inspections/annual-maintenance-inspection',
    linkText: 'View Maintenance Inspections',
  },
];

export const inspectionHubCard = {
  title: 'Roof Inspections',
  description: 'Explore all roof inspections',
  href: '/roof-inspections',
  linkText: 'View Roof Inspections',
};

export function otherInspectionServices(excludeHref: string, includeHub = false) {
  const cards = inspectionServices.filter((service) => service.href !== excludeHref);
  return includeHub ? [inspectionHubCard, ...cards] : cards;
}

export const inspectionProcessIcons = {
  listen: 'tabler:message',
  evaluate: 'tabler:search',
  document: 'tabler:camera',
  recommend: 'tabler:clipboard-check',
};
