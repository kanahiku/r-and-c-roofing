import type { HomePageContent, NavigationContent } from './types';

export async function getLocalHomeContent(): Promise<HomePageContent> {
  const { homePageData } = await import('../../data/pages/home');
  return homePageData;
}

export async function getLocalNavigationContent(): Promise<NavigationContent> {
  const { navigationData } = await import('../../data/navigation');
  return navigationData;
}
