import { serviceHeroActions } from '~/data/pages/services';

export { serviceHeroActions };

export const problemHrefs = {
  leak: '/roof-problems/my-roof-is-leaking',
  storm: '/roof-problems/storm-damage-on-my-roof',
  eol: '/roof-problems/my-roof-is-at-end-of-life',
  denied: '/roof-problems/my-insurance-claim-was-denied',
  buy: '/roof-problems/buying-or-selling-a-home',
  hurricane: '/roof-problems/preparing-for-hurricane-season',
};

const leak = {
  title: 'My Roof Is Leaking',
  href: problemHrefs.leak,
  linkText: 'View Leak Help',
};

const storm = {
  title: 'Storm Damage on My Roof',
  href: problemHrefs.storm,
  linkText: 'View Storm Damage Help',
};

const eol = {
  title: 'My Roof Is at End of Life',
  href: problemHrefs.eol,
  linkText: 'View End-of-Life Help',
};

const denied = {
  title: 'My Insurance Claim Was Denied',
  href: problemHrefs.denied,
  linkText: 'View Denied Claim Help',
};

const buy = {
  title: 'Buying or Selling a Home',
  href: problemHrefs.buy,
  linkText: 'View Real Estate Roof Help',
};

const hurricane = {
  title: 'Preparing for Hurricane Season',
  href: problemHrefs.hurricane,
  linkText: 'View Hurricane Prep',
};

export const exploreFromLeak = [
  {
    ...storm,
    description:
      'For leaks or structural damage that appeared immediately following severe weather or high wind gusts.',
  },
  {
    ...eol,
    description: 'For roofs experiencing recurring leaks or widespread age-related deterioration.',
  },
  {
    ...denied,
    description: 'For property owners needing professional contractor documentation following a denied claim.',
  },
  {
    ...buy,
    description: 'For urgent roof evaluations, certifications, or repairs needed during real estate transactions.',
  },
  {
    ...hurricane,
    description: 'For proactive reinforcement and wind-mitigation checks before severe tropical weather arrives.',
  },
];

export const exploreFromStorm = [
  {
    ...leak,
    description: 'For active ceiling drips, water stains, or moisture intrusion requiring immediate investigation.',
  },
  {
    ...eol,
    description: 'For older roofs experiencing widespread deterioration and recurring maintenance challenges.',
  },
  {
    ...denied,
    description: 'For property owners needing professional contractor documentation following a denied claim.',
  },
  {
    ...buy,
    description: 'For urgent roof evaluations, certifications, or repairs needed during real estate transactions.',
  },
  {
    ...hurricane,
    description: 'For proactive reinforcement and wind-mitigation checks before severe tropical weather arrives.',
  },
];

export const exploreFromEol = [
  {
    ...leak,
    description: 'For active ceiling drips, water stains, or moisture intrusion requiring immediate investigation.',
  },
  {
    ...storm,
    description:
      'For structural damage, missing materials, or leaks that appeared immediately following severe weather.',
  },
  {
    ...denied,
    description: 'For property owners needing professional contractor documentation following a denied claim.',
  },
  {
    ...buy,
    description: 'For urgent roof evaluations, certifications, or repairs needed during real estate transactions.',
  },
  {
    ...hurricane,
    description: 'For proactive reinforcement and wind-mitigation checks before severe tropical weather arrives.',
  },
];

export const exploreFromDenied = [
  {
    ...leak,
    description: 'For active ceiling drips, water stains, or moisture intrusion requiring immediate investigation.',
  },
  {
    ...storm,
    description:
      'For structural damage, missing materials, or leaks that appeared immediately following severe weather.',
  },
  {
    ...eol,
    description: 'For older roofs experiencing widespread deterioration and recurring maintenance challenges.',
  },
  {
    ...buy,
    description: 'For urgent roof evaluations, certifications, or repairs needed during real estate transactions.',
  },
  {
    ...hurricane,
    description: 'For proactive reinforcement and wind-mitigation checks before severe tropical weather arrives.',
  },
];

export const exploreFromBuy = [
  {
    ...leak,
    description: 'For active ceiling drips, water stains, or moisture intrusion requiring immediate investigation.',
  },
  {
    ...storm,
    description:
      'For structural damage, missing materials, or leaks that appeared immediately following severe weather.',
  },
  {
    ...eol,
    description: 'For older roofs experiencing widespread deterioration and recurring maintenance challenges.',
  },
  {
    ...denied,
    description: 'For property owners needing professional contractor documentation following a denied claim.',
  },
  {
    ...hurricane,
    description: 'For proactive reinforcement and wind-mitigation checks before severe tropical weather arrives.',
  },
];

export const exploreFromHurricane = [
  {
    ...leak,
    description: 'For active ceiling drips, water stains, or moisture intrusion requiring immediate investigation.',
  },
  {
    ...storm,
    description:
      'For structural damage, missing materials, or leaks that appeared immediately following severe weather.',
  },
  {
    ...eol,
    description: 'For older roofs experiencing widespread deterioration and recurring maintenance challenges.',
  },
  {
    ...denied,
    description: 'For property owners needing professional contractor documentation following a denied claim.',
  },
  {
    ...buy,
    description: 'For urgent roof evaluations or certifications needed during real estate transactions.',
  },
];
