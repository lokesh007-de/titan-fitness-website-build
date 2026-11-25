'use client'

import { useActionState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitMembership, type MembershipFormState } from '@/app/actions/membership'

const initialState: MembershipFormState = { status: 'idle', message: '' }

export function MembershipSignup() {
  const [state, action, pending] = useActionState(submitMembership, initialState)

  return (
    <form action={action} className="join-form">
      <label className="visually-hidden" htmlFor="fullName">Your name</label>
      <input id="fullName" name="fullName" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100} />
      <label className="visually-hidden" htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" required maxLength={254} />
      <label className="visually-hidden" htmlFor="phone">Phone number (optional)</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" maxLength={32} />
      <label className="visually-hidden" htmlFor="membershipPlan">Choose a membership</label>
      <select id="membershipPlan" name="membershipPlan" defaultValue="strength">
        <option value="strength">Strength — $49/mo</option>
        <option value="all-access">All access — $79/mo</option>
        <option value="day-pass">Day pass — $19</option>
      </select>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-dark form-submit" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Get started'} {pending ? null : <ArrowRight size={17} aria-hidden="true" />}
      </button>
      {state.message ? (
        <p className={`form-message ${state.status}`} role="status" aria-live="polite">
          {state.status === 'success' && <Check size={16} aria-hidden="true" />}
          {state.message}
        </p>
      ) : (
        <p className="form-caption">No pressure. Just a quick hello from our team.</p>
      )}
    </form>
  )
}
