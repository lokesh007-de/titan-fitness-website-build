export type ContentSection = {
  heading: string
  text: string
}

export type ContentEntry = {
  slug: string
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  meta: string
  sections: ContentSection[]
}

export const classes: ContentEntry[] = [
  {
    slug: 'strength-circuit',
    title: 'Strength Circuit',
    eyebrow: 'STRENGTH · 45 MIN',
    description: 'Build a stronger base with coached lifts, approachable progressions, and a crew that keeps the energy up.',
    image: '/images/class-strength.png',
    imageAlt: 'Coach guiding a small group through barbell strength training',
    meta: 'All levels · 45 minutes',
    sections: [
      { heading: 'What to expect', text: 'A clear warm-up, focused strength blocks, and enough time to practice each movement without feeling rushed.' },
      { heading: 'Who it is for', text: 'Anyone who wants to feel more confident with strength training. Your coach will offer options for your experience and equipment.' },
      { heading: 'Bring along', text: 'Comfortable training clothes, a water bottle, and a willingness to work at your own pace.' },
    ],
  },
  {
    slug: 'conditioning-lab',
    title: 'Conditioning Lab',
    eyebrow: 'CONDITIONING · 40 MIN',
    description: 'Intervals on the floor and machines that let you work hard, reset, and come back ready for the next round.',
    image: '/images/class-conditioning.png',
    imageAlt: 'Members pushing a sled and training with battle ropes in a gym',
    meta: 'All levels · 40 minutes',
    sections: [
      { heading: 'What to expect', text: 'Short, coach-led efforts alternate with recovery. You choose the pace and the coach helps you find a sustainable challenge.' },
      { heading: 'Who it is for', text: 'Members who want a lively full-body session, with low-impact options available for most movements.' },
      { heading: 'Bring along', text: 'Indoor training shoes and water. Arrive a few minutes early so the coach can help you get set up.' },
    ],
  },
  {
    slug: 'mobility-reset',
    title: 'Mobility Reset',
    eyebrow: 'MOBILITY · 30 MIN',
    description: 'A steady, guided session to move through comfortable ranges and make room for recovery between harder days.',
    image: '/images/class-mobility.png',
    imageAlt: 'Coach leading a small group through a guided mobility class on mats',
    meta: 'All levels · 30 minutes',
    sections: [
      { heading: 'What to expect', text: 'Breathing, gentle mobility drills, and unhurried stretches led by a coach. Nothing is forced; work within a range that feels right.' },
      { heading: 'Who it is for', text: 'A useful reset for new and experienced members alike. Tell your coach about any movement considerations before class.' },
      { heading: 'Bring along', text: 'Comfortable layers and a water bottle. Mats and basic props are provided.' },
    ],
  },
]

export const trainers: ContentEntry[] = [
  {
    slug: 'maya-chen',
    title: 'Maya Chen',
    eyebrow: 'STRENGTH COACH',
    description: 'Maya makes strength training feel clear, welcoming, and built around the person in front of her.',
    image: '/images/trainer-maya.png',
    imageAlt: 'Strength coach Maya Chen in the Titan training floor',
    meta: 'Strength · Barbell fundamentals',
    sections: [
      { heading: 'Coaching style', text: 'Maya focuses on patient progress, practical cues, and helping members build confidence with the fundamentals.' },
      { heading: 'Good to know', text: 'Maya coaches Strength Circuit and offers introductory strength sessions for members who want a little extra guidance.' },
    ],
  },
  {
    slug: 'jordan-lee',
    title: 'Jordan Lee',
    eyebrow: 'PERSONAL TRAINER',
    description: 'Jordan brings steady energy to one-to-one coaching and helps members turn big goals into manageable next steps.',
    image: '/images/trainer-jordan.png',
    imageAlt: 'Personal trainer Jordan Lee standing beside a squat rack',
    meta: 'Personal training · Movement coaching',
    sections: [
      { heading: 'Coaching style', text: 'Jordan builds sessions around your experience, schedule, and preferences, with attention to technique and repeatable habits.' },
      { heading: 'Good to know', text: 'Jordan works with beginners and experienced lifters. Book an introductory conversation to discuss your goals.' },
    ],
  },
  {
    slug: 'elena-rios',
    title: 'Elena Rios',
    eyebrow: 'GROUP FITNESS COACH',
    description: 'Elena creates group sessions where movement options are clear and every member can find a comfortable challenge.',
    image: '/images/trainer-elena.png',
    imageAlt: 'Group fitness coach Elena Rios in a bright studio',
    meta: 'Group fitness · Mobility',
    sections: [
      { heading: 'Coaching style', text: 'Elena keeps classes encouraging and practical, offering options so members can choose how they participate.' },
      { heading: 'Good to know', text: 'Elena coaches Conditioning Lab and Mobility Reset, and welcomes questions before class begins.' },
    ],
  },
]

