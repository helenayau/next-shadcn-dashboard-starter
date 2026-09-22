/**
 * Everything the two "How can we help you today?" prototypes share: the four
 * retirement paths, the three paces, and where each one leads. The carousel
 * and the list both read from here so only the layout differs between them.
 */

export const stages = {
  navy: '#001F45',
  pageBg: '#E2F4FF',
  blue: '#0066CC',
  teal: '#007A78',
  cardBorder: '#7ECAF2'
} as const;

/** The real Prudential "Access your personal accounts" sign-in page. */
export const PRUDENTIAL_LOGIN_URL = 'https://www.prudential.com/login';

export const ADVISOR_PATH = '/stages-onboarding/connect-with-advisor';

export type PathId = 'planning' | 'retired' | 'existing' | 'open-account';
export type PaceId = 'quick' | 'complete' | 'advisor';

export type RetirementPath = {
  id: PathId;
  /** Copy as it appears on the list view. */
  listTitle: string;
  listDescription: string;
  /** Copy as it appears on the carousel slide (the mockups word a few differently). */
  carouselTitle: string;
  carouselDescription: string;
  image: { src: string; width: number; height: number };
};

export const retirementPaths: RetirementPath[] = [
  {
    id: 'planning',
    listTitle: 'I’m planning ahead',
    listDescription: 'See if you’re on track to retire your way.',
    carouselTitle: 'I’m planning ahead',
    carouselDescription: 'See if you’re on track for your retirement goals.',
    image: { src: '/stages-onboarding/planning-ahead.png', width: 174, height: 149 }
  },
  {
    id: 'retired',
    listTitle: 'I’m already retired.',
    listDescription: 'Get a clear picture of your current savings.',
    carouselTitle: 'I’m already retired',
    carouselDescription: 'Get a clear picture of your current savings.',
    image: { src: '/stages-onboarding/already-retired.png', width: 276, height: 152 }
  },
  {
    id: 'existing',
    listTitle: 'I’m an existing customer',
    listDescription: 'Sign in to view and manage your accounts.',
    carouselTitle: 'I’m an existing customer',
    carouselDescription: 'Sign in to view and manage your accounts.',
    image: { src: '/stages-onboarding/existing-customer.png', width: 207, height: 157 }
  },
  {
    id: 'open-account',
    listTitle: 'I want to open an account',
    listDescription: 'Buy life insurance or open an investment account.',
    carouselTitle: 'I want to open an account',
    carouselDescription: 'Buy life insurance or open an investment account.',
    image: { src: '/stages-onboarding/open-an-account.png', width: 275, height: 171 }
  }
];

export const paces: { id: PaceId; title: string; description: string }[] = [
  {
    id: 'quick',
    title: 'Quick onboarding',
    description: 'Answer a few questions for a quick snapshot.'
  },
  {
    id: 'complete',
    title: 'Complete onboarding',
    description: 'Answer detailed questions for a comprehensive view.'
  },
  {
    id: 'advisor',
    title: 'Connect with an advisor',
    description: 'Get one-on-one help with your next steps.'
  }
];

/** Only these two paths go on to "Now, choose your pace." */
export function needsPace(path: PathId | null) {
  return path === 'planning' || path === 'retired';
}

/** Where a path goes when it skips the pace question. */
export function pathDestination(path: 'existing' | 'open-account') {
  return path === 'existing' ? PRUDENTIAL_LOGIN_URL : ADVISOR_PATH;
}

export function paceDestination(pace: PaceId) {
  return pace === 'advisor' ? ADVISOR_PATH : `/stages-onboarding/${pace}-onboarding`;
}
