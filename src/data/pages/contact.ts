export const contactAddress = {
  line1: '3302 Campbell Ave',
  city: 'Honolulu, HI 96815',
  mapsQuery: '3302 Campbell Ave, Honolulu, HI 96815',
};

export const contactPhone = {
  text: '(808) 888-2524',
  href: 'tel:+18088882524',
};

export const contactMapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contactAddress.mapsQuery)}&z=16&output=embed`;
export const contactDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactAddress.mapsQuery)}`;

export const contactHelpOptions = [
  { label: 'Roof Inspection', value: 'roof-inspection' },
  { label: 'Roof Leak or Roof Repair', value: 'roof-leak-or-repair' },
  { label: 'Roof Replacement or New Installation', value: 'roof-replacement' },
  { label: 'Storm or Wind Damage', value: 'storm-or-wind-damage' },
  { label: 'Insurance Claim Roofing Documentation', value: 'insurance-claim' },
  { label: 'Residential Roofing', value: 'residential-roofing' },
  { label: 'Commercial Roofing', value: 'commercial-roofing' },
  { label: 'Gutter Installation or Repair', value: 'gutters' },
  { label: 'Buying or Selling a Property', value: 'buying-or-selling' },
  { label: 'Other', value: 'other' },
];
