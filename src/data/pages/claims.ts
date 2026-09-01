import { serviceHeroActions } from '~/data/pages/services';

export { serviceHeroActions };

export const claimHrefs = {
  hub: '/claims',
  process: '/claims/how-the-claim-process-works',
  denied: '/claims/denied-or-underpaid-claims',
  storm: '/roof-inspections/storm-and-wind-damage-inspection',
};

export const claimLinks = {
  hub: {
    title: 'Roof Insurance Claim Help',
    description: 'Return to our main parent hub for an overview of claim support on Oahu.',
    href: claimHrefs.hub,
    linkText: 'View Claim Help',
  },
  process: {
    title: 'How the Claim Process Works',
    description: 'Review our step-by-step guide to the standard roofing claim journey.',
    href: claimHrefs.process,
    linkText: 'View the Claim Process',
  },
  denied: {
    title: 'Denied or Underpaid Claims',
    description: 'Learn what to review if your carrier denies the claim or approves a limited scope.',
    href: claimHrefs.denied,
    linkText: 'View Denied or Underpaid Claims',
  },
  storm: {
    title: 'Storm Damage Inspections',
    description: 'Get a dedicated assessment of wind uplift and severe weather impacts.',
    href: claimHrefs.storm,
    linkText: 'View Storm Damage Inspections',
  },
};

export const hubClaimResources = [
  {
    title: 'The Claim Process',
    description: 'Follow the roofing side of the claim from initial inspection through final construction.',
    href: claimHrefs.process,
    linkText: 'View the Claim Process',
  },
  claimLinks.denied,
  {
    title: 'Storm Damage Inspections',
    description: 'Have your roof evaluated specifically for wind uplift and severe weather impacts.',
    href: claimHrefs.storm,
    linkText: 'View Storm Damage Inspections',
  },
];

export const processClaimResources = [
  {
    title: 'Roof Insurance Claim Help',
    description: 'An overview of contractor support on Oahu.',
    href: claimHrefs.hub,
    linkText: 'View Claim Help',
  },
  {
    title: 'Denied or Underpaid Claims',
    description: 'Steps to take if your carrier rejects coverage.',
    href: claimHrefs.denied,
    linkText: 'View Denied or Underpaid Claims',
  },
  {
    title: 'Storm Damage Inspections',
    description: 'Evaluate your roof after severe island weather.',
    href: claimHrefs.storm,
    linkText: 'View Storm Damage Inspections',
  },
];

export const deniedClaimResources = [claimLinks.hub, claimLinks.process, claimLinks.storm];
