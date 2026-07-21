import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import App from './App'
import { env, isDevelopment } from '@/config/env'
import { configureHttpClientAuthTransport } from '@/lib/api'
import { createSessionStorageAuthTransport } from '@/lib/auth/auth-transport'

configureHttpClientAuthTransport(createSessionStorageAuthTransport())

const bootstrap = async () => {
  if (isDevelopment && env.enableMocks) {
    const { worker } = await import('@/mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
