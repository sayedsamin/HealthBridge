import { TopicDetailTemplate } from '../TopicDetailTemplate'

export default function HealthcareSystemPage() {
  return (
    <TopicDetailTemplate
      title="Understanding the Canadian Healthcare System"
      subtitle="Learn how healthcare works in Canada and how to access the right care when you need it."
      sidebarTitle="Topics Overview"
      activeSidebarLabel="Understanding Healthcare System"
      sidebarItems={[
        'Understanding Healthcare System',
        'Family Doctors',
        'Walk-in Clinics',
        'Emergencies: 911 and ER',
        'Registering a Family Doctor',
        'Health Insurance in Canada',
        'Health Services for Newcomers',
        'Medication and Pharmacy',
      ]}
      sections={[
        {
          title: 'Family Doctors',
          description:
            'Family doctors provide continuous care and help coordinate specialist referrals.',
          keyPoints: ['Continuous care for all ages', 'Referral support', 'Preventive checkups'],
        },
        {
          title: 'Walk-in Clinics',
          description:
            'Use walk-in clinics for non-emergency issues when you cannot see your doctor.',
          keyPoints: ['No appointment required', 'Short wait times', 'Not for emergencies'],
        },
        {
          title: 'Emergencies: 911 and ER',
          description: 'Know when to call 911 and when to visit the emergency department.',
          keyPoints: [
            'Call 911 for life-threatening events',
            'ER for urgent serious symptoms',
            'Get help immediately',
          ],
        },
        {
          title: 'Registering a Family Doctor',
          description:
            'Follow practical steps to find and register with a clinic accepting new patients.',
          keyPoints: [
            'Find open clinics',
            'Submit registration details',
            'Attend your first visit',
          ],
        },
      ]}
    />
  )
}
