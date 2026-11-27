'use server'

import { getDb } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const allowedSubjects = new Set(['general', 'membership', 'classes', 'personal-training', 'accessibility'])

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const phone = String(formData.get('phone') ?? '').trim()
  const subject = String(formData.get('subject') ?? '')
  const message = String(formData.get('message') ?? '').trim()
  const website = String(formData.get('website') ?? '').trim()

  if (website) return { status: 'success', message: 'Thanks for reaching out. The team will be in touch.' }

  if (
    fullName.length < 2 ||
    fullName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    phone.length > 32 ||
    !allowedSubjects.has(subject) ||
    message.length < 10 ||
    message.length > 3000
  ) {
    return { status: 'error', message: 'Check your details and try again.' }
  }

  try {
    await getDb().insert(contactSubmissions).values({
      fullName,
      email,
      phone: phone || null,
      subject,
      message,
    })
    return { status: 'success', message: 'Thanks for reaching out. The team will be in touch.' }
  } catch {
    return { status: 'error', message: 'We couldn’t save your message just now. Please try again in a moment.' }
  }
}
