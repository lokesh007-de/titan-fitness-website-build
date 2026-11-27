import { asc, and, eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { membershipPlans } from '@/lib/db/schema'

export function getMembershipPlans() {
  return getDb()
    .select()
    .from(membershipPlans)
    .where(eq(membershipPlans.isActive, true))
    .orderBy(asc(membershipPlans.sortOrder))
}

export async function getMembershipPlan(id: string) {
  const [plan] = await getDb()
    .select()
    .from(membershipPlans)
    .where(and(eq(membershipPlans.id, id), eq(membershipPlans.isActive, true)))
    .limit(1)

  return plan ?? null
}
