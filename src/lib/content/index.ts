import type { HomePageContent, NavigationContent } from './types';

const isSanity = import.meta.env.CONTENT_SOURCE === 'sanity';

export async function getHomeContent(): Promise<HomePageContent> {
  if (isSanity) {
    const { getSanityHomeContent } = await import('./sanity');
    return getSanityHomeContent();
  }
  const { getLocalHomeContent } = await import('./local');
  return getLocalHomeContent();
}

export async function getNavigationContent(): Promise<NavigationContent> {
  if (isSanity) {
    const { getSanityNavigationContent } = await import('./sanity');
    return getSanityNavigationContent();
  }
  const { getLocalNavigationContent } = await import('./local');
  return getLocalNavigationContent();
}

export type { HomePageContent, NavigationContent };
