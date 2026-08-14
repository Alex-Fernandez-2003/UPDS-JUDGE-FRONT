import { Maximize2, Minimize2 } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-csharp'
import {
  createElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import type { SubmissionLanguageConfig } from '../languageConfig'
import { sourceFilenameForLanguage } from '../languageConfig'

function renderPrismMarkup(markup: string): ReactNode[] {
  const parsed = new DOMParser().parseFromString(
    `<code>${markup}</code>`,
    'text/html',
  )
  const root = parsed.body.firstElementChild
  if (!root) return []

  const renderNode = (node: Node, key: string): ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? ''
    if (!(node instanceof HTMLElement) || node.tagName !== 'SPAN')
      return node.textContent ?? ''

    const className = Array.from(node.classList)
      .filter((name) => /^[a-z0-9_-]+$/i.test(name))
      .join(' ')
    return createElement(
      'span',
      { className, key },
      Array.from(node.childNodes).map((child, index) =>
        renderNode(child, `${key}-${index}`),
      ),
    )
  }

  return Array.from(root.childNodes).map((node, index) =>
    renderNode(node, String(index)),
  )
}

interface CodeEditorProps {
  value: string
  language: SubmissionLanguageConfig
  onChange: (value: string) => void
  errorId?: string
}

const EDITOR_GEOMETRY_STYLE: CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.875rem',
  fontWeight: 400,
  fontStyle: 'normal',
  lineHeight: '1.5rem',
  letterSpacing: 'normal',
  tabSize: 4,
  whiteSpace: 'pre',
  wordBreak: 'normal',
  overflowWrap: 'normal',
  padding: '1rem 1rem 1rem 4.5rem',
  border: 0,
  boxSizing: 'border-box',
  width: '100%',
  minWidth: '100%',
  height: '100%',
  minHeight: '100%',
}

function syncVisualLayers(
  textarea: HTMLTextAreaElement,
  codeTrack: HTMLElement | null,
  gutter: HTMLElement | null,
) {
  const translatedLeft = textarea.scrollLeft === 0 ? 0 : -textarea.scrollLeft
  const translatedTop = textarea.scrollTop === 0 ? 0 : -textarea.scrollTop
  if (codeTrack) {
    codeTrack.style.transform = `translate(${translatedLeft}px, ${translatedTop}px)`
  }
  if (gutter) {
    gutter.style.transform = `translateY(${translatedTop}px)`
  }
}

export function CodeEditor({
  value,
  language,
  onChange,
  errorId,
}: CodeEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const codeTrackRef = useRef<HTMLElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const lineNumbers = useMemo(
    () =>
      Array.from({ length: value.split('\n').length }, (_, index) => index + 1),
    [value],
  )
  const highlightedCode = useMemo(() => {
    const grammar =
      Prism.languages[language.prismLanguage] ?? Prism.languages.clike
    return Prism.highlight(value, grammar, language.prismLanguage)
  }, [language.prismLanguage, value])

  const highlightedNodes = useMemo(
    () => renderPrismMarkup(highlightedCode),
    [highlightedCode],
  )

  const syncScroll = (textarea: HTMLTextAreaElement) =>
    syncVisualLayers(textarea, codeTrackRef.current, gutterRef.current)

  useLayoutEffect(() => {
    if (textareaRef.current) syncScroll(textareaRef.current)
  }, [expanded, value])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#151827] text-slate-100 shadow-inner focus-within:ring-2 focus-within:ring-blue-400">
      <div className="flex items-center justify-between border-b border-slate-700 bg-[#20243a] px-4 py-2.5">
        <span className="font-mono text-xs font-semibold text-slate-300">
          {sourceFilenameForLanguage(language.id)}
        </span>
        <button
          type="button"
          aria-label={expanded ? 'Contraer editor' : 'Expandir editor'}
          title={expanded ? 'Contraer editor' : 'Expandir editor'}
          onClick={() => setExpanded((current) => !current)}
          className="rounded-lg bg-white/10 p-2 text-slate-200 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-blue-400"
        >
          {expanded ? (
            <Minimize2 className="size-4" />
          ) : (
            <Maximize2 className="size-4" />
          )}
        </button>
      </div>
      <div
        data-testid="code-editor-viewport"
        onTransitionEnd={() => {
          if (textareaRef.current) syncScroll(textareaRef.current)
        }}
        className={`relative transition-[height] duration-300 ${expanded ? 'h-[max(60vh,18rem)] max-h-[42rem]' : 'h-72'}`}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 overflow-hidden border-r border-slate-700 bg-[#191d2e] text-right text-slate-500"
          style={{
            fontFamily: EDITOR_GEOMETRY_STYLE.fontFamily,
            fontSize: EDITOR_GEOMETRY_STYLE.fontSize,
            fontWeight: EDITOR_GEOMETRY_STYLE.fontWeight,
            fontStyle: EDITOR_GEOMETRY_STYLE.fontStyle,
            lineHeight: EDITOR_GEOMETRY_STYLE.lineHeight,
            letterSpacing: EDITOR_GEOMETRY_STYLE.letterSpacing,
            tabSize: EDITOR_GEOMETRY_STYLE.tabSize,
            whiteSpace: EDITOR_GEOMETRY_STYLE.whiteSpace,
            paddingBlock: '1rem',
          }}
        >
          <div ref={gutterRef} data-testid="code-line-numbers" className="pr-3">
            {lineNumbers.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <pre
          aria-hidden="true"
          data-testid="code-editor-highlight"
          style={EDITOR_GEOMETRY_STYLE}
          className="pointer-events-none absolute inset-0 m-0 overflow-hidden bg-transparent text-slate-100 [&_.token.boolean]:text-orange-300 [&_.token.builtin]:text-cyan-300 [&_.token.class-name]:text-yellow-300 [&_.token.comment]:text-slate-500 [&_.token.function]:text-blue-300 [&_.token.keyword]:text-fuchsia-300 [&_.token.number]:text-orange-300 [&_.token.operator]:text-sky-300 [&_.token.punctuation]:text-slate-300 [&_.token.string]:text-emerald-300"
        >
          <code
            ref={codeTrackRef}
            data-testid="code-editor-highlight-track"
            className={`language-${language.prismLanguage} block w-max min-w-full`}
            style={{
              transform: 'translate(0px, 0px)',
              font: 'inherit',
              letterSpacing: 'inherit',
              tabSize: 'inherit',
              whiteSpace: 'inherit',
              wordBreak: 'inherit',
              overflowWrap: 'inherit',
            }}
          >
            {highlightedNodes}
            {value.endsWith('\n') ? <br /> : null}
          </code>
        </pre>
        <textarea
          ref={textareaRef}
          value={value}
          aria-label="Código fuente"
          aria-describedby={errorId}
          aria-invalid={Boolean(errorId) || undefined}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          wrap="off"
          data-testid="code-editor-scroll"
          data-expanded={String(expanded)}
          onChange={(event) => onChange(event.target.value)}
          onScroll={(event) => syncScroll(event.currentTarget)}
          style={EDITOR_GEOMETRY_STYLE}
          className="absolute inset-0 z-10 m-0 size-full cursor-text resize-none overflow-auto bg-transparent text-transparent caret-white outline-none selection:bg-blue-400/40"
        />
      </div>
    </div>
  )
}
