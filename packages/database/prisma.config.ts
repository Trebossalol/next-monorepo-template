import { env } from '@workspace/database/env'
import 'dotenv/config'
import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
	datasource: {
		url: env.DATABASE_URL
	},
	schema: path.join('prisma')
})
