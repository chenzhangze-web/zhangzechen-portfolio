import { defineCollection, z } from 'astro:content';

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titleZh: z.string(),
    titleEn: z.string(),
    organizationZh: z.string(),
    organizationEn: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable().default(null),
    descriptionZh: z.string(),
    descriptionEn: z.string(),
    tagsZh: z.array(z.string()).default([]),
    tagsEn: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titleZh: z.string(),
    titleEn: z.string(),
    authors: z.array(z.string()),
    journalZh: z.string(),
    journalEn: z.string(),
    year: z.string(),
    category: z.string(),
    descriptionZh: z.string(),
    descriptionEn: z.string(),
    tagsZh: z.array(z.string()).default([]),
    tagsEn: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    authorPosition: z.enum(['first', 'second', 'coauthor']),
    totalAuthors: z.number().default(0),
    order: z.number(),
    image: z.string().nullable().default(null),
  }),
});

const honorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titleZh: z.string(),
    titleEn: z.string(),
    awardZh: z.string(),
    awardEn: z.string(),
    year: z.string(),
    category: z.enum(['competition', 'scholarship', 'service', 'patent']),
    projectZh: z.string().nullable().default(null),
    projectEn: z.string().nullable().default(null),
    ranking: z.string().nullable().default(null),
    descriptionZh: z.string(),
    descriptionEn: z.string(),
    order: z.number(),
  }),
});

const certificationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(),
    expiryDate: z.string().nullable().default(null),
    credentialId: z.string().nullable().default(null),
    badgeUrl: z.string().nullable().default(null),
    verifyUrl: z.string().nullable().default(null),
    order: z.number(),
  }),
});

export const collections = {
  experience: experienceCollection,
  publications: publicationsCollection,
  honors: honorsCollection,
  certifications: certificationsCollection,
};
