import type { HomePageContent } from '~/lib/content/types';

export const homePageData: HomePageContent = {
  meta: {
    title: "R&C Roofing Contractors | Hawaii's Roof Inspection Specialists",
    description:
      'R&C Roofing Contractors provides HAAG Certified roof inspections, roof repair, replacement, commercial roofing, insurance claim documentation, and gutter services on Oahu.',
  },

  hero: {
    titleLine1: "Hawaii's Roof",
    titleLine2: 'Inspection Specialists',
    subtitleParagraph1:
      'We evaluate the damage first before recommending a replacement. Get honest roofing answers for your Oahu property.',
    ctaText: 'Schedule Inspection',
    ctaHref: '/contact',
    phoneCtaText: 'Call (808) 888-2524',
    phoneCtaHref: 'tel:+18088882524',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2070&q=80',
      alt: 'Roof inspection on Oahu home',
    },
  },

  statsBar: [
    { stat: 'C-33642', label: 'License' },
    { stat: 'HAAG', label: 'Certified' },
    { stat: '50+', label: 'Years Combined Experience' },
    { stat: 'BIA', label: 'Hawaii Member' },
  ],

  whyInspect: {
    heading: 'Why We Start With an Inspection',
    paragraph1:
      'A leak or storm damage does not automatically mean you need a complete replacement. R&C Roofing takes an inspection-first approach. We evaluate the roofing system, document our findings, and explain what your property actually needs.',
    paragraph2:
      "Backed by HAAG Certified expertise, we help you avoid unnecessary construction while protecting your property from Oahu's harsh coastal and windward elements. If your roof requires work, our licensed team moves seamlessly from inspection to professional repair or replacement.",
    ctaText: 'Explore Inspections',
    ctaHref: '/roof-inspections',
    image: {
      src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      alt: 'HAAG Certified roof inspection on an Oahu home',
    },
  },

  servicesSection: {
    title: 'How Can We Help You Today?',
    subtitle: 'Choose the service that best matches your roofing needs.',
    services: [
      {
        title: 'Roof Inspections',
        description:
          'Understand the condition of your roof with a HAAG Certified inspection and documented findings.',
        linkText: 'View Roof Inspections',
        linkHref: '/roof-inspections',
      },
      {
        title: 'Roof Repair',
        description:
          'Address leaks, damaged flashing, missing roofing materials, and other localized roof problems.',
        linkText: 'View Roof Repair',
        linkHref: '/services/roof-repair',
      },
      {
        title: 'Claims',
        description:
          'Get roof damage documentation and contractor-side support during the insurance repair process.',
        linkText: 'Explore Claims',
        linkHref: '/claims',
      },
      {
        title: 'Roof Replacement & Installation',
        description:
          'Replace an aging or extensively damaged roof with a system selected for your property and local conditions.',
        linkText: 'View Roof Replacement',
        linkHref: '/services/roof-replacement-and-new-installation',
      },
      {
        title: 'Commercial Roofing',
        description:
          'Roofing services for commercial properties and the professionals responsible for managing roofing projects.',
        linkText: 'View Commercial Roofing',
        linkHref: '/services/commercial-roofing',
      },
      {
        title: 'Gutter Installation',
        description: 'Install gutter systems that help manage rainfall and direct water away from your property.',
        linkText: 'View Gutter Services',
        linkHref: '/services/gutter-installation-and-repair',
      },
    ],
  },

  oahuConditions: {
    title: 'Built for Oahu Roofing Conditions',
    paragraph1:
      "A roof in Kailua faces different challenges than one in Kapolei. We consider your existing roof condition and your property's specific local exposure before recommending what happens next.",
    cards: [
      {
        title: 'Coastal Exposure',
        description:
          'Homes near the coast experience heavy exposure to salt air, requiring specific material considerations.',
        icon: 'tabler:droplet',
      },
      {
        title: 'Windward Moisture',
        description:
          'Wetter windward and valley areas face frequent moisture, demanding highly resilient waterproofing.',
        icon: 'tabler:cloud-rain',
      },
      {
        title: 'Leeward UV & Wind',
        description:
          'Strong UV rays degrade materials over time, while wind-driven rain reveals weak points around flashing.',
        icon: 'tabler:sun',
      },
    ],
    ctaText: 'Explore Residential',
    ctaHref: '/services/residential-roofing',
  },

  roofDamageProcess: {
    heading: 'The Roof Damage Process',
    disclaimer:
      'R&C Roofing is not a public adjuster. We do not adjust claims, negotiate settlements, or guarantee claim outcomes.',
    steps: [
      {
        title: 'Inspect the Roof',
        description: 'We evaluate the system and document visible conditions.',
        icon: 'tabler:search',
      },
      {
        title: 'Document Findings',
        description: "We create a photo record of the roof's physical condition.",
        icon: 'tabler:camera',
      },
      {
        title: 'Submit Your Claim',
        description: 'You file the claim directly with your insurance carrier.',
        icon: 'tabler:file-upload',
      },
      {
        title: 'Provide Scope Info',
        description: 'We provide contractor-side scope details if requested by your carrier.',
        icon: 'tabler:file-description',
      },
      {
        title: 'Complete the Work',
        description: 'R&C Roofing completes the approved repair or replacement.',
        icon: 'tabler:check',
      },
    ],
  },

  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How do I know if my roof needs repair or replacement?',
        answer:
          'Start with an inspection. R&C Roofing evaluates the condition and explains whether the problem requires a repair or a full replacement.',
      },
      {
        question: 'What is a HAAG Certified roof inspector?',
        answer:
          'HAAG certification requires specialized education and testing in roof damage assessment. Robert Pilato holds HAAG certification #201408313.',
      },
      {
        question: 'Can R&C Roofing inspect storm damage?',
        answer:
          'Yes. We can inspect visible roof damage immediately following a storm and provide documented findings for your records.',
      },
      {
        question: 'Can R&C Roofing help with a roof insurance claim?',
        answer:
          'We inspect and document roof damage and provide contractor-side information related to the roofing work. We do not act as public adjusters.',
      },
      {
        question: 'What roofing services do you provide?',
        answer:
          'We provide residential and commercial roof inspections, roof repairs, total roof replacements, new roof installations, and gutter installations.',
      },
      {
        question: 'Where does R&C Roofing provide service?',
        answer:
          'We are based in Honolulu and serve the entire Oahu area, including the South Shore (Waikiki, Kaimuki), Windward Oahu (Kailua, Kaneohe), Central Oahu (Mililani, Pearl City), and Leeward Oahu (Kapolei, Ewa Beach).',
      },
    ],
  },

  ctaBanner: {
    title: 'Find Out What Your Roof Actually Needs',
    subtitle:
      'Stop wondering about the condition of your roof. If you have noticed a leak, storm damage, or missing shingles, R&C Roofing can evaluate the damage and explain what happens next.',
    ctaText: 'Schedule Inspection',
    ctaHref: '/contact',
    showAfterHoursNote: true,
  },
};
