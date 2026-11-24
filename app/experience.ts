// Erin's experience, for the Profile page's Experience section. Most recent
// first; each entry becomes an ExperienceItem, in this order.
//
// To add a role, add an entry at the right place in the list. Write the dates
// as they should show, with an en dash between them (“Jan 2024 – Sep 2026”);
// a current role ends in “Present.” A description is one paragraph (a string)
// or several (a list of strings).
//
// The copy matches the Experience section in the site's Figma file (Profile).

export interface Experience {
  /** The company, or “Freelance” */
  company: string;
  /** The role, or the kind of work for freelance */
  title: string;
  /** “Mon YYYY – Mon YYYY”, with an en dash */
  dates: string;
  /** One paragraph, or a list of paragraphs */
  description: string | string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'Laguna',
    title: 'Head of Design',
    dates: 'Jan 2024 – Sep 2026',
    description: [
      'Laguna helps care teams use AI to cut admin work and reach more health plan members. I led product and marketing design, from research to shipped work. We launched an AI copilot for case managers, an AI-powered dashboard for supervisors, and a new marketing website.',
      'Laguna Insight, the supervisor dashboard, was named one of TIME’s Best Inventions of 2024. At a large health plan, the copilot cut post-call documentation time by 66%. Laguna was acquired by Elligint Health in November 2026.',
    ],
  },
  {
    company: 'Abilico',
    title: 'Head of Design',
    dates: 'Mar 2023 – Jan 2024',
    description:
      'Abilico makes it simpler for patients and providers to order complex compression products. I worked closely with the founder to design the ordering portal, and created the brand’s original artwork and guidelines for marketing materials.',
  },
  {
    company: 'Navio',
    title: 'Head of Design',
    dates: 'Oct 2019 – Dec 2022',
    description:
      'Navio helped people with brain cancer understand and follow their treatment plans. I designed the complete product experience for patients and providers, along with Navio’s original artwork and brand guidelines. The company grew out of the founder’s experience with glioblastoma, and I was honored to interview people going through it for their insights.',
  },
  {
    company: 'Vim',
    title: 'Design Director',
    dates: 'Jul 2015 – Oct 2019',
    description:
      'Vim began by steering health plan members to high-quality, lower-cost care, and added more as value-based care became more widely adopted. It was my first healthcare company. I named Vim when we rebranded from BookMD, and I built its design system for product, marketing, and sales.',
  },
  {
    company: 'Freelance',
    title: 'Brand, web, and app design',
    dates: 'Sep 2013 – Jul 2015',
    description:
      'I took on my own clients and traveled around Europe with my husband. It was an incredible time, and I learned a lot about running a business.',
  },
  {
    company: 'Magento',
    title: 'Senior Designer → Design Manager',
    dates: 'Dec 2010 – Sep 2013',
    description:
      'Magento is an ecommerce platform that was acquired by eBay and later Adobe. I was its first full-time designer, and this is where I learned design leadership and product design. I redesigned the platform’s UI, designed a no-code site builder, and led the website and marketing for the Magento Go launch and the Imagine conference in 2011 and 2012.',
  },
  {
    company: 'Executionists',
    title: 'Art Director',
    dates: 'Sep 2007 – Nov 2010',
    description:
      'Executionists was my first job as a designer after teaching myself the basics. I worked with clients across lots of industries, including Coffee Bean, Disney, Intel, LADWP, Neuro, the Oprah Store, and Period Paper. I cut my teeth here and learned what UX meant ;)',
  },
  {
    company: 'Freelance',
    title: 'Web design',
    dates: 'Aug 2004 – Sep 2007',
    description:
      'While I was in Los Angeles working at the American Film Institute, I discovered the job I really wanted. I taught myself to make websites, relying on the kindness of developers on the internet, and supported myself while I learned the business of design.',
  },
];
