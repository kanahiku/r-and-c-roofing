import type { ServicePageSeed } from './servicePages';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

export const claimPages: ServicePageSeed[] = [
  {
    _id: 'service-page-claims-hub',
    title: 'Claims hub',
    slug: 'claims',
    meta: {
      title: 'Roof Insurance Claim Help Hawaii | R&C Roofing',
      description:
        'Get roof insurance claim help from R&C Roofing Contractors on Oahu. We inspect roof damage, document findings, provide roofing scope information, and complete approved repair work.',
    },
    hero: {
      title: 'Roof Insurance Claim Help on Oahu',
      subtitle:
        'Understand how to navigate your property insurance claim with objective, contractor-side documentation and expert structural support.',
      ctaText: 'Schedule Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Insurance claim help photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'Contractor Support vs. Insurance Adjusting',
        intro:
          'R&C supports the structural side of your insurance claim. We provide objective evidence of physical damage, while your insurance company handles the financial and legal decisions.',
        featureLabel: 'Claim Aspect',
        column1: 'R&C Roofing Support',
        column2: 'Insurance Carrier / Public Adjuster',
        rows: [
          {
            feature: 'Damage Assessment',
            cell1: 'Inspects and photographs physical roof conditions.',
            cell2: 'Determines if the specific damage is covered by your policy.',
          },
          {
            feature: 'Scope & Pricing',
            cell1: 'Provides technical repair estimates and material scopes.',
            cell2: 'Approves payouts based on Actual Cash Value (ACV) or Replacement Cost Value (RCV).',
          },
          {
            feature: 'Claim Negotiation',
            cell1: 'Answers technical contractor questions if requested.',
            cell2: 'Negotiates final settlements and makes all coverage decisions.',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'Understanding the Roofing Claim Journey',
        intro:
          'The insurance claim process can feel overwhelming. Every claim is unique, but the roofing portion generally follows a structured five-step path.',
        steps: [
          {
            title: 'Inspect the Roof',
            description: 'We evaluate accessible areas for visible damage and document conditions relevant to your concern.',
            icon: 'tabler:search',
          },
          {
            title: 'Document the Findings',
            description: 'We create a visual record and outline a professional structural scope of work if repairs are necessary.',
            icon: 'tabler:camera',
          },
          {
            title: 'Contact Your Carrier',
            description:
              'You file the claim directly with your insurance company to kick off their coverage review and deductible requirements.',
            icon: 'tabler:phone',
          },
          {
            title: 'Provide Contractor Information',
            description: 'We supply the technical contractor-side information your adjuster requests during their review.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Execute the Work',
            description:
              'If the carrier approves the scope and you select R&C for the project, our team completes the construction.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Understanding Common Roof Insurance Terms',
        intro: 'Insurance documents are filled with unfamiliar terminology. Here is what these standard terms mean for your property:',
        layout: 'band',
        items: [
          {
            title: 'Actual Cash Value (ACV)',
            description: 'A valuation that accounts for the physical depreciation of your older roofing materials over time.',
            icon: 'tabler:coin',
          },
          {
            title: 'Replacement Cost Value (RCV)',
            description:
              'The estimated cost of replacing your damaged property with comparable new materials, subject to your policy limits.',
            icon: 'tabler:home-plus',
          },
          {
            title: 'Deductible',
            description: 'The out-of-pocket amount you are responsible for paying before your insurance coverage takes over.',
            icon: 'tabler:receipt',
          },
        ],
      },
      {
        _type: 'yelpReviewsSection',
        heading: 'Real Client Experience',
        intro: 'R&C has worked with Oahu property owners whose roofing projects involved insurance claims.',
        items: [
          { name: 'Ronald C.', reviewId: 'wfK95mJOJuhlnDWT6027ow', userId: 'RiSfA-nw1ngEY_q6tzwoQA' },
          { name: 'Nancy M.', reviewId: 'FB6iD9eGHe6Z2DRhu3Szgw', userId: 'jKtqiGp_z46RAmwxolPp7Q' },
          { name: 'Herman Y.', reviewId: 'cuFBoA_QIJoI59bmAyuDrg', userId: 'SW5560TYBu1fHCisx3wHWA' },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Claim Resources',
        intro: 'Dive deeper into the specific stages of your insurance claim using our dedicated guides:',
        display: 'cards',
        items: [
          {
            title: 'The Claim Process',
            description: 'Follow the roofing side of the claim from initial inspection through final construction.',
            href: '/claims/how-the-claim-process-works',
            linkText: 'View the Claim Process',
          },
          {
            title: 'Denied or Underpaid Claims',
            description: 'Learn what to review if your carrier denies the claim or approves a limited scope.',
            href: '/claims/denied-or-underpaid-claims',
            linkText: 'View Denied or Underpaid Claims',
          },
          {
            title: 'Storm Damage Inspections',
            description: 'Have your roof evaluated specifically for wind uplift and severe weather impacts.',
            href: '/roof-inspections/storm-and-wind-damage-inspection',
            linkText: 'View Storm Damage Inspections',
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Should I call R&C before filing an insurance claim?',
          answer:
            'Yes. A professional inspection gives you the structural facts you need before deciding whether to file a claim with your carrier.',
        },
        {
          question: 'Can R&C tell me whether my roof damage is covered?',
          answer:
            'No. We identify the physical damage, but your insurance carrier determines coverage based entirely on the terms of your policy.',
        },
        {
          question: 'Does R&C negotiate with the insurance company?',
          answer:
            'No. We are not public adjusters. We provide contractor-side documentation and answer technical questions, but we do not negotiate settlements.',
        },
        {
          question: 'What if my insurance claim is denied?',
          answer:
            "Review your carrier's explanation alongside your policy documents. If your carrier needs additional physical evidence, we can inspect the property again to document relevant conditions.",
        },
        {
          question: 'Can R&C complete the repair or replacement after the claim?',
          answer:
            'Yes. We operate under Hawaii Contractor License C-33642 and can execute the agreed-upon repair or full replacement once your project moves forward.',
        },
      ],
    },
    ctaBanner: {
      title: 'Start With the Condition of the Roof',
      subtitle: 'Find out exactly what happened to your roofing system before you start the insurance process.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-claim-process',
    title: 'How the Claim Process Works',
    slug: 'claims/how-the-claim-process-works',
    meta: {
      title: 'How Roof Insurance Claims Work in Hawaii | R&C Roofing',
      description:
        'Learn how the roof insurance claim process works in Hawaii and where R&C Roofing can help with inspections, damage documentation, roofing scopes, and repairs.',
    },
    hero: {
      title: 'How the Roof Insurance Claim Process Works in Hawaii',
      subtitle:
        'If your roof has been damaged by severe weather, the insurance process involves several moving parts before repair work actually begins. Here is what to expect from start to finish.',
      ctaText: 'Schedule a Roof Damage Inspection',
      ...contactCta,
      imagePlaceholder: 'Claim process photo placeholder',
    },
    sections: [
      {
        _type: 'bulletCardsSection',
        heading: 'Defining the Roles: Who Handles What?',
        intro: "Understanding each party's role early on will save you time and frustration.",
        items: [
          {
            title: "Your Insurance Carrier's Role",
            items: [
              'Reviews your policy and claim requirements.',
              'Determines whether the loss is officially covered.',
              'Assigns an adjuster to determine the payout amount under the policy.',
              'Handles all final claim decisions, settlements, and dispute resolutions.',
            ],
          },
          {
            title: "R&C Roofing's Role",
            items: [
              'Inspects accessible roofing areas for physical damage.',
              'Documents relevant structural conditions with photos and technical notes.',
              'Provides a professional contractor-side scope or estimate.',
              'Completes the physical roofing work if the project moves forward.',
            ],
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'The Step-by-Step Claim Roadmap',
        steps: [
          {
            title: 'Document the Damage and Protect the Property',
            description:
              'Once the severe weather has passed and it is safe, take photos or videos of visible damage from the ground (e.g., shingles in the yard, ceiling stains). If water is entering the home, take reasonable steps to prevent further interior damage and save all receipts for protective materials. Never climb onto a wet or damaged roof yourself.',
            icon: 'tabler:camera',
          },
          {
            title: 'Contact Your Insurance Carrier',
            description:
              "Review your policy's claim procedures and contact your agent to report the damage. They will explain their required information, deductible rules, and deadlines. Provide them with factual information about what you observed.",
            icon: 'tabler:phone',
          },
          {
            title: 'Property Evaluation (Adjuster and Contractor)',
            description:
              'Your insurance carrier will likely assign an adjuster to inspect the property to evaluate the financial loss. Separately, R&C evaluates the roofing system as a contractor. Robert Pilato (Certification #201408313) brings specialized HAAG-certified training to document displaced materials, flashing failures, and impact zones that an adjuster might miss.',
            icon: 'tabler:search',
          },
          {
            title: "Review the Carrier's Decision and Scope",
            description:
              'After reviewing the claim, your carrier will provide their decision and approved payout. We will separately explain the roofing work we believe is necessary based on the physical facts. If the scopes match, the project moves directly into scheduling. If the scopes differ, we provide additional contractor-side documentation to help you explain to your carrier why further structural work is required to properly fix the home.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Complete the Roofing Work',
            description:
              'Once the project is approved and you select R&C (Hawaii License C-33642), we execute the agreed-upon repair or replacement according to Hawaii building standards.',
            icon: 'tabler:hammer',
          },
        ],
      },
      {
        _type: 'checklistSection',
        heading: 'The Claim Documentation Checklist',
        intro:
          'Keeping your records organized makes it much easier to track what happened throughout the process. Your carrier may require specific documents, but you should generally keep copies of:',
        items: [
          'Photos and videos taken immediately after the damage.',
          'Your official claim number and written carrier communications.',
          'Carrier estimates or scope documents.',
          'R&C inspection photos and structural findings.',
          'Receipts for any temporary protective measures (tarps, buckets, etc.).',
          'Final signed roofing contracts and invoices.',
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Common Roadblocks',
        layout: 'grid',
        items: [
          {
            title: 'What If Additional Damage Is Found During Construction?',
            description:
              'Sometimes hidden rot or structural issues only become visible after we remove the old materials. If this happens, we document the new condition immediately. You must then contact your carrier to review the new findings—never assume additional work is automatically covered.',
            icon: 'tabler:alert-triangle',
          },
          {
            title: 'What If Your Claim Is Denied or Underpaid?',
            description:
              'Start by carefully reviewing your carrier’s written explanation. We can provide additional contractor-side documentation regarding the physical facts, but we cannot overturn a denial, interpret your policy, or act as a public adjuster to negotiate on your behalf.',
            icon: 'tabler:file-alert',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Claim Resources',
        intro: 'If you hit a specific roadblock or need to start the process, review our dedicated guides:',
        display: 'cards',
        items: [
          {
            title: 'Roof Insurance Claim Help',
            description: 'An overview of contractor support on Oahu.',
            href: '/claims',
            linkText: 'View Claim Help',
          },
          {
            title: 'Denied or Underpaid Claims',
            description: 'Steps to take if your carrier rejects coverage.',
            href: '/claims/denied-or-underpaid-claims',
            linkText: 'View Denied or Underpaid Claims',
          },
          {
            title: 'Storm Damage Inspections',
            description: 'Evaluate your roof after severe island weather.',
            href: '/roof-inspections/storm-and-wind-damage-inspection',
            linkText: 'View Storm Damage Inspections',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Need Help With the Roofing Side of Your Claim?',
      subtitle: 'Understand the true condition of your roofing system and the exact work that is needed before you move forward.',
      ctaText: 'Schedule a Roof Damage Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-denied-claims',
    title: 'Denied or Underpaid Claims',
    slug: 'claims/denied-or-underpaid-claims',
    meta: {
      title: 'Denied or Underpaid Roof Claims Hawaii | R&C Roofing',
      description:
        'If your Hawaii roof claim was denied or the approved scope does not match the roofing work needed, R&C can inspect the roof and provide contractor-side documentation.',
    },
    hero: {
      title: 'Denied or Underpaid Roof Insurance Claims on Oahu',
      subtitle:
        'When your insurance claim is denied or the approved payout does not cover the necessary repairs, you need clear physical facts to understand your next steps.',
      ctaText: 'Schedule a Roof Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Denied claim photo placeholder',
    },
    sections: [
      {
        _type: 'bulletCardsSection',
        heading: 'Understanding the Disagreement: Denied vs. Underpaid',
        intro: 'Not all insurance setbacks are the same. Identifying the exact point of conflict helps determine how to proceed.',
        items: [
          {
            title: 'If Your Claim Was Denied',
            items: [
              'Your carrier officially determined that the loss is not covered under your policy language.',
              "The denial document should explicitly state the carrier's reason for rejection.",
              'R&C can inspect the roof to document visible physical conditions, but challenging the legal decision requires your carrier or an insurance professional.',
            ],
          },
          {
            title: 'If Your Claim Was Underpaid / Approved Scope is Incomplete',
            items: [
              'Your carrier acknowledges the damage but has approved a lower payout or a smaller repair scope than what is required to actually fix the roof.',
              'Disagreements often arise over material types, hidden damage, or distinguishing between sudden storm impact and pre-existing wear.',
              'R&C can supply technical contractor estimates and photo documentation to explain why a broader scope of work is necessary.',
            ],
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Start With the Written Explanation',
        intro:
          'Before requesting another inspection, review the paperwork your carrier sent you. Look closely at the specific reasons they gave. Common friction points include:',
        layout: 'band',
        items: [
          {
            title: 'Existing Deterioration',
            description:
              'The carrier may claim the damage was caused by long-term aging or lack of maintenance rather than a specific weather event.',
            icon: 'tabler:clock',
          },
          {
            title: 'Previous Patchwork',
            description: 'Older repairs on the roof may lead an adjuster to question the origin of a new leak.',
            icon: 'tabler:layers-off',
          },
          {
            title: 'Differing Material Standards',
            description:
              "The carrier's estimate may assume basic repair materials where local island building conditions require a more comprehensive structural fix.",
            icon: 'tabler:ruler-measure',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Helps After a Denial',
        intro:
          'When you need a second look at the physical roof after a setback, our evaluation follows a focused, objective path:',
        steps: [
          {
            title: "Review the Carrier's Notes",
            description:
              'We look at your denial letter or initial estimate to understand the exact points the adjuster questioned or rejected.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Evaluate Accessible Areas',
            description:
              'Robert Pilato (Certification #201408313) uses specialized HAAG training to assess damage patterns and look for missed structural impacts.',
            icon: 'tabler:search',
          },
          {
            title: 'Document the Physical Reality',
            description:
              'We capture high-resolution photos and detailed notes showing the actual physical condition of your roofing components.',
            icon: 'tabler:camera',
          },
          {
            title: 'Provide Technical Scope',
            description:
              'If our findings support a more extensive repair or replacement, we provide a clean contractor estimate that you can submit back to your carrier for review.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Claim Resources',
        intro: 'Navigating a difficult insurance claim requires the right information at every stage:',
        display: 'cards',
        items: [
          {
            title: 'Roof Insurance Claim Help',
            description: 'Return to our main parent hub for an overview of claim support on Oahu.',
            href: '/claims',
            linkText: 'View Claim Help',
          },
          {
            title: 'How the Claim Process Works',
            description: 'Review our step-by-step guide to the standard roofing claim journey.',
            href: '/claims/how-the-claim-process-works',
            linkText: 'View the Claim Process',
          },
          {
            title: 'Storm Damage Inspections',
            description: 'Get a dedicated assessment of wind uplift and severe weather impacts.',
            href: '/roof-inspections/storm-and-wind-damage-inspection',
            linkText: 'View Storm Damage Inspections',
          },
        ],
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What should I do if my insurance claim was denied?',
          answer:
            "Start by reviewing the carrier's written explanation. If you need clarity on the physical condition of the roof itself, R&C can inspect the property and provide objective contractor-side findings.",
        },
        {
          question: 'Can R&C overturn a denied insurance claim?',
          answer:
            'No. We do not make insurance coverage decisions and cannot legally force a carrier to change their ruling. We simply provide the physical roof documentation.',
        },
        {
          question: 'What does it mean if the insurance estimate is lower than the contractor estimate?',
          answer:
            'This usually means the carrier and the contractor are using different scopes of work or project assumptions. We can explain what is required to fix your roof properly, but your carrier decides what costs they will cover.',
        },
        {
          question: 'Should I hire a public adjuster or an attorney?',
          answer:
            'R&C cannot advise you on legal representation or public adjusting. If you need help interpreting your policy or fighting a disputed denial, you should speak with a licensed insurance professional.',
        },
        {
          question: 'Can R&C complete the repairs if the claim gets reopened?',
          answer:
            'Yes. We operate under Hawaii Contractor License C-33642 and can execute the approved repair or full replacement once your project is cleared to move forward.',
        },
      ],
    },
    ctaBanner: {
      title: 'Get a Professional Second Look at Your Roof',
      subtitle: "Find out what the physical evidence shows before you respond to your insurance carrier's decision.",
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '/contact',
    },
  },
];
