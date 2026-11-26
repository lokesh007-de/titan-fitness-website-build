import type { Metadata } from 'next'
import { TitanFitness } from '@/components/titan-fitness'

export const metadata: Metadata = {
  title: 'Equipment',
  description: 'Explore the Titan Fitness equipment and training spaces ready for your next personal best.',
}

export default function EquipmentPage() {
  return <TitanFitness page="equipment" />
}
