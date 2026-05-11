import type { GlobalConfig } from 'payload'
import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Control the hero section and call-to-action content on the home page.',
    group: 'Site Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero Badge',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          defaultValue: 'Culturally Responsive Health Literacy',
          localized: true,
          admin: { description: 'Text inside the small pill badge above the main heading.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hero Heading',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'headingStart',
          type: 'text',
          defaultValue: 'Helping newcomers',
          localized: true,
          admin: { description: 'Text BEFORE the highlighted (blue) portion of the heading.' },
        },
        {
          name: 'headingHighlight',
          type: 'text',
          defaultValue: 'navigate healthcare',
          localized: true,
          admin: {
            description: 'The highlighted (blue) portion of the heading.',
          },
        },
        {
          name: 'headingEnd',
          type: 'text',
          defaultValue: 'and safety in Canada.',
          localized: true,
          admin: { description: 'Text AFTER the highlighted portion.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hero Body',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'Access health services, understand lab results, improve wellness, and find trusted support - in your language.',
          localized: true,
          admin: { description: 'Paragraph text below the main heading.' },
        },
        {
          name: 'footerNote',
          type: 'text',
          defaultValue: 'Free · Multilingual · Trusted by immigrants, students & newcomers',
          localized: true,
          admin: { description: 'Small note below the CTA buttons.' },
        },
        {
          name: 'canadianBadgeText',
          type: 'text',
          defaultValue: '🍁 Canada-focused health guidance',
          localized: true,
          admin: { description: 'Text in the small badge at the bottom-right of the hero.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Call-to-Action Buttons',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'primaryCTALabel',
          type: 'text',
          defaultValue: 'Explore Health Topics',
          localized: true,
          admin: { description: 'Label for the primary (blue filled) button.' },
        },
        {
          name: 'primaryCTAUrl',
          type: 'text',
          defaultValue: '/topic',
          admin: { description: 'URL the primary button links to.' },
        },
        {
          name: 'secondaryCTALabel',
          type: 'text',
          defaultValue: 'Browse Resources',
          localized: true,
          admin: { description: 'Label for the secondary (outline) button.' },
        },
        {
          name: 'secondaryCTAUrl',
          type: 'text',
          defaultValue: '/resources',
          admin: { description: 'URL the secondary button links to.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
