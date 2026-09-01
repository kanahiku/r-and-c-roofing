import { serviceHeroActions } from '~/data/pages/services';

export { serviceHeroActions };

export const audienceHrefs = {
  homeowners: '/who-we-serve/homeowners',
  pm: '/who-we-serve/property-managers-aoao-hoa-boards',
  gc: '/who-we-serve/general-contractors',
  architects: '/who-we-serve/architects-and-specifiers',
  trustees: '/who-we-serve/trustees-and-estate-managers',
};

const homeowners = {
  title: 'Homeowners',
  href: audienceHrefs.homeowners,
  linkText: 'Explore Homeowners',
  description: 'For residential property owners managing single-family roofing repairs, replacements, or insurance claims.',
};

const pm = {
  title: 'Property Managers & AOAO / HOA Boards',
  href: audienceHrefs.pm,
  linkText: 'Explore Property Managers',
  description: 'For multi-family communities, condominium boards, and shared association roofing requirements.',
};

const gc = {
  title: 'General Contractors',
  href: audienceHrefs.gc,
  linkText: 'Explore General Contractors',
  description: 'For construction partners needing reliable subcontractor roofing execution and scheduling.',
};

const architects = {
  title: 'Architects & Specifiers',
  href: audienceHrefs.architects,
  linkText: 'Explore Architects & Specifiers',
  description: 'For design professionals requiring technical compliance, material specs, and constructibility guidance.',
};

const trustees = {
  title: 'Trustees & Estate Managers',
  href: audienceHrefs.trustees,
  linkText: 'Explore Trustees & Estate Managers',
  description: 'For estate representatives managing property compliance, maintenance history, or pre-sale evaluations.',
};

export const exploreFromHomeowners = [pm, gc, architects, trustees];
export const exploreFromPm = [homeowners, trustees, gc, architects];
export const exploreFromGc = [homeowners, pm, trustees, architects];
export const exploreFromArchitects = [homeowners, pm, trustees, gc];
export const exploreFromTrustees = [homeowners, pm, gc, architects];

export function yelpEmbed(reviewId: string, userId: string, name: string) {
  return `<span class="yelp-review" data-review-id="${reviewId}" data-hostname="www.yelp.com">Read <a href="https://www.yelp.com/user_details?userid=${userId}" rel="nofollow noopener">${name}</a>'s <a href="https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu?hrid=${reviewId}" rel="nofollow noopener">review</a> of <a href="https://www.yelp.com/biz/2YU-fBK6jEfW12MP_E_r6g" rel="nofollow noopener">R &amp; C Roofing Contractors</a> on <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a><script src="https://www.yelp.com/embed/widgets.js" type="text/javascript" async><\/script></span>`;
}

export const yelpLeonard = yelpEmbed('tJpKSMVE38r5vgt6OPfl9w', 'DOM9kbe2GdVY0Pi3eCWdrw', 'Leonard C.');
export const yelpWunShen = yelpEmbed('rbOBv4trTZYAGJhsCl6FTg', 'qw4T_OIPZPZjgSndn47tRg', 'Wun Shen C.');
export const yelpHerman = yelpEmbed('cuFBoA_QIJoI59bmAyuDrg', 'SW5560TYBu1fHCisx3wHWA', 'Herman Y.');
export const yelpRonald = yelpEmbed('wfK95mJOJuhlnDWT6027ow', 'RiSfA-nw1ngEY_q6tzwoQA', 'Ronald C.');
export const yelpNancy = yelpEmbed('FB6iD9eGHe6Z2DRhu3Szgw', 'jKtqiGp_z46RAmwxolPp7Q', 'Nancy M.');
