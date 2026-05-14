import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import {
  revalidateResourceItems,
  revalidateResourceItemsOnDelete,
} from './hooks/revalidateResourceItems'

export const ResourceItems: CollectionConfig = {
  slug: 'resource-items',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'icon', 'order'],
    description:
      'Manage the resource cards shown in the Browse Resources grid on the Resources page.',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: { description: 'Card heading shown in the resource grid.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL segment used in /resources/[slug]. Must be lowercase with hyphens, e.g. "healthcare-services".',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      admin: { description: 'Short description shown on the card.' },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'Hospital',
      required: true,
      options: [
        { label: 'Hospital (Healthcare Services)', value: 'Hospital' },
        { label: 'Shield Alert (Emergency & Crisis)', value: 'ShieldAlert' },
        { label: 'Brain (Mental Health)', value: 'Brain' },
        { label: 'Book Open (Health Library)', value: 'BookOpen' },
        { label: 'Flask (Lab Results)', value: 'FlaskConical' },
        { label: 'Apple (Nutrition & Wellness)', value: 'Apple' },
        { label: 'Globe (Newcomer Support)', value: 'Globe' },
        { label: 'Heart Pulse (Youth Health)', value: 'HeartPulse' },
        { label: 'Pill (Pharmacy)', value: 'Pill' },
        { label: 'Users (Community Services)', value: 'Users' },
        { label: 'File Text (Printable Resources)', value: 'FileText' },
        { label: 'Languages (Translation Support)', value: 'Languages' },
        { label: 'Play Circle (Interactive Learning)', value: 'PlayCircle' },
      ],
      admin: { description: 'Icon displayed on the resource card.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: {
        description: 'Display order in the resource grid. Lower numbers appear first.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateResourceItems],
    afterDelete: [revalidateResourceItemsOnDelete],
  },
}
