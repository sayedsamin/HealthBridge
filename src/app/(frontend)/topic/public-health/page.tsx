import { TopicDetailTemplate } from '../TopicDetailTemplate'
import { fetchTopicBySlug, toTemplateProps } from '../_utils/fetchTopicBySlug'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'

const SLUG = 'public-health'

const FALLBACK = {
  topicSlug: SLUG,
  title: 'Public Health and Community Safety',
  subtitle:
    'Understand public health programs, disease prevention, and community-level protections in Canada.',
  sidebarTitle: 'Public Health Overview',
  activeSidebarLabel: 'Public Health Basics',
  sidebarItems: [
    'Public Health Basics',
    'Vaccination Programs',
    'Infectious Disease Prevention',
    'Community Health Clinics',
    'Food and Water Safety',
    'Air Quality and Environment',
    'Public Health Alerts',
    'Where to Get Help',
  ],
  sections: [
    {
      title: 'Vaccination Programs',
      description:
        'Learn which vaccines are recommended or publicly funded for adults and children.',
      keyPoints: [
        'Seasonal vaccine updates',
        'Keep records available',
        'Ask your clinic for catch-up doses',
      ],
    },
    {
      title: 'Infectious Disease Prevention',
      description:
        'Reduce spread through hygiene, testing, and early treatment when symptoms appear.',
      keyPoints: ['Stay home when sick', 'Use testing guidance', 'Follow local advisories'],
    },
    {
      title: 'Community Health Clinics',
      description:
        'Access integrated services for medical, mental health, and social support needs.',
      keyPoints: [
        'Primary and preventive care',
        'Support for newcomers',
        'Referrals to local services',
      ],
    },
    {
      title: 'Public Health Alerts',
      description:
        'Track local announcements related to outbreaks, heat waves, and air quality events.',
      keyPoints: [
        'Use trusted official sources',
        'Prepare emergency kits',
        'Protect vulnerable family members',
      ],
    },
  ],
}

export default async function PublicHealthPage() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const cms = await fetchTopicBySlug(SLUG, locale, language)
  const props = cms ? toTemplateProps(cms, FALLBACK.activeSidebarLabel) : FALLBACK
  return <TopicDetailTemplate {...props} locale={locale} />
}
