import { createKysely } from '@vercel/postgres-kysely'
import { Database } from './shceme'

export const queryBuilder = createKysely<Database>()
