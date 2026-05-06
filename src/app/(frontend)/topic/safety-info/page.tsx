import { TopicDetailTemplate } from '../TopicDetailTemplate'

export default function SafetyInfoPage() {
  return (
    <TopicDetailTemplate
      title="Public Safety and Emergency Information"
      subtitle="Stay informed about emergency services, legal protections, and practical steps to stay safe."
      sidebarTitle="Safety Overview"
      activeSidebarLabel="Emergency Basics"
      sidebarItems={[
        'Emergency Basics',
        'When to Call 911',
        'Workplace Safety Rights',
        'Domestic Violence Support',
        'Road and Transit Safety',
        'Community Safety Resources',
        'Legal Aid and Rights',
        'Preparedness Checklist',
      ]}
      sections={[
        {
          title: 'When to Call 911',
          description:
            'Call 911 for immediate danger, serious injury, fire, or medical emergencies.',
          keyPoints: [
            'Stay calm and share location',
            'Follow dispatcher instructions',
            'Free emergency service',
          ],
        },
        {
          title: 'Workplace Safety Rights',
          description:
            'Learn your rights to training, protective equipment, and refusing unsafe work.',
          keyPoints: [
            'Right to know hazards',
            'Right to participate',
            'Right to refuse unsafe work',
          ],
        },
        {
          title: 'Domestic Violence Support',
          description:
            'Find confidential support lines, shelters, and legal help for safety planning.',
          keyPoints: ['24/7 helplines', 'Multilingual supports', 'Safety planning available'],
        },
        {
          title: 'Preparedness Checklist',
          description:
            'Prepare emergency contacts, medication lists, and basic supplies for your home.',
          keyPoints: ['Emergency contact card', 'Three-day essentials', 'Know local alert systems'],
        },
      ]}
    />
  )
}
