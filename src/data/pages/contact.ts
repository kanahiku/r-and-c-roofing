/**
 * Contact page data — thin wrapper around ~/config/contact.
 *
 * Phone and address come from the canonical config. This file adds:
 * - Helper functions used by Footer and the contact page
 * - contactHelpOptions for the form dropdown
 *
 * Do NOT add raw contact values here; edit ~/config/contact.ts instead.
 */
import { CONTACT } from '~/config/contact';

// Re-export canonical values so existing imports keep working
export const contactPhone = {
  text: CONTACT.phone.display,
  href: CONTACT.phone.href,
};

export const contactAddress = {
  line1: CONTACT.address.street,
  city: CONTACT.address.cityLine,
  mapsQuery: CONTACT.address.oneLiner,
};

// Map helpers (used by contact page and footer)
export const contactMapEmbedSrc = CONTACT.address.mapsEmbedSrc;
export const contactDirectionsHref = CONTACT.address.mapsDirectionsHref;

export function mapsEmbedSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

export function mapsDirectionsHref(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

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
