import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About Us',
      href: getPermalink('/about/our-story'),
      links: [
        {
          text: 'Our Story & Credentials',
          href: getPermalink('/about/our-story'),
        },
        {
          text: 'Project Gallery',
          href: getPermalink('/about/gallery'),
        },
        {
          text: 'Reviews',
          href: getPermalink('/about/reviews'),
        },
      ],
    },
    {
      text: 'Roof Inspections',
      href: getPermalink('/roof-inspections'),
      links: [
        {
          text: 'HAAG Certified Inspection',
          href: getPermalink('/roof-inspections/haag-certified-inspection'),
        },
        {
          text: 'Pre-Purchase Roof Inspection',
          href: getPermalink('/roof-inspections/pre-purchase-roof-inspection'),
        },
        {
          text: 'Pre-Listing / Seller\u2019s Roof Inspection',
          href: getPermalink('/roof-inspections/pre-listing-sellers-roof-inspection'),
        },
        {
          text: 'Storm & Wind Damage Inspection',
          href: getPermalink('/roof-inspections/storm-and-wind-damage-inspection'),
        },
        {
          text: 'Annual Maintenance Inspection',
          href: getPermalink('/roof-inspections/annual-maintenance-inspection'),
        },
      ],
    },
    {
      text: 'Insurance Claim Help',
      href: getPermalink('/insurance-claim-help'),
      links: [
        {
          text: 'How the Claim Process Works',
          href: getPermalink('/insurance-claim-help/how-the-claim-process-works'),
        },
        {
          text: 'Denied or Underpaid Claims',
          href: getPermalink('/insurance-claim-help/denied-or-underpaid-claims'),
        },
      ],
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
      links: [
        {
          text: 'Roof Repair',
          href: getPermalink('/services/roof-repair'),
        },
        {
          text: 'Roof Replacement & New Installation',
          href: getPermalink('/services/roof-replacement-and-new-installation'),
        },
        {
          text: 'Residential Roofing',
          href: getPermalink('/services/residential-roofing'),
        },
        {
          text: 'Commercial Roofing',
          href: getPermalink('/services/commercial-roofing'),
        },
        {
          text: 'Gutter Installation & Repair',
          href: getPermalink('/services/gutter-installation-and-repair'),
        },
        {
          text: 'Flat Roofing & Silicone Coating',
          href: getPermalink('/services/flat-roofing-and-silicone-coating'),
        },
        {
          text: 'Roofing Materials',
          href: getPermalink('/services/roofing-materials'),
          links: [
            {
              text: 'Metal Roofing',
              href: getPermalink('/services/roofing-materials/metal-roofing'),
            },
            {
              text: 'Asphalt Shingle Roofing',
              href: getPermalink('/services/roofing-materials/asphalt-shingle-roofing'),
            },
            {
              text: 'Stone-Coated Steel Roofing',
              href: getPermalink('/services/roofing-materials/stone-coated-steel-roofing'),
            },
            {
              text: 'Tile Roofing (Clay & Concrete)',
              href: getPermalink('/services/roofing-materials/tile-roofing-clay-and-concrete'),
            },
            {
              text: 'Slate & Rubber Slate Roofing',
              href: getPermalink('/services/roofing-materials/slate-and-rubber-slate-roofing'),
            },
          ],
        },
      ],
    },
    {
      text: 'Roof Problems We Solve',
      href: getPermalink('/roof-problems-we-solve'),
      links: [
        {
          text: 'My Roof Is Leaking',
          href: getPermalink('/roof-problems-we-solve/my-roof-is-leaking'),
        },
        {
          text: 'Storm Damage on My Roof',
          href: getPermalink('/roof-problems-we-solve/storm-damage-on-my-roof'),
        },
        {
          text: 'My Roof Is at End of Life',
          href: getPermalink('/roof-problems-we-solve/my-roof-is-at-end-of-life'),
        },
        {
          text: 'My Insurance Claim Was Denied',
          href: getPermalink('/roof-problems-we-solve/my-insurance-claim-was-denied'),
        },
        {
          text: 'Buying or Selling a Home',
          href: getPermalink('/roof-problems-we-solve/buying-or-selling-a-home'),
        },
        {
          text: 'Preparing for Hurricane Season',
          href: getPermalink('/roof-problems-we-solve/preparing-for-hurricane-season'),
        },
      ],
    },
    {
      text: 'Who We Serve',
      href: getPermalink('/who-we-serve'),
      links: [
        {
          text: 'Homeowners',
          href: getPermalink('/who-we-serve/homeowners'),
        },
        {
          text: 'Property Managers & AOAO / HOA Boards',
          href: getPermalink('/who-we-serve/property-managers-aoao-hoa-boards'),
        },
        {
          text: 'General Contractors',
          href: getPermalink('/who-we-serve/general-contractors'),
        },
        {
          text: 'Architects & Specifiers',
          href: getPermalink('/who-we-serve/architects-and-specifiers'),
        },
        {
          text: 'Trustees & Estate Managers',
          href: getPermalink('/who-we-serve/trustees-and-estate-managers'),
        },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Roof Repair', href: getPermalink('/services/roof-repair') },
        { text: 'Roof Replacement', href: getPermalink('/services/roof-replacement-and-new-installation') },
        { text: 'Residential Roofing', href: getPermalink('/services/residential-roofing') },
        { text: 'Commercial Roofing', href: getPermalink('/services/commercial-roofing') },
        { text: 'Gutter Installation', href: getPermalink('/services/gutter-installation-and-repair') },
        { text: 'Flat Roofing & Silicone', href: getPermalink('/services/flat-roofing-and-silicone-coating') },
      ],
    },
    {
      title: 'Inspections',
      links: [
        { text: 'HAAG Certified', href: getPermalink('/roof-inspections/haag-certified-inspection') },
        { text: 'Pre-Purchase Inspection', href: getPermalink('/roof-inspections/pre-purchase-roof-inspection') },
        { text: 'Storm Damage Inspection', href: getPermalink('/roof-inspections/storm-and-wind-damage-inspection') },
        { text: 'Annual Maintenance', href: getPermalink('/roof-inspections/annual-maintenance-inspection') },
      ],
    },
    {
      title: 'Who We Serve',
      links: [
        { text: 'Homeowners', href: getPermalink('/who-we-serve/homeowners') },
        { text: 'Property Managers', href: getPermalink('/who-we-serve/property-managers-aoao-hoa-boards') },
        { text: 'General Contractors', href: getPermalink('/who-we-serve/general-contractors') },
        { text: 'Architects & Specifiers', href: getPermalink('/who-we-serve/architects-and-specifiers') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about/our-story') },
        { text: 'Our Story', href: getPermalink('/about/our-story') },
        { text: 'Project Gallery', href: getPermalink('/about/gallery') },
        { text: 'Reviews', href: getPermalink('/about/reviews') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
    { text: 'Terms of Service', href: getPermalink('/terms-of-service') },
    { text: 'Accessibility', href: getPermalink('/accessibility-statement') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Google', icon: 'tabler:brand-google', href: '#' },
    { ariaLabel: 'Yelp', icon: 'tabler:star', href: '#' },
  ],
  footNote: `
    &copy; ${new Date().getFullYear()} R&C Roofing. All rights reserved.
  `,
};