export const services: ContentEntry[] = [
  {
    slug: 'personal-training',
    title: 'Personal Training',
    eyebrow: 'ONE-TO-ONE COACHING',
    description: 'Focused coaching shaped around your experience, goals, and the time you have available.',
    image: '/images/service-coaching.png',
    imageAlt: 'Coach supporting a member during a dumbbell strength exercise',
    meta: 'Coaching · By appointment',
    sections: [
      { heading: 'A plan that fits you', text: 'Start with a conversation about what you want from training. Your coach can help set a realistic direction and adjust sessions as you progress.' },
      { heading: 'Getting started', text: 'Use the contact form to ask about availability and share what you would like help with. The team can confirm current options and pricing.' },
    ],
  },
  {
    slug: 'small-group-training',
    title: 'Small Group Training',
    eyebrow: 'TRAIN TOGETHER',
    description: 'The attention of a coach with the momentum of a small, welcoming group.',
    image: '/images/service-group.png',
    imageAlt: 'A small group training together with a coach in a functional fitness area',
    meta: 'Group coaching · Scheduled sessions',
    sections: [
      { heading: 'Shared momentum', text: 'Coaches guide each session and offer movement options, so you can train alongside others while working at your own pace.' },
      { heading: 'Getting started', text: 'Browse the class list for current formats, then contact the team if you need help choosing a first session.' },
    ],
  },
  {
    slug: 'recovery-and-mobility',
    title: 'Recovery & Mobility',
    eyebrow: 'MOVE WELL',
    description: 'Make room in your week for comfortable movement, guided resets, and time to recover.',
    image: '/images/service-recovery.png',
    imageAlt: 'Member using a foam roller on a mat in a quiet gym recovery space',
    meta: 'Mobility · Guided sessions',
    sections: [
      { heading: 'A calmer session', text: 'Mobility Reset offers coached movement in a lower-intensity setting. Choose a comfortable range and let your coach know about any limitations.' },
      { heading: 'Getting started', text: 'See the class schedule for Mobility Reset and contact the team with questions about accessibility or equipment.' },
    ],
  },
]

export const articles: ContentEntry[] = [
  {
    slug: 'start-strength-training',
    title: 'A more confident start to strength training',
    eyebrow: 'TRAINING · 5 MIN READ',
    description: 'A few simple ways to make your first weeks of strength training feel more approachable and repeatable.',
    image: '/images/article-strength.png',
    imageAlt: 'Member setting up for a barbell deadlift with a coach nearby',
    meta: 'Training · 5 min read',
    sections: [
      { heading: 'Begin with the basics', text: 'Choose a small number of movements and learn them well before adding complexity. A coach can help you find comfortable starting variations and adjust equipment.' },
      { heading: 'Keep the first step manageable', text: 'A short, repeatable session is often easier to fit into a busy week than an ambitious plan. Leave room to build gradually rather than trying to do everything at once.' },
      { heading: 'Track consistency, not perfection', text: 'Note what you practiced and how it felt. Progress can come from showing up regularly, learning good technique, and making small changes over time.' },
    ],
  },
  {
    slug: 'recovery-between-workouts',
    title: 'Making recovery part of your routine',
    eyebrow: 'RECOVERY · 4 MIN READ',
    description: 'Recovery is not an extra credit task. A few steady habits can help make training easier to sustain.',
    image: '/images/article-recovery.png',
    imageAlt: 'Athlete stretching beside a sunlit gym window after training',
    meta: 'Recovery · 4 min read',
    sections: [
      { heading: 'Leave space between hard sessions', text: 'A balanced week includes easier days and rest. How much rest you need depends on your experience, schedule, and how your body feels.' },
      { heading: 'Keep the basics steady', text: 'Regular meals, hydration, sleep, and gentle movement can support a consistent routine. Small practical habits are easier to maintain than complicated rules.' },
      { heading: 'Listen to your body', text: 'Pain, dizziness, or symptoms that concern you are a reason to stop and seek appropriate professional guidance. Coaches can help adapt a workout, but they do not replace medical care.' },
    ],
  },
  {
    slug: 'fuel-for-training',
    title: 'Simple ways to fuel a training day',
    eyebrow: 'NUTRITION · 4 MIN READ',
    description: 'A practical, flexible approach to meals and snacks around the movement you enjoy.',
    image: '/images/article-nutrition.png',
    imageAlt: 'Balanced meal with salmon, grains, greens, citrus, and water',
    meta: 'Nutrition · 4 min read',
    sections: [
      { heading: 'Think balanced, not perfect', text: 'Many people find it useful to include a mix of foods they enjoy, including sources of carbohydrates, protein, and produce. Your needs depend on your body and activity.' },
      { heading: 'Plan for your schedule', text: 'If you train after work, a familiar meal or snack beforehand may be more practical than strict timing. Keep water available and notice what feels comfortable.' },
      { heading: 'Get individual advice when you need it', text: 'Nutrition needs vary. For medical conditions, specific performance targets, or eating concerns, talk with a registered dietitian or qualified healthcare professional.' },
    ],
  },
]

export const faqs = [
  { question: 'Can I visit before choosing a membership?', answer: 'Yes. Send a message through the contact form and the team can arrange a visit and explain the current membership options.' },
  { question: 'Are the classes suitable for beginners?', answer: 'Classes include options for different experience levels. Let the coach know it is your first session so they can help you get oriented.' },
  { question: 'What should I bring to my first workout?', answer: 'Comfortable training clothes, indoor shoes, and a water bottle are a good start. Contact the team if you need help with accessibility or equipment.' },
  { question: 'Can I change my membership later?', answer: 'Membership changes depend on the plan terms in effect when you join. The team can confirm current details before you sign up.' },
  { question: 'Do you offer personal training?', answer: 'Personal training is available by appointment. Use the contact form to ask about current coach availability and pricing.' },
  { question: 'How do I cancel or pause a membership?', answer: 'Contact the gym team directly for the current cancellation and pause policy. Terms should be confirmed before purchase.' },
]

export const aboutSections: ContentSection[] = [
  { heading: 'A place to make progress', text: 'Titan Fitness is built around useful coaching, thoughtful training spaces, and a welcoming atmosphere for people at every point in their fitness journey.' },
  { heading: 'Good training, without the ego', text: 'Come in with your own goals. Our coaches and members make room for different starting points, different schedules, and different ways to move.' },
  { heading: 'Show up for each other', text: 'The best gym is one you want to return to. We aim to make every visit feel supportive, practical, and worth the effort.' },
]
