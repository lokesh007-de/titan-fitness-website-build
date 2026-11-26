import type { Metadata } from 'next'
import { TitanFitness } from '@/components/titan-fitness'

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Explore Titan Fitness membership plans and find a good fit for your goals.',
}

export default function MembershipPage() {
  return <TitanFitness page="membership" />
}
