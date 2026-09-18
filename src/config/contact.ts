/**
 * Single source of truth for all client contact data.
 *
 * Every component, page, schema file, and navigation file imports from here.
 * To update the phone number, address, or email for a new client: change it
 * here only — every consumer updates automatically.
 *
 * When setting up a new site, replace every value below.
 */
export const CONTACT = {
  /** Legal / display business name used in footer, legal pages, CTABanner. */
  businessName: 'R&C Roofing Contractors',

  /** Contractor license shown in footer or legal copy (set null if none). */
  license: 'Hawaii Contractor License C-33642',

  phone: {
    /** Human-readable label — used in nav, footer, CTABanner, CTA buttons. */
    display: '(808) 888-2524',
    /** HTML tel: href — used in all anchor href attributes. */
    href: 'tel:+18088882524',
    /** E.164 format — used in schema.org telephone field. */
    schema: '+1-808-888-2524',
  },

  alternatePhones: [
    {
      display: '(808) 216-3256',
      href: 'tel:+18082163256',
      schema: '+1-808-216-3256',
    },
  ],

  /** Primary contact email shown in legal pages and schema.org. */
  email: 'info@safehomeservice.com',

  address: {
    street: '3302 Campbell Ave',
    city: 'Honolulu',
    state: 'HI',
    zip: '96815',
    country: 'US',
    /** "City, ST ZIP" — used in footer and CTABanner one-liner. */
    get cityLine() {
      return `${this.city}, ${this.state} ${this.zip}`;
    },
    /** Full one-line address — used as Google Maps query string. */
    get oneLiner() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
    /** Google Maps embed URL. */
    get mapsEmbedSrc() {
      return `https://maps.google.com/maps?q=${encodeURIComponent(this.oneLiner)}&z=16&output=embed`;
    },
    /** Google Maps directions URL. */
    get mapsDirectionsHref() {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.oneLiner)}`;
    },
  },

  /**
   * Business hours for schema.org OpeningHoursSpecification.
   * Add multiple objects for different day ranges.
   */
  hours: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:30',
    },
  ],

  /** Service area shown in schema.org areaServed. */
  areaServed: 'Oahu, Hawaii',
} as const;
