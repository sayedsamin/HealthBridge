import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'

export const AdminActivities: CollectionConfig = {
  slug: 'admin-activities',
  access: {
    create: () => false,
    delete: () => false,
    read: anyone,
    update: () => false,
  },
  admin: {
    group: 'System',
    useAsTitle: 'summary',
    defaultColumns: ['createdAt', 'actorName', 'action', 'entitySlug', 'entityTitle'],
  },
  fields: [
    {
      name: 'summary',
      type: 'text',
      required: true,
    },
    {
      name: 'action',
      type: 'select',
      required: true,
      options: [
        { label: 'Created', value: 'create' },
        { label: 'Updated', value: 'update' },
        { label: 'Deleted', value: 'delete' },
      ],
    },
    {
      name: 'entityScope',
      type: 'select',
      required: true,
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Global', value: 'global' },
      ],
    },
    {
      name: 'entitySlug',
      type: 'text',
      required: true,
    },
    {
      name: 'entityId',
      type: 'text',
    },
    {
      name: 'entityTitle',
      type: 'text',
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'actorName',
      type: 'text',
      required: true,
    },
    {
      name: 'locale',
      type: 'text',
    },
  ],
  timestamps: true,
}
