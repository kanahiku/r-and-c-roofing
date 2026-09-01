// Singletons
import { siteNavigation } from './singletons/navigation';
import { siteFooter } from './singletons/footer';
import { homePage } from './singletons/homePage';
import { lead } from './documents/lead';

// Navigation objects
import { navLink, navSubLink } from './objects/navLink';
import { footerColumn, footerLink, socialLink } from './objects/footerColumn';

// Homepage section objects
import {
  statItem,
  infoCardItem,
  serviceItem,
  timelineStep,
  faqItem,
} from './objects/homeObjects';

export const schemaTypes = [
  // Documents (singletons)
  siteNavigation,
  siteFooter,
  homePage,
  lead,

  // Objects — nav
  navLink,
  navSubLink,

  // Objects — footer
  footerColumn,
  footerLink,
  socialLink,

  // Objects — homepage sections
  statItem,
  infoCardItem,
  serviceItem,
  timelineStep,
  faqItem,
];
