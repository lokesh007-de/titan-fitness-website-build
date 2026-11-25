'use server'

import { getDb } from '@/lib/db'
import { gymMembershipLeads } from '@/lib/db/schema'

export type MembershipFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const allowedPlans = new Set(['day-pass', 'strength', 'all-access'])

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
    !allowedPlans.has(membershipPlan)
  ) {
    return { status: 'error', message: 'Check your details and try again.' }
  }

  try {
    await getDb().insert(gymMembershipLeads).values({
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
