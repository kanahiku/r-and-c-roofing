import type { CtaBannerContent, PageHero } from '~/lib/content/types';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

type SeedHero = Omit<PageHero, 'image'> & { imagePlaceholder: string };

type SeedPoint = { title: string; description: string; icon: string };
type SeedCard = { title: string; description: string; href: string; linkText: string };
type SeedFaq = { question: string; answer: string };

type SeedSection =
  | { _type: 'iconPointsSection'; heading: string; intro?: string; layout?: 'auto' | 'grid' | 'band'; items: SeedPoint[] }
  | { _type: 'timelineSection'; heading: string; intro?: string; steps: SeedPoint[] }
  | { _type: 'linkedCardsSection'; heading: string; intro?: string; display: 'cards' | 'directory'; items: SeedCard[] }
  | { _type: 'infoCardsSection'; heading: string; intro?: string; items: SeedPoint[] }
  | { _type: 'editorialSection'; heading: string; paragraphs: string[] }
  | {
      _type: 'comparisonTableSection';
      heading: string;
      intro?: string;
      featureLabel: string;
      column1: string;
      column2: string;
      column3?: string;
      rows: { feature: string; cell1: string; cell2: string; cell3?: string }[];
    }
  | {
      _type: 'bulletCardsSection';
      heading: string;
      intro?: string;
      items: { title: string; items: string[] }[];
    }
  | { _type: 'checklistSection'; heading: string; intro?: string; items: string[] }
  | {
      _type: 'yelpReviewsSection';
      heading: string;
      intro?: string;
      items?: { name: string; reviewId: string; userId: string }[];
    }
  | {
      _type: 'liveReviewsSection';
      heading: string;
      intro?: string;
      sources?: 'both' | 'google' | 'yelp';
    }
  | {
      _type: 'splitContentSection';
      heading: string;
      paragraphs: string[];
      ctaText?: string;
      ctaHref?: string;
      imagePlaceholder?: string;
    }
  | {
      _type: 'quoteCardsSection';
      heading: string;
      intro?: string;
      items: { name: string; quote: string }[];
    };

export interface ServicePageSeed {
  _id: string;
  title: string;
  slug: string;
  meta: { title: string; description: string };
  hero: SeedHero;
  sections: SeedSection[];
  faqs?: { title: string; items: SeedFaq[] };
  ctaBanner: CtaBannerContent;
}

