import type { ServicePageSeed } from './servicePages';
import {
  exploreFromArchitects,
  exploreFromGc,
  exploreFromHomeowners,
  exploreFromPm,
  exploreFromTrustees,
} from './whoWeServe';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

export const whoWeServePages: ServicePageSeed[] = [
  {
    _id: 'service-page-who-we-serve-homeowners',
    title: 'Homeowners',
    slug: 'who-we-serve/homeowners',
    meta: {
      title: 'Roofing for Oahu Homeowners | R&C Roofing Contractors',
      description:
        'Worried about your roof? R&C Roofing Contractors helps Oahu homeowners understand roof problems, compare repair and replacement options, and plan the right next step.',
    },
    hero: {
      title: 'Roofing for Oahu Homeowners',
      subtitle:
        'You do not need to know what your roof needs before you call. Whether you are dealing with a leak, storm damage, or an aging system, get expert local support backed by Hawaii License C-33642.',
      ctaText: 'Talk to R&C About Your Roof',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Homeowner roofing photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'What Are You Worried About?',
        intro: 'You do not have to diagnose the problem yourself. Find the situation that matches what you are seeing:',
        items: [
          {
            title: 'I Found a Leak',
            description: 'Identify where water is coming from and what part of the system needs attention.',
            icon: 'tabler:droplet',
          },
          {
            title: 'My Roof Was Damaged in a Storm',
            description: 'Document visible damage and check whether repair or replacement is needed.',
            icon: 'tabler:wind',
          },
          {
            title: 'My Roof Is Getting Older',
            description: "Understand your roof's current condition before problems become more obvious.",
            icon: 'tabler:clock',
          },
          {
            title: 'I Think I Need a New Roof',
            description: 'Evaluate the existing roof and explore repair-versus-replacement factors.',
            icon: 'tabler:home-plus',
          },
          {
            title: 'I Have an Insurance Claim',
            description: 'Document visible damage and get contractor-side roofing information.',
            icon: 'tabler:file-text',
          },
          {
            title: 'I Have No Idea What I Need',
            description: 'Start with an expert roof condition assessment instead of guessing.',
            icon: 'tabler:help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Contact R&C Roofing?',
        intro: "Navigating roofing work shouldn't add to your stress:",
        items: [
          {
            title: 'Tell Us What You Are Seeing',
            description:
              'Share your leak, storm impact, age concerns, or other property details without needing technical terminology.',
            icon: 'tabler:phone',
          },
          {
            title: 'We Evaluate the Roof',
            description:
              'We perform a comprehensive inspection, backed by HAAG Certified expertise (Robert Pilato, certification #201408313).',
            icon: 'tabler:search',
          },
          {
            title: 'We Explain What We Find',
            description: "You receive a clear, objective breakdown of your roof's actual condition.",
            icon: 'tabler:file-text',
          },
          {
            title: 'You Review Your Options',
            description: 'We walk you through repair, replacement, or monitoring choices so you understand the rationale.',
            icon: 'tabler:list-details',
          },
          {
            title: 'You Decide How to Move Forward',
            description: 'We develop a detailed project scope only when you are ready to proceed.',
            icon: 'tabler:circle-check',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Who We Serve Resources',
        intro:
          'If your property management needs or stakeholder responsibilities involve other specialized sectors, explore our other dedicated audience solutions:',
        display: 'cards',
        items: exploreFromHomeowners,
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Oahu Homeowners Choose R&C Roofing',
        items: [
          {
            title: 'Licensed Roofing Contractor',
            description: 'Operating under Hawaii License C-33642.',
            icon: 'tabler:certificate',
          },
          {
            title: 'Inspection Expertise',
            description: 'HAAG Certified inspection expertise through Robert Pilato, certification #201408313.',
            icon: 'tabler:badge',
          },
          {
            title: 'Comprehensive Services',
            description:
              'Inspections, repairs, replacements, new installations, and gutter services handled by one experienced local team.',
            icon: 'tabler:tools',
          },
          {
            title: 'Experience & Community',
            description: 'Over 50 years of combined crew experience and proud membership in BIA Hawaii.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'yelpReviewsSection',
        heading: 'What Oahu Homeowners Say',
        intro:
          'Roofing work happens at your home, so workmanship is only part of the experience. Communication and knowing what to expect matter too.',
        items: [
          { name: 'Leonard C.', reviewId: 'tJpKSMVE38r5vgt6OPfl9w', userId: 'DOM9kbe2GdVY0Pi3eCWdrw' },
          { name: 'Wun Shen C.', reviewId: 'rbOBv4trTZYAGJhsCl6FTg', userId: 'qw4T_OIPZPZjgSndn47tRg' },
          { name: 'Herman Y.', reviewId: 'cuFBoA_QIJoI59bmAyuDrg', userId: 'SW5560TYBu1fHCisx3wHWA' },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions For Homeowners',
      items: [
        {
          question: 'I do not know whether I need a repair or replacement. Where should I start?',
          answer:
            'Start with an evaluation of the roof. R&C can look at the existing condition and explain whether a localized repair, larger project, or continued monitoring should be considered.',
        },
        {
          question: 'Will R&C recommend replacement if my roof can be repaired?',
          answer:
            'Recommendations are based strictly on the condition of the roof and the extent of the problem. A localized issue will always call for repair rather than an unnecessary complete replacement.',
        },
        {
          question: 'What roofing services does R&C provide for homeowners?',
          answer:
            'R&C provides roof inspections, roof repairs, roof replacements and new installations, gutter services, and multiple material options.',
        },
        {
          question: 'Do I need to know what is wrong before scheduling an inspection?',
          answer: 'No. You can contact R&C with what you are seeing, and the roof can be evaluated from there.',
        },
      ],
    },
    ctaBanner: {
      title: 'Start With the Condition of Your Roof',
      subtitle:
        'You do not need to decide between repair, replacement, or a specific material before asking for help. Start by finding out what is happening with the roof.',
      ctaText: 'Talk to R&C About Your Roof',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-who-we-serve-property-managers',
    title: 'Property Managers, AOAO & HOA Boards',
    slug: 'who-we-serve/property-managers-aoao-hoa-boards',
    meta: {
      title: 'AOAO & HOA Roofing Oahu | Property Managers | R&C Roofing',
      description:
        'Roofing support for Oahu property managers, AOAO and HOA boards. Get roof condition information, repair and replacement planning, project scopes, and multi-building roofing support from R&C Roofing.',
    },
    hero: {
      title: 'Roofing for Property Managers, AOAO & HOA Boards on Oahu',
      subtitle:
        'Managing a roof problem for one building is different from managing roofing across a condominium, association, or multi-building property. There are board approvals to secure, budgets to plan, residents to consider, and several roofs competing for attention at the same time. Get expert local support backed by Hawaii License C-33642.',
      ctaText: 'Request a Property Roof Assessment',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Association roofing photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'What Does the Board Need to Decide?',
        intro: 'A roofing contractor should help make the decision clearer, not simply hand the board a replacement proposal:',
        items: [
          {
            title: 'What condition are the roofs in now?',
            description: 'Evaluate visible roofing conditions and identify areas that need attention.',
            icon: 'tabler:search',
          },
          {
            title: 'What needs repair now?',
            description: 'Identify localized conditions that may be addressed through repair.',
            icon: 'tabler:tool',
          },
          {
            title: 'What may need replacement?',
            description: 'Explain when broader roof conditions make replacement worth considering.',
            icon: 'tabler:home-plus',
          },
          {
            title: 'Which buildings should come first?',
            description: 'Help identify roofing conditions that can inform prioritization across multiple buildings.',
            icon: 'tabler:building-community',
          },
          {
            title: 'What should we budget for?',
            description: 'Develop contractor pricing based on the proposed roofing scope.',
            icon: 'tabler:coin',
          },
          {
            title: 'Can the work be phased?',
            description: 'Discuss whether the project scope can reasonably be divided into stages.',
            icon: 'tabler:stack-2',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Contact R&C Roofing?',
        intro: "Managing managed properties and association projects shouldn't add to your administrative burden:",
        items: [
          {
            title: 'Understand the Property',
            description:
              'We review the buildings involved, known roofing concerns, management priorities, and the reason for the assessment.',
            icon: 'tabler:building',
          },
          {
            title: 'Evaluate the Roofing Conditions',
            description: 'R&C reviews the applicable roofs or roof areas based on an agreed, systematic scope.',
            icon: 'tabler:search',
          },
          {
            title: 'Identify Roofing Priorities',
            description: 'Our findings establish which conditions should be addressed immediately versus long-term planning.',
            icon: 'tabler:list-details',
          },
          {
            title: 'Develop the Proposed Scope',
            description: 'We prepare contractor-side project information and pricing based on the work being considered.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Support the Decision Process',
            description:
              'Management and the board can review clear information, project scopes, and estimates before deciding how to proceed.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Who We Serve Resources',
        intro:
          'If your management responsibilities involve other specialized sectors, explore our other dedicated audience solutions:',
        display: 'cards',
        items: exploreFromPm,
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Property Managers and Boards Work With R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Roofing Contractor',
            description: 'Operating under Hawaii License C-33642.',
            icon: 'tabler:certificate',
          },
          {
            title: 'HAAG Certified Inspection Expertise',
            description: 'Robert Pilato holds HAAG certification #201408313.',
            icon: 'tabler:badge',
          },
          {
            title: 'Inspection and Roofing Construction',
            description: 'R&C can evaluate roofing conditions and perform roofing construction when work is needed.',
            icon: 'tabler:hammer',
          },
          {
            title: 'Experience & Community',
            description: 'Over 50 years of combined crew experience handling complex association properties.',
            icon: 'tabler:users',
          },
          {
            title: 'Industry Standards',
            description: 'Proud member of BIA Hawaii.',
            icon: 'tabler:building-skyscraper',
          },
        ],
      },
      {
        _type: 'quoteCardsSection',
        heading: 'What Oahu Property Clients Say',
        intro:
          'Managing multi-building portfolios and commercial properties requires high responsiveness, professional communication, and dependable project execution. Read verified feedback from clients who relied on R&C:',
        items: [
          {
            name: 'Robert Thomason',
            quote:
              'Robert @ R & C Roofing along with his crew were very professional when repairing and recoating our companies roof. Robert was very responsive regarding any communication and needs.',
          },
          {
            name: 'Charles & Helen Haiola',
            quote:
              'From first contact... to project completion, perfect timing, and professional supervision with a big crew, the installation was professionally done to our expectations.',
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions For AOAO & HOA Boards',
      items: [
        {
          question: 'Does R&C work with AOAO and HOA boards?',
          answer:
            'Yes. Property managers and association boards are core customer groups for our commercial and multi-family roofing services.',
        },
        {
          question: 'Can R&C assess multiple buildings?',
          answer:
            'Multi-building roofing needs can be evaluated under an agreed project scope, helping management identify differences in condition and prioritize.',
        },
        {
          question: 'Can you help us plan which roofs should be addressed first?',
          answer:
            'R&C provides roofing condition information to help management and boards consider priorities, though final budgeting and capital-planning decisions remain with the association.',
        },
        {
          question: 'Can roofing work be completed in phases?',
          answer:
            'Potentially. Phasing depends on the roofing system, property configuration, project scope, material availability, and other site-specific factors.',
        },
        {
          question: 'Can R&C help with a reserve study?',
          answer:
            'R&C does not prepare reserve studies, but we provide condition data, proposed scopes, and pricing that may be useful to your reserve-study professionals.',
        },
      ],
    },
    ctaBanner: {
      title: 'Give the Board Better Roofing Information',
      subtitle:
        'You should not have to make a major roofing decision based on a leak report, a few photos, or a replacement recommendation without context. Start with the roofing conditions.',
      ctaText: 'Request a Property Roof Assessment',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-who-we-serve-general-contractors',
    title: 'General Contractors',
    slug: 'who-we-serve/general-contractors',
    meta: {
      title: 'Roofing Subcontractor Oahu | General Contractors | R&C Roofing',
      description:
        'Need a roofing subcontractor on Oahu? R&C Roofing Contractors works with general contractors on roofing scopes, scheduling, trade coordination, inspections, repairs, replacement, and new installation.',
    },
    hero: {
      title: 'Roofing Subcontractor for General Contractors on Oahu',
      subtitle:
        'For a general contractor, the roofing scope is only one part of the job. Roofing work has to fit the construction schedule, coordinate with other trades, account for site access, and move through the project without creating avoidable problems elsewhere. Get expert local support backed by Hawaii License C-33642.',
      ctaText: 'Discuss a Roofing Subcontract',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'General contractor roofing photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'Where Does Roofing Fit in Your Schedule?',
        intro:
          'Roofing affects several other parts of the build. The earlier those dependencies are identified, the easier it is to plan the work:',
        items: [
          {
            title: 'Preconstruction',
            description: 'Review the roofing scope, materials, drawings, existing conditions, access, and schedule requirements.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Structure Ready',
            description: 'Confirm conditions needed before roofing work officially begins.',
            icon: 'tabler:building',
          },
          {
            title: 'Dry-In Planning',
            description: "Coordinate the roofing sequence with the project's weather protection requirements.",
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'MEP / Penetrations',
            description: 'Coordinate roof penetrations and related flashing details with applicable trades.',
            icon: 'tabler:settings',
          },
          {
            title: 'Exterior Work',
            description: 'Account for access, staging, equipment, and other work occurring around the building exterior.',
            icon: 'tabler:truck',
          },
          {
            title: 'Roofing Completion',
            description: 'Address applicable roofing closeout items and remaining project coordination.',
            icon: 'tabler:circle-check',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Contact R&C Roofing?',
        intro: "Partnering with a reliable roofing subcontractor shouldn't add to your project management burden:",
        items: [
          {
            title: 'Review the Project',
            description:
              'We start with the roofing need, available plans or scope information, project stage, and construction schedule.',
            icon: 'tabler:file-search',
          },
          {
            title: 'Clarify Roofing Requirements',
            description:
              'R&C reviews applicable roofing work and identifies questions that need resolution before finalizing the scope.',
            icon: 'tabler:help',
          },
          {
            title: 'Develop the Roofing Scope',
            description: 'Proposed work and pricing are prepared based on the information available for the project.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Coordinate the Schedule',
            description:
              'If selected, roofing activities are coordinated with the GC based on the agreed project schedule and site requirements.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Perform the Roofing Work',
            description: 'R&C completes the agreed scope according to project requirements and applicable specifications.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Who We Serve Resources',
        intro:
          'If your construction partnerships or stakeholder responsibilities involve other specialized sectors, explore our other dedicated audience solutions:',
        display: 'cards',
        items: exploreFromGc,
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why General Contractors Work With R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Roofing Contractor',
            description: 'Operating under Hawaii License C-33642.',
            icon: 'tabler:certificate',
          },
          {
            title: 'Inspection Expertise',
            description: 'HAAG Certified inspection expertise through Robert Pilato, certification #201408313.',
            icon: 'tabler:badge',
          },
          {
            title: 'Comprehensive Capabilities',
            description: 'Residential and commercial roofing execution across repairs, replacements, and new installations.',
            icon: 'tabler:home',
          },
          {
            title: 'Material Selection Support',
            description: 'Expertise across metal, asphalt shingles, stone-coated steel, and clay or concrete tile roofing.',
            icon: 'tabler:stack-2',
          },
          {
            title: 'Experience & Community',
            description: 'Over 50 years of combined crew experience and proud membership in BIA Hawaii.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'quoteCardsSection',
        heading: 'What Construction Partners & Clients Say',
        intro:
          'Coordinating trade schedules, managing commercial assets, and maintaining field reliability are critical for successful builds. Read verified feedback from commercial clients and partners who relied on R&C:',
        items: [
          {
            name: 'Robert Thomason',
            quote:
              'Robert @ R & C Roofing along with his crew were very professional when repairing and recoating our companies roof. Robert was very responsive regarding any communication and needs.',
          },
          {
            name: 'Glen Nishiyama',
            quote: "It's been a few months since the roofing was done and it is holding up well.",
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions For General Contractors',
      items: [
        {
          question: 'Does R&C work as a roofing subcontractor for general contractors?',
          answer: 'Yes. General contractors are a core client group for our commercial and residential subcontractor services.',
        },
        {
          question: 'What roofing work can R&C perform for a GC-led project?',
          answer:
            'We provide roofing inspections, roof repairs, roof replacements, new roof installation, and multiple material options.',
        },
        {
          question: 'Can R&C coordinate with mechanical and plumbing trades?',
          answer:
            'Yes. We coordinate roofing work where roof penetrations and other trade interfaces affect the roofing scope, while the GC maintains overall trade sequencing.',
        },
        {
          question: 'Can R&C meet our construction schedule?',
          answer:
            'We review requested schedules to determine whether roofing work can be coordinated within proposed project requirements before committing to timelines.',
        },
        {
          question: 'Can R&C help with material selection?',
          answer:
            'Yes, within our roofing scope. Projects requiring specialized architectural engineering or custom specifications should remain coordinated with project designers.',
        },
      ],
    },
    ctaBanner: {
      title: 'Need a Roofing Subcontractor for an Oahu Project?',
      subtitle:
        'Send R&C the project information and roofing scope. We can review the roofing requirements, discuss schedule and site considerations, and determine whether the project fits our capabilities.',
      ctaText: 'Discuss a Roofing Subcontract',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-who-we-serve-architects',
    title: 'Architects & Specifiers',
    slug: 'who-we-serve/architects-and-specifiers',
    meta: {
      title: 'Roofing Contractor for Architects Oahu | R&C Roofing',
      description:
        'Roofing support for Oahu architects and specifiers. Discuss roofing materials, constructability, product information, roof details, project requirements, and installation considerations with R&C Roofing Contractors.',
    },
    hero: {
      title: 'Roofing Support for Architects & Specifiers on Oahu',
      subtitle:
        'Roofing decisions made during design can affect material selection, detailing, constructability, project cost, and installation later. Bring roofing into the conversation before details are locked. Get expert contractor-side input backed by Hawaii License C-33642.',
      ctaText: 'Discuss Roofing Requirements With R&C',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Architect roofing photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'Where Can Roofing Contractor Input Help?',
        intro:
          'The most useful time to resolve a roofing question is often before it becomes a field condition. The earlier relevant roofing questions are identified, the easier it is for the project team to address them before mobilization:',
        items: [
          {
            title: 'Existing Conditions',
            description:
              'Evaluate current roofing systems and document visible conditions before reroofing or renovation decisions are finalized.',
            icon: 'tabler:search',
          },
          {
            title: 'Design Development',
            description: "Discuss roofing materials and practical installation considerations based on R&C's available systems.",
            icon: 'tabler:pencil',
          },
          {
            title: 'Material Selection',
            description: 'Gain contractor-side input on material availability, roof configuration, and installation requirements.',
            icon: 'tabler:stack-2',
          },
          {
            title: 'Construction Documents',
            description: 'Review roofing scope information and identify questions that may affect installation or pricing.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Bid / Procurement',
            description: 'Receive detailed roofing proposals based on available drawings, specifications, and project information.',
            icon: 'tabler:calculator',
          },
          {
            title: 'Construction Coordination',
            description:
              'Coordinate agreed roofing scopes with the project team and address roofing-related field conditions through established RFI processes.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Contact R&C Roofing?',
        intro: "Partnering with a reliable roofing contractor shouldn't add ambiguity to your design process:",
        items: [
          {
            title: 'Review the Roofing Scope',
            description: 'We review available drawings, roofing information, project requirements, and existing conditions.',
            icon: 'tabler:file-search',
          },
          {
            title: 'Identify Roofing Questions',
            description:
              'Constructability questions, material issues, or unclear scope conditions are identified before pricing or installation.',
            icon: 'tabler:help',
          },
          {
            title: 'Confirm Proposed Systems',
            description:
              'The selected system is evaluated for alignment with approved project documents and environmental requirements.',
            icon: 'tabler:circle-check',
          },
          {
            title: 'Provide Contractor Information',
            description: 'We prepare scopes, pricing, and available product documentation based on the project parameters.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Coordinate During Construction',
            description:
              'Roofing work is meticulously coordinated with the GC and applicable project team members to honor the design intent.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Who We Serve Resources',
        intro:
          'If your design partnerships or stakeholder responsibilities involve other specialized sectors, explore our other dedicated audience solutions:',
        display: 'cards',
        items: exploreFromArchitects,
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Architects and Project Teams Work With R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Roofing Contractor',
            description: 'Operating under Hawaii License C-33642.',
            icon: 'tabler:certificate',
          },
          {
            title: 'HAAG Certified Inspection Expertise',
            description: 'Robert Pilato holds HAAG certification #201408313 for accurate existing-condition assessments.',
            icon: 'tabler:badge',
          },
          {
            title: 'Installation Perspective',
            description:
              'R&C brings pragmatic contractor-side roofing experience to conversations around material selection and constructability.',
            icon: 'tabler:hammer',
          },
          {
            title: 'Comprehensive Material Support',
            description: 'Expertise across metal roofing, asphalt shingles, stone-coated steel, and clay or concrete tile systems.',
            icon: 'tabler:stack-2',
          },
          {
            title: 'Experience & Community',
            description: 'Over 50 years of combined crew experience and proud membership in BIA Hawaii.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'quoteCardsSection',
        heading: 'What Construction Partners & Clients Say',
        intro:
          "Collaborating with design teams and executing specified assemblies requires deep product knowledge, proactive communication, and follow-through. Read verified feedback from clients who experienced R&C's technical execution:",
        items: [
          {
            name: 'Karen Miyaki',
            quote: 'Matt was excellent with his services and follow-up. Workers were great. Thank you.',
          },
          {
            name: 'Erlinda',
            quote: 'James is very knowledgeable and does a good job. Go team!',
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions For Architects & Specifiers',
      items: [
        {
          question: 'Can R&C help architects evaluate roofing materials?',
          answer:
            'Yes. R&C can provide contractor-side information about roofing materials and systems within our current installation capabilities, though final specification remains with project decision-makers.',
        },
        {
          question: 'Can R&C review roofing details before bidding?',
          answer:
            'Yes. We review available roofing information to identify contractor-side scope or constructability questions prior to bid finalized stages.',
        },
        {
          question: 'Can R&C provide wind-uplift information?',
          answer:
            'R&C provides available manufacturer and roofing-system information associated with the products we install. Project-specific wind design or structural calculations should remain with the licensed engineer.',
        },
        {
          question: 'Can R&C inspect an existing roof before we complete renovation drawings?',
          answer:
            'Yes. R&C provides HAAG Certified roof inspection services to help document visible existing roofing conditions for renovation or reroofing projects.',
        },
        {
          question: 'Can R&C suggest an alternative if a specified roofing product is unavailable?',
          answer:
            "Yes. We can identify available roofing alternatives within our capabilities and provide product information for the design team's formal substitution approval process.",
        },
      ],
    },
    ctaBanner: {
      title: 'Resolve Roofing Questions Before They Become Field Questions',
      subtitle:
        'If roofing details, materials, or existing conditions may affect an Oahu project, involve the roofing contractor early enough to identify practical installation questions.',
      ctaText: 'Discuss Roofing Requirements With R&C',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-who-we-serve-trustees',
    title: 'Trustees & Estate Managers',
    slug: 'who-we-serve/trustees-and-estate-managers',
    meta: {
      title: 'Roofing for Trustees & Estate Managers Oahu | R&C Roofing',
      description:
        'Roofing assessments and contractor documentation for Oahu trustees and estate managers. Understand roof condition, deferred maintenance, repair priorities, replacement needs, and project costs with R&C Roofing.',
    },
    hero: {
      title: 'Roofing for Trustees & Estate Managers on Oahu',
      subtitle:
        'When you are responsible for property on behalf of an estate, trust, or family ownership structure, a roofing decision must be clearly documented for people who may never visit the property in person. Get expert local evaluation backed by Hawaii License C-33642.',
      ctaText: 'Request a Property Roof Assessment',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Estate property roof photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'What Are Your Property Concerns?',
        intro:
          'You do not have to navigate complex property roofing challenges alone. Find the situation that matches what you are managing:',
        items: [
          {
            title: 'We Need a Documented Roof Record',
            description:
              'Establish clear, objective observations of visible roofing conditions for estate files or multiple stakeholders.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Managing Deferred Maintenance',
            description: 'Separate active roofing repairs that need immediate attention from long-term wear that can be monitored.',
            icon: 'tabler:clock',
          },
          {
            title: 'Preparing a Property for Sale or Transfer',
            description: 'Identify known repair needs or replacement considerations before a transaction moves forward.',
            icon: 'tabler:key',
          },
          {
            title: 'Evaluating Repair vs. Replacement',
            description: 'Get expert contractor assessment to determine whether localized fixes or broader replacement makes sense.',
            icon: 'tabler:scale',
          },
          {
            title: 'Dealing With Storm Damage',
            description: 'Document visible wind or severe weather impacts and gather contractor-side information.',
            icon: 'tabler:wind',
          },
          {
            title: 'Coordination Across Multiple Parties',
            description: 'Provide clear roofing data that trustees, beneficiaries, and property managers can review together.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Contact R&C Roofing?',
        intro: "Managing estate and trust property roofing shouldn't add to your administrative burden:",
        items: [
          {
            title: 'Establish the Purpose',
            description:
              'Tell us why the roof is being evaluated, such as deferred maintenance planning, a property transfer, active damage, or general condition uncertainty.',
            icon: 'tabler:phone',
          },
          {
            title: 'Professional Condition Evaluation',
            description:
              'We perform a comprehensive inspection, backed by HAAG Certified expertise (Robert Pilato, certification #201408313).',
            icon: 'tabler:search',
          },
          {
            title: 'Document the Findings',
            description: 'We establish clear, objective roofing observations that can be reviewed by all responsible parties.',
            icon: 'tabler:camera',
          },
          {
            title: 'Identify Options & Pricing',
            description:
              'We outline practical recommendations ranging from targeted repairs to full replacement scopes with transparent project pricing.',
            icon: 'tabler:clipboard-list',
          },
          {
            title: 'Maintain the Property Record',
            description:
              'Inspection reports and roofing proposals can be archived as part of your ongoing property management records.',
            icon: 'tabler:folder',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Who We Serve Resources',
        intro:
          'If your property management needs or stakeholder responsibilities involve other specialized sectors, explore our other dedicated audience solutions:',
        display: 'cards',
        items: exploreFromTrustees,
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Trustees and Estate Managers Work With R&C Roofing',
        items: [
          {
            title: 'Licensed Hawaii Roofing Contractor',
            description: 'Operating under Hawaii License C-33642.',
            icon: 'tabler:certificate',
          },
          {
            title: 'HAAG Certified Inspection Expertise',
            description: 'Robert Pilato holds HAAG certification #201408313.',
            icon: 'tabler:badge',
          },
          {
            title: 'Documentation Before Construction',
            description:
              'Our inspection-first approach allows roofing conditions to be evaluated before repair or replacement decisions are made.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Inspection and Roofing Services',
            description: 'If roofing work is needed after the evaluation, R&C also provides roof repair and replacement services.',
            icon: 'tabler:hammer',
          },
          {
            title: 'Experience & Community',
            description: 'Over 50 years of combined crew experience handling complex Oahu properties.',
            icon: 'tabler:users',
          },
        ],
      },
      {
        _type: 'yelpReviewsSection',
        heading: 'What Oahu Property Clients Say',
        intro:
          'Managing multiple stakeholder properties requires clear communication, dependable documentation, and professional reliability. Read authentic feedback directly from verified clients:',
        items: [
          { name: 'Leonard C.', reviewId: 'tJpKSMVE38r5vgt6OPfl9w', userId: 'DOM9kbe2GdVY0Pi3eCWdrw' },
          { name: 'Wun Shen C.', reviewId: 'rbOBv4trTZYAGJhsCl6FTg', userId: 'qw4T_OIPZPZjgSndn47tRg' },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions For Trustees & Estate Managers',
      items: [
        {
          question: 'Can R&C provide a written assessment of a roof?',
          answer:
            'Yes. R&C provides roof inspection services and can document observable roofing conditions according to the agreed inspection scope.',
        },
        {
          question: 'Can a roof assessment help with an estate valuation?',
          answer:
            'Roofing information can help appraisers, trustees, or managers understand known roof conditions and possible expenses. However, R&C does not perform real estate or estate valuations.',
        },
        {
          question: 'Can R&C identify deferred roofing maintenance?',
          answer:
            'Yes. We can evaluate visible roofing conditions and identify items that may need repair, monitoring, or broader roofing consideration. Legal or fiduciary conclusions remain outside our role.',
        },
        {
          question: 'Do we need to replace an older roof immediately?',
          answer:
            'Not necessarily. Age alone does not determine the appropriate action. The physical condition of the system should always be evaluated first.',
        },
        {
          question: 'Can R&C work directly with our property manager or attorney?',
          answer:
            "R&C can coordinate roofing-related communication with authorized property representatives according to your estate's requirements.",
        },
      ],
    },
    ctaBanner: {
      title: 'Create a Clear Record of the Roof',
      subtitle:
        'When you are responsible for property on behalf of someone else, roofing decisions should begin with documented conditions rather than assumptions.',
      ctaText: 'Request a Property Roof Assessment',
      ctaHref: '/contact',
    },
  },
];
