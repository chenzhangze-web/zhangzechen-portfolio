export interface NavItem {
  labelZh: string;
  labelEn: string;
  sectionId: string;
  icon: string;
}

export interface ExperienceEntry {
  slug: string;
  titleZh: string;
  titleEn: string;
  organizationZh: string;
  organizationEn: string;
  startDate: string;
  endDate: string | null;
  descriptionZh: string;
  descriptionEn: string;
  tagsZh: string[];
  tagsEn: string[];
  order: number;
}

export interface PublicationEntry {
  slug: string;
  titleZh: string;
  titleEn: string;
  authors: string[];
  journalZh: string;
  journalEn: string;
  year: string;
  category: string;
  tagsZh: string[];
  tagsEn: string[];
  links: { label: string; url: string }[];
  authorPosition: 'first' | 'second' | 'coauthor';
  totalAuthors: number;
  order: number;
  descriptionZh: string;
  descriptionEn: string;
  image: string | null;
}

export interface HonorEntry {
  slug: string;
  titleZh: string;
  titleEn: string;
  awardZh: string;
  awardEn: string;
  year: string;
  category: 'competition' | 'scholarship' | 'service' | 'patent';
  projectZh: string | null;
  projectEn: string | null;
  ranking: string | null;
  descriptionZh: string;
  descriptionEn: string;
  order: number;
}

export interface CertEntry {
  slug: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
  badgeUrl: string | null;
  verifyUrl: string | null;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelZh: '关于我', labelEn: 'About', sectionId: 'about', icon: 'user' },
  { labelZh: '科研经历', labelEn: 'Experience', sectionId: 'experience', icon: 'briefcase' },
  { labelZh: '论文', labelEn: 'Publications', sectionId: 'publications', icon: 'file-text' },
  { labelZh: 'PRISM', labelEn: 'PRISM', sectionId: 'prism', icon: 'play' },
  { labelZh: '荣誉', labelEn: 'Honors', sectionId: 'honors', icon: 'award' },
  { labelZh: '联系', labelEn: 'Contact', sectionId: 'contact', icon: 'mail' },
];
