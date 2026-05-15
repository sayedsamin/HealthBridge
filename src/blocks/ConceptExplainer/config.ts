import type { Block } from 'payload'

export const ConceptExplainer: Block = {
  slug: 'conceptExplainer',
  interfaceName: 'ConceptExplainerBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short label shown above the title (for example: How It Works).',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'graphic',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main graphic or infographic for this concept section.',
      },
    },
    {
      name: 'graphicAlt',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional custom alt text for accessibility.',
      },
    },
    {
      name: 'points',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Visual explanation points shown beside the graphic.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'Lightbulb',
          options: [
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'List Checks', value: 'ListChecks' },
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Users', value: 'Users' },
            { label: 'Heart Pulse', value: 'HeartPulse' },
            { label: 'Globe', value: 'Globe' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
