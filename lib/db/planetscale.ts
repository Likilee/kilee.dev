// import 'server-only' not working with API routes yet
import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { Database } from './shceme'

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
})
