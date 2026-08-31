// Singletons
import { siteNavigation } from './singletons/navigation';
import { siteFooter } from './singletons/footer';
import { homePage } from './singletons/homePage';

// Navigation objects
import { navLink, navSubLink } from './objects/navLink';
import { footerColumn, footerLink, socialLink } from './objects/footerColumn';

// Homepage section objects
import {
  statItem,
  infoCardItem,
  serviceItem,
  benefitItem,
  timelineStep,
  projectItem,
  testimonialItem,
  serviceArea,
  faqItem,
} from './objects/homeObjects';

export const schemaTypes = [
  // Documents (singletons)
  siteNavigation,
  siteFooter,
  homePage,

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
  benefitItem,
  timelineStep,
  projectItem,
  testimonialItem,
  serviceArea,
  faqItem,
];
