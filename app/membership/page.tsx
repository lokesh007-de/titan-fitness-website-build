import type { Metadata } from 'next'
import { TitanFitness } from '@/components/titan-fitness'

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Explore Titan Fitness membership plans and find a good fit for your goals.',
}

export const dynamic = 'force-dynamic'

export default async function MembershipPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams
  return <TitanFitness page="membership" initialPlan={plan} />
}
