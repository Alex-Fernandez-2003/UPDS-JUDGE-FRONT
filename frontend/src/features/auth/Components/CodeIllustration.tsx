import { BrandMark } from '@/components/common'

interface CodeIllustrationProps {
  mode: 'login' | 'register'
}

export default function CodeIllustration({ mode }: CodeIllustrationProps) {
  return (
    <div className="relative hidden lg:flex w-1/2 min-h-screen flex-col justify-between overflow-hidden bg-[var(--brand)] p-12 text-white select-none">
      {/* Logo */}
      <div className="z-10">
        <BrandMark size="md" />
      </div>

      {/* Dynamic content */}
      <div className="relative z-10 my-12 flex max-w-lg flex-1 flex-col justify-center">
        {mode === 'login' ? (
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Compite, resuelve y mejora
            </h1>

            <p className="text-lg font-medium leading-relaxed text-slate-300">
              Participa en concursos de programación, envía soluciones y
              consulta tus resultados en tiempo real.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Comienza tu camino competitivo
            </h1>

            <p className="text-lg font-medium leading-relaxed text-slate-300">
              Crea una cuenta, participa en concursos y registra tu progreso en
              la plataforma.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="z-10 font-mono text-[11px] text-slate-400">
        System.out.println("Ready to code.");
      </div>
    </div>
  )
}
