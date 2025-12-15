import 'dotenv/config'
import path from "node:path";
import { defineConfig } from 'prisma/config'
import { env } from '@workspace/database/env';

export default defineConfig({
  datasource: {
    url: env.DATABASE_URL
  },
  schema: path.join('prisma')
})