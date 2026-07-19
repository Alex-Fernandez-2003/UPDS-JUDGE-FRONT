import { execFileSync } from 'node:child_process'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')
const schemaUrl = process.env.OPENAPI_SCHEMA_URL ?? env.OPENAPI_SCHEMA_URL
if (!schemaUrl) {
  console.error(
    'OPENAPI_SCHEMA_URL is required. Confirm the real backend schema URL before generating types.',
  )
  process.exit(1)
}
execFileSync(
  'npx',
  ['openapi-typescript', schemaUrl, '--output', 'src/types/api.generated.ts'],
  { stdio: 'inherit', shell: process.platform === 'win32' },
)
