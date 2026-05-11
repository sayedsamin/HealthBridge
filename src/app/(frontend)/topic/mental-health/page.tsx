import { TopicDetailTemplate } from '../TopicDetailTemplate'
import { fetchTopicBySlug, toTemplateProps } from '../_utils/fetchTopicBySlug'
import { getRequestLocale } from '@/i18n/server'

const SLUG = 'mental-health'

const FALLBACK = {
  topicSlug: SLUG,
  title: 'Mental Health and Emotional Well-being',
  subtitle:
    'Find practical tools and trusted services to support your emotional and mental well-being in Canada.',
  sidebarTitle: 'Mental Health Overview',
  activeSidebarLabel: 'Mental Health Basics',
  sidebarItems: [
    'Mental Health Basics',
    'Stress and Anxiety',
    'Counselling Services',
    'Crisis Support',
    'Youth Mental Health',
    'Community Supports',
    'Language and Cultural Care',
    'Self-care Habits',
  ],
  sections: [
    {
      title: 'Stress and Anxiety',
      description:
        'Recognize common signs of stress and learn coping techniques that work day-to-day.',
      keyPoints: ['Sleep and routine matter', 'Use breathing tools', 'Seek help early'],
    },
    {
      title: 'Counselling Services',
      description:
        'Access low-cost or free counselling through community health and settlement centers.',
      keyPoints: [
        'In-person and virtual options',
        'Private and confidential',
        'Interpreter support may be available',
      ],
    },
    {
      title: 'Crisis Support',
      description:
        'Get urgent help through 988, local crisis lines, or emergency departments if needed.',
      keyPoints: ['988 available 24/7', 'Call 911 in immediate danger', 'You are not alone'],
    },
    {
      title: 'Self-care Habits',
      description: 'Build small daily habits that protect your mood, focus, and resilience.',
      keyPoints: ['Daily movement', 'Healthy social connection', 'Limit overwhelm'],
    },
  ],
}

export default async function MentalHealthPage() {
  const locale = await getRequestLocale()
  const cms = await fetchTopicBySlug(SLUG, locale)
  const props = cms ? toTemplateProps(cms, FALLBACK.activeSidebarLabel) : FALLBACK
  return <TopicDetailTemplate {...props} locale={locale} />
}
