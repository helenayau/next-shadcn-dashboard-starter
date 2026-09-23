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

/** "You’ve reached the end!" — where both versions' pace step lands. */
export const FINISHED_PATH = '/stages-onboarding/finished';

export type PathId = 'planning' | 'retired' | 'existing' | 'open-account';
export type PaceId = 'quick' | 'complete' | 'advisor';

export type SlideImage = {
  src: string;
  width: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
};

export type RetirementPath = {
  id: PathId;
  /** Copy as it appears on the list view. */
  listTitle: string;
  listDescription: string;
  /** Copy as it appears on the carousel slide (the mockups word a few differently). */
  carouselTitle: string;
  carouselDescription: string;
  /** The on-card size h approved for each illustration. The artwork is
   *  fitted inside it without stretching. */
  image: SlideImage;
};

export const retirementPaths: RetirementPath[] = [
  {
    id: 'planning',
    listTitle: 'I’m planning ahead',
    listDescription: 'See if you’re on track to retire your way.',
    carouselTitle: 'I’m planning ahead',
    carouselDescription: 'See if you’re on track for your retirement goals.',
    image: {
      src: '/stages-onboarding/planning-ahead.png',
      width: 741,
      height: 624,
      displayWidth: 242,
      displayHeight: 208
    }
  },
  {
    id: 'retired',
    listTitle: 'I’m already retired',
    listDescription: 'Get a clear picture of your current savings.',
    carouselTitle: 'I’m already retired',
    carouselDescription: 'Get a clear picture of your current savings.',
    image: {
      src: '/stages-onboarding/already-retired.png',
      width: 921,
      height: 498,
      displayWidth: 300,
      displayHeight: 166
    }
  },
  {
    id: 'existing',
    listTitle: 'I’m an existing customer',
    listDescription: 'Sign in to view and manage your accounts.',
    carouselTitle: 'I’m an existing customer',
    carouselDescription: 'Sign in to view and manage your accounts.',
    image: {
      src: '/stages-onboarding/existing-customer.png',
      width: 717,
      height: 531,
      displayWidth: 233,
      displayHeight: 177
    }
  },
  {
    id: 'open-account',
    listTitle: 'I want to open an account',
    listDescription: 'Buy life insurance or open an investment account.',
    carouselTitle: 'I want to open an account',
    carouselDescription: 'Buy life insurance or open an investment account.',
    image: {
      src: '/stages-onboarding/open-an-account.png',
      width: 867,
      height: 531,
      displayWidth: 284,
      displayHeight: 177
    }
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

/** The carousel's pace step: two slides, per h's 2026-09-23 mockup. */
export const carouselPaces: {
  id: Exclude<PaceId, 'advisor'>;
  title: string;
  description: string;
  image: SlideImage;
}[] = [
  {
    id: 'quick',
    title: 'Quick onboarding',
    description: 'Answer a few questions for a quick snapshot.',
    image: {
      src: '/stages-onboarding/quick-onboarding.png',
      width: 726,
      height: 546,
      displayWidth: 241,
      displayHeight: 182
    }
  },
  {
    id: 'complete',
    title: 'Complete onboarding',
    description: 'Answer detailed questions for a comprehensive view.',
    image: {
      src: '/stages-onboarding/complete-onboarding.png',
      width: 753,
      height: 516,
      displayWidth: 251,
      displayHeight: 172
    }
  }
];

/** Only these two paths go on to "Now, choose your pace." */
export function needsPace(path: PathId | null) {
  return path === 'planning' || path === 'retired';
}
