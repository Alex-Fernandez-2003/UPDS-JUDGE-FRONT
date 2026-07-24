import { useRef } from 'react'
import Prism from 'prismjs'

interface CodeEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
}

export function CodeEditor({
  value,
  language,
  onChange,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  const handleScroll = () => {
    if (!textareaRef.current || !preRef.current) return
    preRef.current.scrollTop = textareaRef.current.scrollTop
    preRef.current.scrollLeft = textareaRef.current.scrollLeft
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)

      // Reposicionar el cursor exactamente tras insertar los 2 espacios
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      })
    }
  }

  const prismLang = Prism.languages[language] ?? Prism.languages.plain
  const highlightedCode = Prism.highlight(value, prismLang, language)

  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 font-mono shadow-inner">
      {/* 1. Capa de renderizado Prism */}
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5rem',
          tabSize: 2,
        }}
        className="pointer-events-none absolute inset-0 z-0 m-0 overflow-auto border-0 p-4 whitespace-pre-wrap break-words text-slate-800 box-border"
      >
        <code
          className={`language-${language}`}
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            padding: 0,
            background: 'none',
          }}
          dangerouslySetInnerHTML={{
            __html: highlightedCode + (value.endsWith('\n') ? '<br />' : ''),
          }}
        />
      </pre>

      {/* 2. Capa de edición real (Textarea) */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5rem',
          tabSize: 2,
        }}
        className="absolute inset-0 z-10 m-0 resize-none overflow-auto border-0 bg-transparent p-4 whitespace-pre-wrap break-words text-transparent caret-black outline-none selection:bg-blue-200/60 box-border"
      />
    </div>
  )
}