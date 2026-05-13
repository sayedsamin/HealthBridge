import type { AboutData } from './fetchAbout'

export const STATIC_ABOUT_FALLBACK: AboutData = {
  heroTitle: 'About HealthBridge',
  heroSubtitle: 'Empowering newcomers with accessible, culturally responsive health information.',
  heroImage: null,
  missionTitle: 'Our Mission',
  missionDescription:
    'To provide culturally responsive, accessible health information that empowers newcomers and immigrants to navigate healthcare systems confidently.',
  visionTitle: 'Our Vision',
  visionDescription:
    'A world where language and cultural barriers do not prevent anyone from accessing quality health education and support.',
  coreValues: [
    {
      title: 'Accessibility',
      description: 'Health information should be free, clear, and available in multiple languages.',
    },
    {
      title: 'Equity',
      description: 'We serve underrepresented communities and address systemic barriers.',
    },
    {
      title: 'Cultural Responsiveness',
      description: 'We respect diverse backgrounds and deliver culturally appropriate content.',
    },
    {
      title: 'Empowerment',
      description: 'We enable users to make informed decisions about their health.',
    },
  ],
  teamTitle: 'Meet Our Team',
  teamDescription:
    'HealthBridge is powered by healthcare professionals, community leaders, and technology experts dedicated to health equity.',
  teamMembers: [
    {
      name: 'Dr. Sarah Chen',
      role: 'Program Director',
      bio: 'Family medicine physician with 10+ years of experience serving immigrant communities.',
      image: null,
    },
    {
      name: 'James Okonkwo',
      role: 'Content Specialist',
      bio: 'Community health educator dedicated to accessible health communication.',
      image: null,
    },
    {
      name: 'Maria Rodriguez',
      role: 'Community Liaison',
      bio: 'Settlement services expert connecting newcomers with health resources.',
      image: null,
    },
  ],
  ctaTitle: 'Ready to Get Started?',
  ctaDescription:
    'Explore our health topics, find answers to your questions, and take the next step in your health journey.',
  ctaButtonLabel: 'Explore Health Topics',
  ctaButtonUrl: '/topic',
}
