'use server'

import { and, eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { gymMembershipLeads, membershipPlans } from '@/lib/db/schema'

export type MembershipFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitMembership(
  _previousState: MembershipFormState,
  formData: FormData,
): Promise<MembershipFormState> {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const phone = String(formData.get('phone') ?? '').trim()
  const membershipPlan = String(formData.get('membershipPlan') ?? '')
  const website = String(formData.get('website') ?? '').trim()

  if (website) return { status: 'success', message: 'You’re on the list. We’ll be in touch soon.' }

  if (
    fullName.length < 2 ||
    fullName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    phone.length > 32 ||
    !membershipPlan
  ) {
    return { status: 'error', message: 'Check your details and try again.' }
  }

  try {
    const db = getDb()
    const [activePlan] = await db
      .select({ id: membershipPlans.id })
      .from(membershipPlans)
      .where(and(eq(membershipPlans.id, membershipPlan), eq(membershipPlans.isActive, true)))
      .limit(1)

    if (!activePlan) return { status: 'error', message: 'Choose an available membership plan and try again.' }

    await db.insert(gymMembershipLeads).values({
      fullName,
      email,
      phone: phone || null,
      membershipPlan,
    })
    return { status: 'success', message: 'You’re on the list. We’ll be in touch soon.' }
  } catch {
    return {
      status: 'error',
      message: 'We couldn’t save that just now. Please try again in a moment.',
    }
  }
}
