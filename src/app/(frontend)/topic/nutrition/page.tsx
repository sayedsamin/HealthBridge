import { TopicDetailTemplate } from '../TopicDetailTemplate'

export default function NutritionPage() {
  return (
    <TopicDetailTemplate
      title="Nutrition for Newcomer Families"
      subtitle="Learn food basics in Canada while keeping your cultural foods and traditions at the center."
      sidebarTitle="Nutrition Overview"
      activeSidebarLabel="Healthy Eating Basics"
      sidebarItems={[
        'Healthy Eating Basics',
        'Canada Food Guide',
        'Budget-friendly Meals',
        'Reading Food Labels',
        'School Lunch Ideas',
        'Managing Diabetes Risk',
        'Cultural Food Balance',
        'Nutrition Support Services',
      ]}
      sections={[
        {
          title: 'Canada Food Guide',
          description:
            'Use plate-based guidance to build balanced meals with foods you already enjoy.',
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
          description:
            'Understand sugar, sodium, and fat levels by using the Nutrition Facts table.',
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
      ]}
    />
  )
}
