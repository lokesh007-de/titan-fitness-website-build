import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const gymMembershipLeads = pgTable('gym_membership_leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  membershipPlan: text('membership_plan').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
