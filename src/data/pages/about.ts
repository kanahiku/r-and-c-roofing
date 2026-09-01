import { serviceHeroActions } from '~/data/pages/services';
import {
  yelpHerman,
  yelpLeonard,
  yelpNancy,
  yelpRonald,
  yelpWunShen,
} from '~/data/pages/whoWeServe';

export { serviceHeroActions, yelpHerman, yelpLeonard, yelpNancy, yelpRonald, yelpWunShen };

export const aboutHrefs = {
  story: '/about/our-story',
  gallery: '/about/gallery',
  reviews: '/reviews',
  inspections: '/roof-inspections',
  haag: '/roof-inspections/haag-certified-inspection',
  storm: '/roof-inspections/storm-and-wind-damage-inspection',
  claims: '/claims',
  repair: '/services/roof-repair',
  replacement: '/services/roof-replacement-and-new-installation',
  residential: '/services/residential-roofing',
  commercial: '/services/commercial-roofing',
};

const yelpBiz = 'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu';
const googleReviews = 'https://www.google.com/search?q=R%26C+Roofing+Contractors+Honolulu';
const bbbProfile =
  'https://www.bbb.org/us/hi/honolulu/profile/roofing-contractors/rc-enterprises-llc-1296-53047152';

export const reviewPlatforms = [
  {
    title: 'Google',
    ratingNote: 'Current Google rating and review count are shown on the live profile.',
    href: googleReviews,
    linkText: 'Read Reviews on Google',
    icon: 'tabler:brand-google',
  },
  {
    title: 'Yelp',
    ratingNote: 'Current Yelp rating and review count are shown on the live profile.',
    href: yelpBiz,
    linkText: 'Read Reviews on Yelp',
    icon: 'tabler:star',
  },
  {
    title: 'BBB',
    ratingNote: 'Current BBB profile and rating information are shown on the live listing.',
    href: bbbProfile,
    linkText: 'View R&C on BBB',
    icon: 'tabler:shield-check',
  },
];

export const featuredYelpReviews = [
  {
    name: 'Leonard C.',
    source: 'Yelp',
    originalUrl: `${yelpBiz}?hrid=tJpKSMVE38r5vgt6OPfl9w`,
    embed: yelpLeonard,
  },
  {
    name: 'Wun Shen C.',
    source: 'Yelp',
    originalUrl: `${yelpBiz}?hrid=rbOBv4trTZYAGJhsCl6FTg`,
    embed: yelpWunShen,
  },
  {
    name: 'Herman Y.',
    source: 'Yelp',
    originalUrl: `${yelpBiz}?hrid=cuFBoA_QIJoI59bmAyuDrg`,
    embed: yelpHerman,
  },
  {
    name: 'Ronald C.',
    source: 'Yelp',
    originalUrl: `${yelpBiz}?hrid=wfK95mJOJuhlnDWT6027ow`,
    embed: yelpRonald,
  },
  {
    name: 'Nancy M.',
    source: 'Yelp',
    originalUrl: `${yelpBiz}?hrid=FB6iD9eGHe6Z2DRhu3Szgw`,
    embed: yelpNancy,
  },
];

export const verifiedQuotes = [
  {
    name: 'Karen Miyaki',
    source: 'Customer review',
    quote: 'Matt was excellent with his services and follow-up. Workers were great. Thank you.',
    originalUrl: googleReviews,
  },
  {
    name: 'Erlinda',
    source: 'Customer review',
    quote: 'James is very knowledgeable and does a good job. Go team!',
    originalUrl: googleReviews,
  },
  {
    name: 'Robert Thomason',
    source: 'Customer review',
    quote:
      'Robert @ R & C Roofing along with his crew were very professional when repairing and recoating our companies roof. Robert was very responsive regarding any communication and needs.',
    originalUrl: googleReviews,
  },
  {
    name: 'Glen Nishiyama',
    source: 'Customer review',
    quote: "It's been a few months since the roofing was done and it is holding up well.",
    originalUrl: googleReviews,
  },
  {
    name: 'Charles & Helen Haiola',
    source: 'Customer review',
    quote:
      'From first contact... to project completion, perfect timing, and professional supervision with a big crew, the installation was professionally done to our expectations.',
    originalUrl: googleReviews,
  },
];