export const servicePages: ServicePageSeed[] = [
  {
    _id: 'service-page-services',
    title: 'Services hub',
    slug: 'services',
    meta: {
      title: 'Roofing Services in Hawaii | Oahu Contractor | R&C Roofing',
      description:
        'Explore our complete range of roofing services on Oahu. We provide licensed roof repairs, total replacements, and commercial roofing solutions.',
    },
    hero: {
      title: 'Hawaii Roofing Services on Oahu',
      subtitle:
        'Precision diagnostics meet expert construction. We identify the exact root cause of your roof failure before recommending any physical solution.',
      ctaText: 'Book Your Diagnostic Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Roofing services photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'Who We Serve on Oahu',
        intro:
          'Different properties require different approaches. We tailor our diagnostic and construction services to meet the specific demands of your property type.',
        items: [
          {
            title: 'Residential Homeowners',
            description:
              'Tailored roofing solutions, repairs, and full replacements engineered to withstand coastal salt air, heavy sun, and valley moisture in your specific neighborhood.',
            icon: 'tabler:home',
          },
          {
            title: 'Property Managers & AOAO/HOA Boards',
            description:
              'Structured, long-term maintenance, multi-building inspections, and commercial-grade solutions designed to protect community assets and reserve funds.',
            icon: 'tabler:building-community',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Core Roofing Services',
        intro:
          'As a licensed Hawaii roofing contractor (License C-33642), we provide a complete range of specialized services. Choose a category below to learn more:',
        display: 'cards',
        items: [
          {
            title: 'Roof Repair',
            description:
              'Targeted fixes for active leaks and localized wind damage. We locate and fix the root cause rather than applying temporary patches.',
            href: '/services/roof-repair',
            linkText: 'View Roof Repair',
          },
          {
            title: 'Roof Replacement & New Installation',
            description:
              'Complete tear-offs and new roof installations built to strict wind-uplift codes and severe weather standards.',
            href: '/services/roof-replacement-and-new-installation',
            linkText: 'View Roof Replacement',
          },
          {
            title: 'Residential Roofing',
            description:
              'Comprehensive roofing solutions designed to protect Oahu homes against tropical UV degradation and heavy seasonal showers.',
            href: '/services/residential-roofing',
            linkText: 'View Residential Roofing',
          },
          {
            title: 'Commercial Roofing',
            description:
              'Engineered solutions and structural restoration services built for commercial buildings, multi-family units, and association boards.',
            href: '/services/commercial-roofing',
            linkText: 'View Commercial Roofing',
          },
          {
            title: 'Gutter Installation & Repair',
            description: 'Custom seamless gutter systems designed to direct heavy island rainfall away from your foundation.',
            href: '/services/gutter-installation-and-repair',
            linkText: 'View Gutter Services',
          },
          {
            title: 'Roofing Materials Hub',
            description:
              'Compare the performance, lifespan, and environmental benefits of metal, asphalt, stone-coated steel, and tile roofing.',
            href: '/services/roofing-materials',
            linkText: 'Compare Roofing Materials',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Properties Trust R&C Roofing',
        intro:
          'Hawaii roofs age differently than mainland roofs. You need a contractor who understands the specific environmental threats across the island:',
        items: [
          {
            title: 'Local Environmental Defense',
            description:
              'We combat coastal salt-air corrosion, engineer systems for wind-driven rain, and select materials resistant to tropical UV degradation.',
            icon: 'tabler:shield-check',
          },
          {
            title: 'Code Compliance & Permitting',
            description:
              'We manage the entire municipal permitting process, ensuring installations strictly adhere to Hawaii building codes for wind uplift resistance.',
            icon: 'tabler:certificate',
          },
          {
            title: 'Protected Warranties',
            description: 'We utilize factory-approved installation methods so your manufacturer warranties remain fully intact.',
            icon: 'tabler:award',
          },
          {
            title: 'Local Experience',
            description:
              'We bring decades of hands-on island roofing experience directly to your residential or commercial property.',
            icon: 'tabler:map-pin',
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Are you a licensed and insured roofing contractor?',
          answer:
            "Yes. R&C operates under Hawaii Contractor License C-33642 and carries full general liability and workers' compensation insurance.",
        },
        {
          question: 'How do I know if I need a repair or a full replacement?',
          answer:
            'We rely on diagnostic facts gathered during a professional inspection. We recommend a full replacement only when a targeted repair is structurally impossible or financially irresponsible.',
        },
        {
          question: 'Do you handle the building permits for a new roof?',
          answer: 'Yes. We manage the entire municipal permitting process for Oahu properties from start to finish.',
        },
        {
          question: 'What types of roofing materials do you install?',
          answer:
            'We install asphalt shingles, standing seam metal, stone-coated steel, concrete tile, and commercial roofing systems matched to your neighborhood microclimate.',
        },
        {
          question: 'How long does a standard roof replacement take?',
          answer:
            'Most residential roof replacements are completed in two to three days, while commercial timelines vary based on square footage and building complexity.',
        },
      ],
    },
    ctaBanner: {
      title: 'Start With the Facts',
      subtitle: 'Do not sign a construction contract without a documented structural assessment.',
      ctaText: 'Book Your Diagnostic Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-repair',
    title: 'Roof Repair',
    slug: 'services/roof-repair',
    meta: {
      title: 'Roof Repair Honolulu & Oahu | R&C Roofing Contractors',
      description:
        'Need roof repair on Oahu? R&C Roofing Contractors repairs leaks, damaged shingles, flashing problems, and other localized roof issues. Schedule an inspection.',
    },
    hero: {
      title: 'Roof Repair Services on Oahu',
      subtitle:
        'Targeted, permanent solutions for active leaks, damaged shingles, and compromised flashing when your surrounding roofing system is still sound—backed by Hawaii License C-33642.',
      ctaText: 'Schedule a Roof Repair Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Roof repair photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'When a Targeted Repair is the Right Choice',
        intro:
          'Not every roof problem requires a total tear-off. When damage is isolated and the rest of your roofing system remains in good condition, a targeted repair is often the most practical and cost-effective approach:',
        items: [
          {
            title: 'Localized Leaks',
            description:
              'Tracing interior ceiling stains or moisture back to a specific exterior breach, such as a cracked vent or separated valley flashing.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Storm-Displaced or Damaged Shingles',
            description:
              'Replacing missing, torn, or lifted shingles caused by high wind gusts or falling tree debris before water intrusion spreads.',
            icon: 'tabler:wind',
          },
          {
            title: 'Flashing Failures',
            description:
              'Repairing or resealing corroded or loosened metal flashing around chimneys, skylights, roof transitions, and wall junctions.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Penetration Wear',
            description: 'Addressing deteriorated rubber boots or sealants around plumbing stacks and exhaust vents.',
            icon: 'tabler:circle-dashed',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How We Approach Every Roof Repair',
        intro: "We don't just apply temporary patches or guess at the source of a leak. Every repair follows a strict diagnostic process:",
        steps: [
          {
            title: 'Inspect the Problem',
            description:
              "We start with what you notice—whether it's an active ceiling drip, missing shingles, or storm-related damage.",
            icon: 'tabler:search',
          },
          {
            title: 'Evaluate Surrounding Materials',
            description:
              'A repair must work seamlessly with the roof around it. We inspect the adjacent components to ensure the fix will actually hold.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Provide an Honest Scope',
            description:
              'If a localized repair can safely solve the issue, we recommend it. If widespread wear means a repair is just throwing money away, we explain why.',
            icon: 'tabler:file-description',
          },
          {
            title: 'Execute Professional Construction',
            description:
              'Our licensed crews complete the repair using corrosion-resistant fasteners and proper flashing techniques built for Oahu weather.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Roofing Services & Resources',
        intro: 'As a licensed Hawaii roofing contractor, we provide full structural support from minor fixes to major installations:',
        display: 'cards',
        items: [
          {
            title: 'Roof Inspections',
            description: 'Get a professional, HAAG-certified assessment (Cert #201408313) to find the exact root cause.',
            href: '/roof-inspections',
            linkText: 'View Roof Inspections',
          },
          {
            title: 'Roof Replacement',
            description: 'Explore full tear-offs and new installations if your roof has widespread structural damage.',
            href: '/services/roof-replacement-and-new-installation',
            linkText: 'View Roof Replacement',
          },
          {
            title: 'Gutter Services',
            description: 'Custom gutter solutions to ensure proper drainage away from your foundation and roof edges.',
            href: '/services/gutter-installation-and-repair',
            linkText: 'View Gutter Services',
          },
          {
            title: 'Insurance Claim Help',
            description: 'Objective, contractor-side documentation if your repair involves severe weather or wind damage.',
            href: '/claims',
            linkText: 'Explore Insurance Claim Help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Property Owners Trust R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Contractor',
            description: "Operating under License C-33642 with full general liability and workers' compensation coverage.",
            icon: 'tabler:certificate',
          },
          {
            title: '50+ Years Combined Experience',
            description: 'Decades of specialized island roofing experience across residential and commercial properties.',
            icon: 'tabler:clock',
          },
          {
            title: 'Inspection-First Philosophy',
            description:
              'We base our recommendations on physical facts, ensuring you only pay for the scope of work your property requires.',
            icon: 'tabler:search',
          },
          {
            title: 'Insurance Documentation Support',
            description:
              'We provide clear, contractor-side paperwork to assist you when filing a storm or wind damage claim with your carrier.',
            icon: 'tabler:file-text',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens Next?',
        intro: 'Getting a roof repair handled properly is straightforward:',
        steps: [
          {
            title: 'Schedule Your Inspection',
            description: 'Contact us online or call directly to set up an evaluation of your leak or damage.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Review the Diagnostic Findings',
            description: 'We identify the exact point of failure and present a clear, project-specific repair estimate.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Complete the Repair',
            description: 'Our team executes the agreed-upon fix efficiently, keeping your property clean and secure.',
            icon: 'tabler:check',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Stop a Small Leak Before It Becomes a Major Problem',
      subtitle: 'Get objective facts and expert repairs from experienced local professionals.',
      ctaText: 'Schedule a Roof Repair Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-replacement',
    title: 'Roof Replacement & New Installation',
    slug: 'services/roof-replacement-and-new-installation',
    meta: {
      title: 'Roof Replacement Oahu | New Roof Installation | R&C Roofing',
      description:
        'Planning a roof replacement or new roof installation on Oahu? R&C Roofing Contractors installs residential and commercial roofing systems for Hawaii properties.',
    },
    hero: {
      title: 'Roof Replacement & New Installation on Oahu',
      subtitle:
        'Invest in lasting property protection with licensed, diagnostic-driven roof replacements and new installations across Oahu—backed by Hawaii License C-33642.',
      ctaText: 'Schedule a Replacement Consultation',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Roof replacement photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'When to Consider a Full Roof Replacement',
        intro:
          'A roof problem does not automatically require a total tear-off. We recommend a full replacement only when a targeted repair is structurally unfeasible or financially irresponsible:',
        items: [
          {
            title: 'Widespread Deterioration',
            description:
              'Granule loss, curling shingles, or extensive metal corrosion across multiple slopes indicate the system has reached the end of its serviceable life.',
            icon: 'tabler:layers-off',
          },
          {
            title: 'Recurring Leaks in Multiple Areas',
            description:
              'When water intrusion occurs in several distinct locations, localized patching leaves broader underlying failures unaddressed.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Compromised Decking or Substructure',
            description:
              'Extensive rot or structural sag beneath the surface requires removing existing layers to restore the building envelope safely.',
            icon: 'tabler:home-off',
          },
          {
            title: 'Repeated Ineffective Repairs',
            description:
              'If previous repair attempts have failed to stop leaks, a comprehensive replacement is often the most cost-effective long-term solution.',
            icon: 'tabler:refresh',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Goes Into a Complete Roofing Assembly',
        intro:
          'A durable roof replacement is an engineered system, not just the surface material you see from the ground. Every R&C installation addresses the complete assembly:',
        items: [
          {
            title: 'Decking Inspection & Repair',
            description: 'We inspect the underlying wood structure once the old roof is removed and replace rotted or damaged sheathing.',
            icon: 'tabler:wood',
          },
          {
            title: 'High-Performance Underlayment',
            description: 'We install secondary water barriers designed to protect the decking from wind-driven rain and extreme heat.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Flashing & Penetrations',
            description:
              'We replace and seal metal flashing along valleys, walls, chimneys, and vent pipes to prevent leaks at critical transitions.',
            icon: 'tabler:border-corners',
          },
          {
            title: 'Ventilation & Fasteners',
            description:
              "We use corrosion-resistant fasteners and ensure balanced attic ventilation to withstand Oahu's high humidity and coastal conditions.",
            icon: 'tabler:wind',
          },
          {
            title: 'Finished Roofing Surface',
            description:
              'Premium asphalt, metal, stone-coated steel, or tile installed strictly according to manufacturer specifications and Hawaii building codes.',
            icon: 'tabler:home',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Roofing Services & Materials',
        intro: 'As a licensed Hawaii roofing contractor, we manage both replacement projects and material selection:',
        display: 'cards',
        items: [
          {
            title: 'Roof Repair',
            description: 'Determine if a targeted repair can resolve your issue without a full replacement.',
            href: '/services/roof-repair',
            linkText: 'View Roof Repair',
          },
          {
            title: 'Roof Inspections',
            description: 'Get an objective HAAG-certified condition assessment (Cert #201408313).',
            href: '/roof-inspections',
            linkText: 'View Roof Inspections',
          },
          {
            title: 'Roofing Materials Hub',
            description: 'Compare asphalt shingles, metal, stone-coated steel, and tile options.',
            href: '/services/roofing-materials',
            linkText: 'Compare Roofing Materials',
          },
          {
            title: 'Insurance Claim Help',
            description: 'Get contractor documentation if your replacement involves severe storm or wind damage.',
            href: '/claims',
            linkText: 'Explore Insurance Claim Help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Property Owners Choose R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Contractor',
            description: "Operating under License C-33642 with full general liability and workers' compensation coverage.",
            icon: 'tabler:certificate',
          },
          {
            title: '50+ Years Combined Experience',
            description: 'Decades of specialized island roofing experience across residential and commercial properties.',
            icon: 'tabler:clock',
          },
          {
            title: 'Permitting & Code Compliance',
            description: 'We manage the municipal permitting process to ensure full compliance with Hawaii wind-uplift standards.',
            icon: 'tabler:building',
          },
          {
            title: 'HAAG-Certified Diagnostics',
            description: 'Robert Pilato (Cert #201408313) brings forensic-level evaluation to ensure your replacement scope is precise.',
            icon: 'tabler:search',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens Next?',
        intro: 'Planning a roof replacement or new installation is straightforward with our structured process:',
        steps: [
          {
            title: 'Schedule Your Consultation',
            description: 'Contact us online or call directly to arrange an on-site property evaluation.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Review Your Project Scope',
            description: 'We inspect the roof, discuss material options, and provide a clear, detailed estimate tailored to your property.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Execute the Installation',
            description:
              'Our licensed crews manage permitting, material logistics, tear-off, and installation with clean, professional job-site management.',
            icon: 'tabler:hammer',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Plan Your Roof Replacement With Confidence',
      subtitle: "Get the facts about your roof's condition and explore the best long-term system for your property.",
      ctaText: 'Schedule a Replacement Consultation',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-residential-roofing',
    title: 'Residential Roofing',
    slug: 'services/residential-roofing',
    meta: {
      title: 'Residential Roofing Oahu | R&C Roofing Contractors',
      description:
        'Explore residential roofing services on Oahu from R&C Roofing Contractors, including roof repair, replacement, inspections, gutters, and roofing material options.',
    },
    hero: {
      title: 'Residential Roofing Services on Oahu',
      subtitle:
        "Protect your home and your family with licensed, diagnostic-driven roofing solutions built to withstand Hawaii's severe weather.",
      ctaText: 'Schedule a Residential Consultation',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Residential roofing photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: "Engineering Roofs for Oahu's Unique Microclimates",
        intro:
          'A roof on the mainland does not face the same threats as a roof on Oahu. When we evaluate your home, we factor in the specific environmental exposure of your neighborhood:',
        items: [
          {
            title: 'Coastal Salt Exposure',
            description:
              'Homes near the ocean require specialized fasteners, finishes, and metal components that resist rapid salt-air corrosion.',
            icon: 'tabler:ripple',
          },
          {
            title: 'Wind-Driven Rain',
            description:
              'Roof shape, height, and surrounding terrain dictate how your home handles upward wind-driven rain and severe storm fronts.',
            icon: 'tabler:wind',
          },
          {
            title: 'Heavy Valley Downpours',
            description:
              'Homes in wetter regions rely heavily on flawless flashing, penetrations, and proper drainage systems to prevent pooling.',
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'Tropical UV Degradation',
            description:
              'Intense year-round sun accelerates the aging of exposed materials, requiring shingles and coatings designed for high heat.',
            icon: 'tabler:sun',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What to Expect During Your Residential Project',
        intro:
          'We do not believe in high-pressure sales. We believe in providing structural facts. Here is how we manage your residential project from start to finish:',
        steps: [
          {
            title: 'Listen and Evaluate',
            description:
              'We start by understanding your specific concern, then safely access the roof to evaluate the physical condition of your materials.',
            icon: 'tabler:message',
          },
          {
            title: 'Review Your Options',
            description:
              'We present our findings clearly. If a localized repair makes sense, we recommend it. If widespread wear requires a replacement, we explain exactly why.',
            icon: 'tabler:list-details',
          },
          {
            title: 'Project-Specific Recommendation',
            description: 'You receive a clear, contractor-side scope of work and estimate based on the actual physical needs of your home.',
            icon: 'tabler:file-description',
          },
          {
            title: 'Execute the Construction',
            description: 'Once approved, our licensed crews complete the installation according to strict Hawaii building codes.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Residential Roofing Services',
        intro:
          "As a licensed Hawaii roofing contractor (License C-33642), we offer a complete suite of services tailored to your home's needs:",
        display: 'directory',
        items: [
          {
            title: 'Roof Repair',
            description: 'Targeted fixes for damaged shingles and flashing when the surrounding system is still sound.',
            href: '/services/roof-repair',
            linkText: 'View Roof Repair',
          },
          {
            title: 'Roof Replacement',
            description: 'Complete tear-offs and new installations built to strict wind-uplift codes.',
            href: '/services/roof-replacement-and-new-installation',
            linkText: 'View Roof Replacement',
          },
          {
            title: 'Roof Inspections',
            description: 'Diagnostic assessments led by HAAG Certified Inspector Robert Pilato (Certification #201408313).',
            href: '/roof-inspections',
            linkText: 'View Roof Inspections',
          },
          {
            title: 'Gutter Services',
            description: 'Custom seamless gutter installation and repair to route heavy island rainfall away from your foundation.',
            href: '/services/gutter-installation-and-repair',
            linkText: 'View Gutter Services',
          },
          {
            title: 'Roofing Materials Hub',
            description: 'Expert guidance comparing Asphalt Shingles, Metal Roofing, Stone-Coated Steel, and Tile.',
            href: '/services/roofing-materials',
            linkText: 'Compare Roofing Materials',
          },
          {
            title: 'Insurance Claim Help',
            description: 'Objective, contractor-side documentation to support your residential insurance claim file.',
            href: '/claims',
            linkText: 'Explore Insurance Claim Help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Homeowners Choose R&C Roofing',
        intro: 'Your home is your most valuable asset. We bring the credentials and experience necessary to protect it properly:',
        items: [
          {
            title: 'Licensed & Insured',
            description: 'We operate under active Hawaii Contractor License C-33642, protecting you from liability during construction.',
            icon: 'tabler:certificate',
          },
          {
            title: '50+ Years of Combined Experience',
            description: 'Our local crews understand island architecture and installation methods.',
            icon: 'tabler:clock',
          },
          {
            title: 'HAAG Certified Expertise',
            description: 'We bring specialized forensic training to our damage assessments, ensuring accurate diagnoses.',
            icon: 'tabler:search',
          },
          {
            title: 'Insurance Claim Support',
            description:
              'If your roof was damaged in a storm, we provide the objective, contractor-side documentation your insurance carrier needs to review your claim.',
            icon: 'tabler:file-text',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens Next?',
        intro: "Getting clarity on your residential roof doesn't have to be complicated:",
        steps: [
          {
            title: 'Schedule Your Assessment',
            description: 'Reach out online or call us directly to pick a convenient time.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Get the Facts',
            description: 'We inspect your property and provide an honest, objective evaluation.',
            icon: 'tabler:search',
          },
          {
            title: 'Review Your Options',
            description: "We outline your choices clearly so you can decide what's best for your home with zero high-pressure sales tactics.",
            icon: 'tabler:clipboard-check',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Start With Your Home and Your Roof',
      subtitle: 'Find out exactly what your residential roofing system needs before you commit to a construction contract.',
      ctaText: 'Schedule a Residential Consultation',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-commercial-roofing',
    title: 'Commercial Roofing',
    slug: 'services/commercial-roofing',
    meta: {
      title: 'Commercial Roofing Oahu | R&C Roofing Contractors',
      description:
        'Commercial roofing services on Oahu from R&C Roofing Contractors. We provide roof inspections, repairs, replacement, and roofing support for property owners and project teams.',
    },
    hero: {
      title: 'Commercial Roofing Services on Oahu',
      subtitle:
        'Expert roofing support, inspections, repairs, and complete replacements engineered for commercial properties, property managers, and project teams across Oahu—backed by Hawaii License C-33642.',
      ctaText: 'Discuss Your Commercial Roofing Project',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Commercial roofing photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'Tailored Roofing Support for Commercial Stakeholders',
        intro:
          'Commercial roofing decisions involve unique operational priorities, property budgets, tenant requirements, and stakeholder coordination. We provide structured, diagnostic-driven solutions tailored to your property management role:',
        items: [
          {
            title: 'Property Managers',
            description:
              'Clear assessments, routine inspections, and reliable budgeting information to protect community assets and reserve funds.',
            icon: 'tabler:building-community',
          },
          {
            title: 'General Contractors',
            description:
              'Professional roofing scope execution that integrates cleanly into broader construction, renovation, or multi-trade schedules.',
            icon: 'tabler:briefcase',
          },
          {
            title: 'Architects & Design Teams',
            description: 'Technical contractor input on system selection, weight loads, penetrations, and building design alignment.',
            icon: 'tabler:ruler-measure',
          },
          {
            title: 'Association Boards & Trustees',
            description: 'Objective structural data and transparent documentation to support informed capital expenditure decisions.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'Commercial Roofing Systems & Solutions',
        intro:
          'Different commercial building designs require specific engineering and waterproofing approaches. We install and service commercial systems tailored to Oahu properties, including:',
        items: [
          {
            title: 'Low-Slope & Flat Roof Systems',
            description: 'Engineered membrane and built-up systems designed to handle pooling water and intense tropical heat.',
            icon: 'tabler:layout',
          },
          {
            title: 'Liquid-Applied Roof Coatings',
            description:
              'Seamless elastomeric and reflective coatings that protect existing commercial surfaces and lower interior building temperatures.',
            icon: 'tabler:paint',
          },
          {
            title: 'Modified Bitumen Roofing',
            description: 'Multi-layer durable systems built for high-traffic commercial roofs and heavy asset placement.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Commercial Metal Retrofits',
            description: 'Specialized structural restoration and fastening for aging commercial metal panel buildings.',
            icon: 'tabler:building-factory',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Commercial Roofing Services',
        intro:
          'As a licensed Hawaii contractor, we provide a complete suite of commercial solutions designed to minimize downtime and protect building envelopes:',
        display: 'directory',
        items: [
          {
            title: 'Roof Repair',
            description: 'Targeted fixes for active leaks, localized damage, and failing flashings when surrounding systems remain sound.',
            href: '/services/roof-repair',
            linkText: 'View Roof Repair',
          },
          {
            title: 'Roof Replacement',
            description: 'Comprehensive tear-offs and new commercial roofing installations engineered to strict wind-uplift codes.',
            href: '/services/roof-replacement-and-new-installation',
            linkText: 'View Roof Replacement',
          },
          {
            title: 'Roof Inspections',
            description:
              'Professional assessments led by HAAG Certified Inspector Robert Pilato (Cert #201408313) to document visible conditions.',
            href: '/roof-inspections',
            linkText: 'View Roof Inspections',
          },
          {
            title: 'Gutter Services',
            description:
              'Custom seamless gutter installation and repair to route heavy island rainfall away from your commercial foundation.',
            href: '/services/gutter-installation-and-repair',
            linkText: 'View Gutter Services',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Commercial Properties Trust R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Contractor',
            description:
              "Operating under License C-33642 with full general liability and workers' compensation coverage for commercial sites.",
            icon: 'tabler:certificate',
          },
          {
            title: '50+ Years Combined Experience',
            description:
              'Decades of specialized island roofing experience across multi-family units, association boards, and commercial builds.',
            icon: 'tabler:clock',
          },
          {
            title: 'Inspection-First Philosophy',
            description:
              'We base our recommendations on physical facts, ensuring you only pay for the scope of work your property requires.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Stakeholder Documentation',
            description:
              'We provide photographic evidence and project-specific pricing that can easily be reviewed by property owners, boards, and project teams.',
            icon: 'tabler:file-text',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens Next?',
        intro: 'Managing a commercial roofing project is straightforward with our structured, collaborative process:',
        steps: [
          {
            title: 'Discuss the Property & Project',
            description: 'Contact us to share your building type, timeline, and specific roofing concerns.',
            icon: 'tabler:message',
          },
          {
            title: 'Evaluate the Roof',
            description: 'We perform a thorough site evaluation of accessible roofing areas to assess structural conditions.',
            icon: 'tabler:search',
          },
          {
            title: 'Review the Scope & Estimates',
            description: 'We provide clear, contractor-side documentation, photographic evidence, and project pricing for your stakeholders.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Execute the Work',
            description: 'Our licensed crews manage the project safely, cleanly, and on schedule.',
            icon: 'tabler:hammer',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Partner With Experienced Commercial Roofers',
      subtitle: 'Get the structural facts and professional execution your commercial property requires.',
      ctaText: 'Discuss Your Commercial Roofing Project',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-gutters',
    title: 'Gutter Installation & Repair',
    slug: 'services/gutter-installation-and-repair',
    meta: {
      title: 'Gutter Installation Honolulu & Oahu | R&C Roofing',
      description:
        'Need new gutters on Oahu? R&C Roofing Contractors provides gutter installation and gutter services for Hawaii homes and properties. Request an estimate.',
    },
    hero: {
      title: 'Gutter Installation & Repair on Oahu',
      subtitle:
        'Ensure proper drainage and protect your foundation with custom seamless gutter installation and repair services across Oahu—backed by Hawaii License C-33642.',
      ctaText: 'Get a Gutter Estimate',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Gutter installation photo placeholder',
    },
    sections: [
      {
        _type: 'editorialSection',
        heading: "Controlling Water Runoff Across Oahu's Microclimates",
        paragraphs: [
          'Your roof sheds rainwater, but your gutter system determines where that water goes next. In wetter regions and windward valleys, managing heavy downpours is critical to preventing soil erosion, foundation pooling, and fascia rot. Whether you need a brand-new system or a targeted fix, we ensure your drainage works seamlessly with your roofline.',
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'When to Repair, Replace, or Install Gutters',
        intro: 'Every drainage project begins by evaluating the physical condition of your current system:',
        items: [
          {
            title: 'New Gutter Installation',
            description:
              'Designed for properties without gutters, planning a precise system matched to your roof pitch and local rainfall volume.',
            icon: 'tabler:plus',
          },
          {
            title: 'Targeted Gutter Repairs',
            description: 'Fixing loose brackets, sealing minor leaks, or securing sections that are pulling away from the roof edge.',
            icon: 'tabler:tool',
          },
          {
            title: 'Complete Gutter Replacement',
            description: 'Upgrading damaged, sagging, or undersized gutters that no longer direct water properly away from the structure.',
            icon: 'tabler:refresh',
          },
          {
            title: 'Coordinated Reroofing Updates',
            description: 'Evaluating and replacing your drainage system simultaneously when undertaking a full roof replacement.',
            icon: 'tabler:home-plus',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Roofing & Drainage Services',
        intro: 'As a licensed Hawaii contractor, we coordinate your gutter systems directly with your roofing and weather-proofing needs:',
        display: 'cards',
        items: [
          {
            title: 'Roof Replacement',
            description: 'Plan a new drainage system seamlessly alongside a complete roof tear-off.',
            href: '/services/roof-replacement-and-new-installation',
            linkText: 'View Roof Replacement',
          },
          {
            title: 'Roof Repair',
            description: 'Address active leaks, flashing issues, or damaged roof edges.',
            href: '/services/roof-repair',
            linkText: 'View Roof Repair',
          },
          {
            title: 'Roof Inspections',
            description: 'Get a professional assessment (HAAG Certified, Cert #201408313) to check overall structural health.',
            href: '/roof-inspections',
            linkText: 'View Roof Inspections',
          },
          {
            title: 'Insurance Claim Help',
            description: 'Get contractor-side documentation if your gutter or roof damage involves severe weather.',
            href: '/claims',
            linkText: 'Explore Insurance Claim Help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Property Owners Choose R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Contractor',
            description: "Operating under License C-33642 with full general liability and workers' compensation coverage.",
            icon: 'tabler:certificate',
          },
          {
            title: '50+ Years Combined Experience',
            description: 'Decades of specialized island roofing and water-management experience.',
            icon: 'tabler:clock',
          },
          {
            title: 'Integrated Solutions',
            description:
              'We evaluate how your roof design, slope, and downspouts interact to handle heavy tropical downpours safely.',
            icon: 'tabler:link',
          },
          {
            title: 'Reliable Craftsmanship',
            description: 'Professional installation designed to stand up to heavy seasonal rainfall and coastal exposure.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens Next?',
        intro: 'Getting your drainage system sorted out is straightforward:',
        steps: [
          {
            title: 'Schedule Your Evaluation',
            description: "Contact us online or call directly to review your property's drainage needs.",
            icon: 'tabler:calendar',
          },
          {
            title: 'Review Your Project Scope',
            description: 'We inspect your roofline and existing gutters to provide a clear, tailored estimate.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Execute the Installation',
            description: 'Our team completes the gutter installation or repair cleanly and efficiently.',
            icon: 'tabler:hammer',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Get the Water Moving in the Right Direction',
      subtitle: 'Protect your property from erosion and pooling with expert gutter installation and repair.',
      ctaText: 'Get a Gutter Estimate',
      ctaHref: '/contact',
    },
  },
];
