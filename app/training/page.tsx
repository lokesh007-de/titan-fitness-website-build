import type { Metadata } from 'next'
import { TitanFitness } from '@/components/titan-fitness'

export const metadata: Metadata = {
  title: 'Training',
  description: 'Find your rhythm with coaching, classes, and training built around you at Titan Fitness.',
}

export default function TrainingPage() {
  return <TitanFitness page="training" />
}
