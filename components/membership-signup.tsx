'use client'

import { useActionState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitMembership, type MembershipFormState } from '@/app/actions/membership'

type MembershipOption = {
  id: string
  name: string
  priceCents: number
  durationDays: number
  billingInterval: string
  featured?: boolean
}

const initialState: MembershipFormState = { status: 'idle', message: '' }

export function MembershipSignup({ plans, initialPlan }: { plans: MembershipOption[]; initialPlan?: string }) {
  const [state, action, pending] = useActionState(submitMembership, initialState)
  const selectedPlan = plans.find((plan) => plan.id === initialPlan)?.id
    ?? plans.find((plan) => plan.featured)?.id
    ?? plans[0]?.id
    ?? ''

  return (
    <form action={action} className="join-form">
      <label className="visually-hidden" htmlFor="fullName">Your name</label>
      <input id="fullName" name="fullName" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100} />
      <label className="visually-hidden" htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" required maxLength={254} />
      <label className="visually-hidden" htmlFor="phone">Phone number (optional)</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" maxLength={32} />
      <label className="visually-hidden" htmlFor="membershipPlan">Choose a membership</label>
      <select id="membershipPlan" name="membershipPlan" defaultValue={selectedPlan} required>
        {plans.length > 0 ? plans.map((plan) => (
          <option value={plan.id} key={plan.id}>
            {plan.name} — ${(plan.priceCents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })} / {plan.durationDays === 1 ? 'one day' : `per ${plan.billingInterval}`}
          </option>
        )) : <option value="">Plans are temporarily unavailable</option>}
      </select>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-dark form-submit" type="submit" disabled={pending || plans.length === 0}>
        {pending ? 'Sending…' : 'Request a visit'} {pending ? null : <ArrowRight size={17} aria-hidden="true" />}
      </button>
      {state.message ? (
        <p className={`form-message ${state.status}`} role="status" aria-live="polite">
          {state.status === 'success' && <Check size={16} aria-hidden="true" />}
          {state.message}
        </p>
      ) : (
        <p className="form-caption">No payment is taken here. The team will confirm current terms with you.</p>
      )}
    </form>
  )
}
