import { getReviewProviderConfig } from './config';
import type { Review } from './types';

/** Used when a provider has no API key yet, so review cards still render. */
export function getFallbackReviews(): Review[] {
  const googleUrl = getReviewProviderConfig('google').viewAllUrl;
  const yelpUrl = getReviewProviderConfig('yelp').viewAllUrl;

  return [
    {
      id: 'fallback-google-karen',
      authorName: 'Karen Miyaki',
      text: 'Matt was excellent with his services and follow-up. Workers were great. Thank you.',
      rating: 5,
      date: '',
      source: 'google',
      sourceUrl: googleUrl,
    },
    {
      id: 'fallback-google-erlinda',
      authorName: 'Erlinda',
      text: 'James is very knowledgeable and does a good job. Go team!',
      rating: 5,
      date: '',
      source: 'google',
      sourceUrl: googleUrl,
    },
    {
      id: 'fallback-google-robert',
      authorName: 'Robert Thomason',
      text: 'Robert @ R & C Roofing along with his crew were very professional when repairing and recoating our companies roof. Robert was very responsive regarding any communication and needs.',
      rating: 5,
      date: '',
      source: 'google',
      sourceUrl: googleUrl,
    },
    {
      id: 'fallback-yelp-leonard',
      authorName: 'Leonard C.',
      text: 'I needed roofing done where my rooftop solar hot water system was located (lasted over 20 yrs) & before a new one could be installed. Unfortunately, many other roofs in the state needed work…',
      rating: 5,
      date: '2026-07-28',
      source: 'yelp',
      sourceUrl: `${yelpUrl}?hrid=tJpKSMVE38r5vgt6OPfl9w`,
    },
    {
      id: 'fallback-yelp-wunshen',
      authorName: 'Wun Shen C.',
      text: 'Robert P. helped us with our roof inspection and replacement proposal. Everything was very clear and descriptive without having to ask for too much additional info. His pricing was reasonable…',
      rating: 5,
      date: '2026-06-03',
      source: 'yelp',
      sourceUrl: `${yelpUrl}?hrid=rbOBv4trTZYAGJhsCl6FTg`,
    },
    {
      id: 'fallback-yelp-herman',
      authorName: 'Herman Y.',
      text: 'Excellent work! Customer service is excellent! They schedule with you for an initial inspection and go through in details what needs to be done. We needed the roof replaced due to it being over 20…',
      rating: 5,
      date: '2026-01-10',
      source: 'yelp',
      sourceUrl: `${yelpUrl}?hrid=cuFBoA_QIJoI59bmAyuDrg`,
    },
  ];
}
