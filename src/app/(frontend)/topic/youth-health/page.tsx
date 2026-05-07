import { TopicDetailTemplate } from '../TopicDetailTemplate'

export default function YouthHealthPage() {
  return (
    <TopicDetailTemplate
      title="Youth Health in Canada"
      subtitle="Support children and teens with trusted resources for school, mental health, and preventive care."
      sidebarTitle="Youth Health Overview"
      activeSidebarLabel="Children and Teen Health"
      sidebarItems={[
        'Children and Teen Health',
        'Vaccines and Checkups',
        'School Health Programs',
        'Mental Health for Youth',
        'Sexual Health Education',
        'Sports and Physical Activity',
        'Digital Safety and Sleep',
        'Youth-friendly Clinics',
      ]}
      sections={[
        {
          title: 'Vaccines and Checkups',
          description: 'Stay on schedule with age-based immunizations and regular growth checkups.',
          keyPoints: [
            'Free routine vaccines',
            'Keep records updated',
            'Ask school nurse for support',
          ],
        },
        {
          title: 'School Health Programs',
          description:
            'Use school-based supports for health screenings, counselling, and wellness education.',
          keyPoints: [
            'Vision and hearing checks',
            'Mental health referrals',
            'Health education resources',
          ],
        },
        {
          title: 'Mental Health for Youth',
          description:
            'Access confidential youth counselling and crisis lines when emotional support is needed.',
          keyPoints: ['Confidential support', 'After-hours options', 'Family and peer resources'],
        },
        {
          title: 'Youth-friendly Clinics',
          description:
            'Find clinics that provide respectful, inclusive care for adolescents and young adults.',
          keyPoints: ['Private consultations', 'Inclusive care', 'Easy booking options'],
        },
      ]}
    />
  )
}
