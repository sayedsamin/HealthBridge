import { TopicDetailTemplate } from '../TopicDetailTemplate'
import { fetchTopicBySlug, toTemplateProps } from '../_utils/fetchTopicBySlug'
import { getRequestLocale } from '@/i18n/server'

const SLUG = 'nutrition'

const FALLBACK = {
  topicSlug: SLUG,
  title: 'Nutrition for Newcomer Families',
  subtitle:
    'Learn food basics in Canada while keeping your cultural foods and traditions at the center.',
  sidebarTitle: 'Nutrition Overview',
  activeSidebarLabel: 'Healthy Eating Basics',
  sidebarItems: [
    'Healthy Eating Basics',
    'Canada Food Guide',
    'Budget-friendly Meals',
    'Reading Food Labels',
    'School Lunch Ideas',
    'Managing Diabetes Risk',
    'Cultural Food Balance',
    'Nutrition Support Services',
  ],
  sections: [
    {
      title: 'Canada Food Guide',
      description: 'Use plate-based guidance to build balanced meals with foods you already enjoy.',
      keyPoints: ['Half plate vegetables', 'Choose whole grains', 'Drink water often'],
    },
    {
      title: 'Budget-friendly Meals',
      description:
        'Plan affordable weekly meals using local flyers, frozen produce, and beans or lentils.',
      keyPoints: ['Plan before shopping', 'Buy in-season produce', 'Batch cook staples'],
    },
    {
      title: 'Reading Food Labels',
      description: 'Understand sugar, sodium, and fat levels by using the Nutrition Facts table.',
      keyPoints: ['Check serving size', 'Compare similar products', 'Watch sodium levels'],
    },
    {
      title: 'Nutrition Support Services',
      description:
        'Find registered dietitians and community programs for practical nutrition advice.',
      keyPoints: [
        'Call 811 for guidance',
        'Use community food programs',
        'Ask your clinic for referrals',
      ],
    },
  ],
}

export default async function NutritionPage() {
  const locale = await getRequestLocale()
  const cms = await fetchTopicBySlug(SLUG, locale)
  const props = cms ? toTemplateProps(cms, FALLBACK.activeSidebarLabel) : FALLBACK
  return <TopicDetailTemplate {...props} locale={locale} />
}
