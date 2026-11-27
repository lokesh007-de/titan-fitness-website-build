import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getMembershipPlan } from '@/lib/db/queries'
import { aboutSections, articles, classes, faqs, services, trainers, type ContentEntry } from '@/lib/site-content'
import {
  AboutPage,
  ContactPage,
  FaqPage,
  MembershipPlanDetailPage,
  PublicDetailPage,
  PublicListingPage,
} from '@/components/public-content-page'

export const dynamic = 'force-dynamic'

const collectionPages = {
  classes: {
    title: 'Classes that move you',
    eyebrow: 'FIND YOUR RHYTHM',
    description: 'Coached sessions for building strength, working up a sweat, and making movement part of your week.',
    notice: 'Class formats, durations, and session details are editable samples. Confirm the live timetable with the team before relying on a specific time.',
    items: classes,
  },
  trainers: {
    title: 'Meet your coaches',
    eyebrow: 'GOOD PEOPLE, GOOD COACHING',
    description: 'Get to know the coaches who make space for every starting point and every kind of progress.',
    notice: 'Coach names, portraits, and bios are editable sample profiles. Replace them with approved Titan Fitness team details.',
    items: trainers,
  },
  services: {
    title: 'More ways to move',
    eyebrow: 'BUILT AROUND YOU',
    description: 'Explore personal coaching, small-group sessions, and recovery options designed to support your routine.',
    notice: 'Service descriptions are editable samples. Confirm current availability and pricing with the gym team.',
    items: services,
  },
  blog: {
    title: 'The training journal',
    eyebrow: 'TIPS, IDEAS, AND GOOD QUESTIONS',
    description: 'Practical notes on training, recovery, and building habits that can last beyond the first week.',
    items: articles,
  },
} satisfies Record<string, { title: string; eyebrow: string; description: string; notice?: string; items: ContentEntry[] }>

const singlePageMetadata: Record<string, { title: string; description: string }> = {
  about: { title: 'About Titan Fitness', description: 'A welcoming neighborhood gym built around useful coaching, thoughtful training spaces, and good people.' },
  faq: { title: 'Frequently Asked Questions', description: 'Answers about visiting Titan Fitness, classes, memberships, and training.' },
  contact: { title: 'Contact Titan Fitness', description: 'Ask about a visit, a class, or membership options at Titan Fitness.' },
  pricing: { title: 'Membership pricing', description: 'Compare Titan Fitness membership plans.' },
}

type RouteProps = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params
  if (slug.length === 1) {
    const metadata = singlePageMetadata[slug[0]]
    if (metadata) return metadata
    const collection = collectionPages[slug[0] as keyof typeof collectionPages]
    if (collection) return { title: collection.title, description: collection.description }
  }

  if (slug.length === 2) {
    if (slug[0] === 'membership') {
      const plan = await getMembershipPlan(slug[1])
      if (plan) return { title: `${plan.name} membership`, description: plan.description }
    }
    const collection = collectionPages[slug[0] as keyof typeof collectionPages]
    const item = collection?.items.find((entry) => entry.slug === slug[1])
    if (item) return { title: item.title, description: item.description }
  }

  return { title: 'Titan Fitness' }
}

export default async function PublicRoute({ params }: RouteProps) {
  const { slug } = await params

  if (slug.length === 1) {
    const [route] = slug
    if (route === 'about') return <AboutPage sections={aboutSections} />
    if (route === 'faq') return <FaqPage items={faqs} />
    if (route === 'contact') return <ContactPage />
    if (route === 'pricing') redirect('/membership')

    const collection = collectionPages[route as keyof typeof collectionPages]
    if (collection) {
      return <PublicListingPage kind={route as keyof typeof collectionPages} {...collection} />
    }
  }

  if (slug.length === 2) {
    const [section, entrySlug] = slug
    if (section === 'membership') {
      const plan = await getMembershipPlan(entrySlug)
      if (!plan) notFound()
      return <MembershipPlanDetailPage plan={plan} />
    }

    const collection = collectionPages[section as keyof typeof collectionPages]
    const item = collection?.items.find((entry) => entry.slug === entrySlug)
    if (item && collection) {
      return <PublicDetailPage kind={section as keyof typeof collectionPages} item={item} backHref={`/${section}`} backLabel={`All ${section}`} />
    }
  }

  notFound()
}
