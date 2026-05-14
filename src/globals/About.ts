import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { revalidateAbout } from './hooks/revalidateAbout'
import { logGlobalAfterChange } from '@/hooks/adminActivity'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: {
    description: 'Manage the About page content displayed to site visitors.',
    group: 'Site Content',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Page Hero',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          defaultValue: 'About HealthBridge',
          localized: true,
          required: true,
          admin: { description: 'Main heading for the hero section.' },
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          defaultValue:
            'Empowering newcomers with accessible, culturally responsive health information.',
          localized: true,
          admin: { description: 'Subtitle shown below the hero title.' },
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Background or featured image for the hero section.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Mission & Vision',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'missionTitle',
          type: 'text',
          defaultValue: 'Our Mission',
          localized: true,
          admin: { description: 'Section heading for mission statement.' },
        },
        {
          name: 'missionDescription',
          type: 'textarea',
          defaultValue:
            'To provide culturally responsive, accessible health information that empowers newcomers and immigrants to navigate healthcare systems confidently.',
          localized: true,
          admin: { description: 'Full mission statement text.' },
        },
        {
          name: 'visionTitle',
          type: 'text',
          defaultValue: 'Our Vision',
          localized: true,
          admin: { description: 'Section heading for vision statement.' },
        },
        {
          name: 'visionDescription',
          type: 'textarea',
          defaultValue:
            'A world where language and cultural barriers do not prevent anyone from accessing quality health education and support.',
          localized: true,
          admin: { description: 'Full vision statement text.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Core Values',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'coreValues',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Value name (e.g., "Accessibility").' },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'Explanation of this core value.' },
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/components/ArrayRowLabel#ArrayRowLabel',
            },
          },
          defaultValue: [
            {
              title: 'Accessibility',
              description:
                'Health information should be free, clear, and available in multiple languages.',
            },
            {
              title: 'Equity',
              description: 'We serve underrepresented communities and address systemic barriers.',
            },
            {
              title: 'Cultural Responsiveness',
              description:
                'We respect diverse backgrounds and deliver culturally appropriate content.',
            },
            {
              title: 'Empowerment',
              description: 'We enable users to make informed decisions about their health.',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Team & Org',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'teamTitle',
          type: 'text',
          defaultValue: 'Meet Our Team',
          localized: true,
          admin: { description: 'Section heading for team/organization info.' },
        },
        {
          name: 'teamDescription',
          type: 'textarea',
          defaultValue:
            'HealthBridge is powered by healthcare professionals, community leaders, and technology experts dedicated to health equity.',
          localized: true,
          admin: { description: 'Overview of team or organization.' },
        },
        {
          name: 'teamMembers',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { description: 'Full name of team member.' },
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              admin: { description: 'Job title or role (e.g., "Program Director").' },
            },
            {
              name: 'bio',
              type: 'textarea',
              admin: { description: 'Short bio or background.' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Profile photo.' },
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/components/ArrayRowLabel#ArrayRowLabel',
            },
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Call-to-Action',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'ctaTitle',
          type: 'text',
          defaultValue: 'Ready to Get Started?',
          localized: true,
          admin: { description: 'CTA section heading.' },
        },
        {
          name: 'ctaDescription',
          type: 'textarea',
          defaultValue:
            'Explore our health topics, find answers to your questions, and take the next step in your health journey.',
          localized: true,
          admin: { description: 'CTA description text.' },
        },
        {
          name: 'ctaButtonLabel',
          type: 'text',
          defaultValue: 'Explore Health Topics',
          localized: true,
          admin: { description: 'Label for primary CTA button.' },
        },
        {
          name: 'ctaButtonUrl',
          type: 'text',
          defaultValue: '/topic',
          admin: { description: 'URL for CTA button.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout, logGlobalAfterChange('about')],
  },
}
