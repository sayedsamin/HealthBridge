import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateHealthTopics } from './hooks/revalidateHealthTopics'

export const HealthTopics: CollectionConfig = {
  slug: 'health-topics',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'lessonsCount', 'order'],
    description: 'Manage topic cards shown on the Topics page and their detail page content.',
    group: 'Content',
  },
  fields: [
    // ── Card fields (shown on /topic overview) ─────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Card title shown on the Topics overview page.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL path segment — must be lowercase with hyphens, e.g. "healthcare-system" → /topic/healthcare-system.',
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: { description: 'Short description shown below the card title.' },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'Stethoscope',
      options: [
        { label: 'Stethoscope (Healthcare)', value: 'Stethoscope' },
        { label: 'Flask / Lab Test', value: 'FlaskConical' },
        { label: 'Heart Pulse (Health / Nutrition)', value: 'HeartPulse' },
        { label: 'Brain (Mental Health)', value: 'Brain' },
        { label: 'Users / People', value: 'Users' },
        { label: 'Shield Plus (Public Health)', value: 'ShieldPlus' },
        { label: 'Syringe / Vaccine', value: 'Syringe' },
        { label: 'Clipboard Check (Insurance)', value: 'ClipboardCheck' },
        { label: 'Badge Plus', value: 'BadgePlus' },
        { label: 'Hospital', value: 'Hospital' },
        { label: 'Phone / Support', value: 'PhoneCall' },
      ],
      admin: {
        description:
          'Icon displayed on the topic card. If an image is uploaded below, the image takes priority over this selection.',
      },
    },
    {
      name: 'iconImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional — upload a custom image to use as the icon instead of the selected icon above. Recommended size: 128×128 px.',
      },
    },
    {
      name: 'lessonsCount',
      type: 'number',
      defaultValue: 10,
      admin: { description: 'Number of lessons to display on the card badge.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: { description: 'Sort order on the overview page. Lower numbers appear first.' },
    },

    // ── Detail page fields ──────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Detail Page Content',
      admin: {
        description:
          'These fields control what appears on /topic/[slug] — the individual topic detail page.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          admin: { description: 'Subtitle / description shown below the page heading.' },
        },
        {
          name: 'sidebarTitle',
          type: 'text',
          defaultValue: 'Topics Overview',
          admin: { description: 'Heading text in the left sidebar box.' },
        },
        {
          name: 'sidebarItems',
          type: 'array',
          admin: {
            description: 'Navigation items shown in the sidebar (e.g. sub-topic names).',
            initCollapsed: true,
            isSortable: false,
          },
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'videoDuration',
          type: 'text',
          defaultValue: '3 min',
          admin: { description: 'Duration shown next to the "Watch Overview Video" badge.' },
        },
        {
          name: 'supportPhone',
          type: 'text',
          defaultValue: '1-888-315-9257',
          admin: {
            description: 'Support phone number displayed in the bottom help strip.',
          },
        },
        {
          name: 'sections',
          type: 'array',
          admin: {
            description: 'Content sections displayed as cards on the detail page.',
            initCollapsed: true,
            isSortable: false,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Section heading (e.g. "Family Doctors").' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: { description: 'One-to-two sentence description of this section.' },
            },
            {
              name: 'details',
              type: 'textarea',
              admin: {
                description:
                  'Full detail content shown on the section detail page when users click "Learn More".',
              },
            },
            {
              name: 'keyPoints',
              type: 'array',
              admin: {
                description: 'Bullet points shown in the green "Key Points" panel.',
                isSortable: false,
              },
              fields: [
                {
                  name: 'point',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHealthTopics],
  },
}
