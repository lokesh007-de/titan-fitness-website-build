import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const gymMembershipLeads = pgTable('gym_membership_leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  membershipPlan: text('membership_plan').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const membershipPlans = pgTable('membership_plans', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  priceCents: integer('price_cents').notNull(),
  durationDays: integer('duration_days').notNull(),
  billingInterval: text('billing_interval').notNull(),
  benefits: jsonb('benefits').$type<string[]>().default([]).notNull(),
  featured: boolean('featured').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('new').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
