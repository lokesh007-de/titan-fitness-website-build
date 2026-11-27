'use client'

import { useActionState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitContact, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle', message: '' }

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  return (
    <form action={action} className="contact-form">
      <div className="contact-form-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="fullName" autoComplete="name" required minLength={2} maxLength={100} />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-phone">Phone <span>(optional)</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={32} />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-subject">What can we help with?</label>
          <select id="contact-subject" name="subject" defaultValue="general">
            <option value="general">General question</option>
            <option value="membership">Membership options</option>
            <option value="classes">Classes and training</option>
            <option value="personal-training">Personal training</option>
            <option value="accessibility">Accessibility and facilities</option>
          </select>
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={6} />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-lime contact-submit" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send your message'} {!pending && <ArrowRight size={17} aria-hidden="true" />}
      </button>
      {state.message ? (
        <p className={`contact-form-message ${state.status}`} role="status" aria-live="polite">
          {state.status === 'success' && <Check size={16} aria-hidden="true" />}
          {state.message}
        </p>
      ) : (
        <p className="contact-form-caption">Your message is sent securely to the Titan Fitness team.</p>
      )}
    </form>
  )
}
