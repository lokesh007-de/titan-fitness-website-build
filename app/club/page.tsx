import type { Metadata } from 'next'
import { TitanFitness } from '@/components/titan-fitness'

export const metadata: Metadata = {
  title: 'The club',
  description: 'Discover Titan Fitness: a welcoming place to move, meet your people, and build strength on your terms.',
}

export default function ClubPage() {
  return <TitanFitness page="club" />
}
