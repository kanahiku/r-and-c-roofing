import type { HomePageContent, NavigationContent } from './types';
import { getSanityHomeContent, getSanityNavigationContent } from './sanity';

export async function getHomeContent(): Promise<HomePageContent> {
  const page = await getSanityHomeContent();
  if (!page) {
    throw new Error('Sanity homePage document is missing (singleton-home).');
  }
  return page;
}

export async function getNavigationContent(): Promise<NavigationContent> {
  const nav = await getSanityNavigationContent();
  if (!nav?.header || !nav?.footer) {
    throw new Error('Sanity navigation or footer document is missing.');
  }
  return nav;
}

export type { HomePageContent, NavigationContent };
