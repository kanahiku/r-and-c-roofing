import type { BusinessSchema } from './types';
import { CONTACT } from '~/config/contact';
import { SOCIAL } from '~/config/social';

/**
 * Client-specific business entity for schema.org JSON-LD.
 * Contact data comes from ~/config/contact; social links from ~/config/social.
 * Only change the fields below that are business-schema-specific
 * (idFragment, businessType, priceRange, description, credentials, awards).
 */
export const business: BusinessSchema = {
  idFragment: 'roofingcontractor',
  name: CONTACT.businessName,
  businessType: 'RoofingContractor',
  telephone: CONTACT.phone.schema,
  email: CONTACT.email,
  priceRange: '$$',
  address: {
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
    postalCode: CONTACT.address.zip,
    addressCountry: CONTACT.address.country,
  },
  openingHoursSpecification: CONTACT.hours.map((hours) => ({
    ...hours,
    dayOfWeek: [...hours.dayOfWeek],
  })),
  description:
    'Licensed Honolulu roofing contractor (License C-33642) specializing in HAAG-certified roof inspections and insurance claim documentation, serving Oahu homeowners, property managers, general contractors, architects, and trustees.',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: CONTACT.license,
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'HAAG Certified Inspector - Robert Pilato, Certification #201408313',
      recognizedBy: { '@type': 'Organization', name: 'HAAG Engineering' },
    },
  ],
  memberOf: { '@type': 'Organization', name: 'Building Industry Association of Hawaii (BIA Hawaii)' },
  award: ["Hawaii's Best 2023 - First Place", '2017 BBB Torch Awards Finalist'],
  sameAs: SOCIAL.sameAs as unknown as string[],
  areaServed: { '@type': 'AdministrativeArea', name: CONTACT.areaServed },
};
