import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

let pool: Pool | undefined

export function getDb() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
  if (!connectionString) throw new Error('Database connection is not configured.')

  pool ??= new Pool({ connectionString, max: 5 })
  return drizzle(pool, { schema })
}
