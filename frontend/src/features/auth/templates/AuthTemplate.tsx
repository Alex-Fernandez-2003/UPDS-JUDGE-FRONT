import React from 'react'
import CodeIllustration from '../Components/CodeIllustration'

interface AuthTemplateProps {
  children: React.ReactNode
  mode: 'login' | 'register'
}

export default function AuthTemplate({ children, mode }: AuthTemplateProps) {
  return (
    <div
      id="auth-template-layout"
      className="min-h-screen w-full flex bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900"
    >
      {/* Left side panel: Decorative layout with brand/code visuals */}
      <CodeIllustration mode={mode} />

      {/* Right side panel: Auth Forms (login / registration) */}
      <div
        id="auth-form-panel"
        className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center bg-white px-6 py-12 overflow-y-auto"
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
