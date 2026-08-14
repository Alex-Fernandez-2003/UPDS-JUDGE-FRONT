import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { getLanguageConfig } from '../languageConfig'
import { CodeEditor } from './submtCodeEditor'

function EditorHarness({ initial = '' }: { initial?: string }) {
  const [value, setValue] = useState(initial)
  return (
    <>
      <CodeEditor
        value={value}
        language={getLanguageConfig(1)!}
        onChange={setValue}
      />
      <button type="button">Después del editor</button>
    </>
  )
}

describe('CodeEditor', () => {
  it('renders real Prism tokens without metric-changing token styles', () => {
    render(<EditorHarness initial={'// note\nint main() { return true; }'} />)
    const highlight = screen.getByTestId('code-editor-highlight')

    expect(highlight.querySelector('.token.comment')).toHaveTextContent(
      '// note',
    )
    expect(highlight.querySelector('.token.keyword')).toHaveTextContent('int')
    expect(highlight.querySelector('.token.boolean')).toHaveTextContent('true')
    expect(highlight.className).not.toContain('token.comment]:italic')

    fireEvent.change(screen.getByRole('textbox', { name: 'Código fuente' }), {
      target: { value: 'const int answer = 42;' },
    })
    expect(highlight.querySelectorAll('.token.keyword')).toHaveLength(2)
    expect(highlight.querySelector('.token.number')).toHaveTextContent('42')
    expect(highlight).not.toHaveTextContent('true')
  })

  it.each([
    ['no newline', 'first', 1],
    ['one trailing newline', 'first\n', 2],
    ['two trailing newlines', 'first\n\n', 3],
    ['an intermediate empty line', 'first\n\nthird', 3],
  ])('renders line numbers for %s', (_case, initial, count) => {
    render(<EditorHarness initial={initial} />)

    expect(screen.getByText('solucion.cpp')).toBeInTheDocument()
    expect(screen.getByTestId('code-line-numbers').children).toHaveLength(count)
  })

  it('shares all metric geometry and uses a max-content Prism code track', () => {
    render(<EditorHarness initial="int main() {}" />)
    const editor = screen.getByRole('textbox', { name: 'Código fuente' })
    const highlight = screen.getByTestId('code-editor-highlight')
    const track = screen.getByTestId('code-editor-highlight-track')
    const geometryProperties = [
      'fontFamily',
      'fontSize',
      'fontWeight',
      'fontStyle',
      'lineHeight',
      'letterSpacing',
      'tabSize',
      'whiteSpace',
      'wordBreak',
      'overflowWrap',
      'padding',
      'border',
      'boxSizing',
      'width',
      'minWidth',
      'height',
      'minHeight',
    ] as const

    geometryProperties.forEach((property) => {
      expect(editor.style[property], property).not.toBe('')
      expect(editor.style[property], property).toBe(highlight.style[property])
    })
    expect(editor).toHaveClass(
      'overflow-auto',
      'text-transparent',
      'caret-white',
      'selection:bg-blue-400/40',
    )
    expect(editor).toHaveStyle({ width: '100%', height: '100%' })
    const gutter = screen.getByTestId('code-line-numbers').parentElement!
    for (const property of [
      'fontFamily',
      'fontSize',
      'fontWeight',
      'fontStyle',
      'lineHeight',
      'letterSpacing',
      'tabSize',
      'whiteSpace',
    ] as const) {
      expect(gutter.style[property], property).toBe(editor.style[property])
    }
    expect(highlight).toHaveClass('overflow-hidden')
    expect(track).toHaveClass('block', 'w-max', 'min-w-full')
    expect(track).toHaveStyle({
      transform: 'translate(0px, 0px)',
      font: 'inherit',
      letterSpacing: 'inherit',
      tabSize: 'inherit',
      whiteSpace: 'inherit',
    })
  })

  it('keeps standard Tab navigation and provides a reversible real expansion', async () => {
    const user = userEvent.setup()
    render(<EditorHarness initial="int main() {}" />)
    const editor = screen.getByRole('textbox', { name: 'Código fuente' })
    editor.focus()

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    editor.dispatchEvent(tabEvent)
    expect(tabEvent.defaultPrevented).toBe(false)
    await user.tab()
    expect(
      screen.getByRole('button', { name: 'Después del editor' }),
    ).toHaveFocus()

    const expand = screen.getByRole('button', { name: 'Expandir editor' })
    await user.click(expand)
    expect(screen.getByTestId('code-editor-scroll')).toHaveAttribute(
      'data-expanded',
      'true',
    )
    expect(screen.getByTestId('code-editor-viewport').className).toContain(
      '18rem',
    )
    expect(screen.getByRole('textbox', { name: 'Código fuente' })).toHaveValue(
      'int main() {}',
    )
    await user.click(screen.getByRole('button', { name: 'Contraer editor' }))
    expect(screen.getByTestId('code-editor-scroll')).toHaveAttribute(
      'data-expanded',
      'false',
    )
  })

  it('keeps the textarea as sole scroll authority and translates visual tracks', () => {
    render(<EditorHarness />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    const highlight = screen.getByTestId('code-editor-highlight')
    const track = screen.getByTestId('code-editor-highlight-track')
    fireEvent.change(editor, { target: { value: 'one\ntwo' } })
    expect(screen.getByTestId('code-line-numbers').children).toHaveLength(2)

    Object.defineProperty(editor, 'scrollTop', {
      value: 24,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(editor, 'scrollLeft', {
      value: 40,
      writable: true,
      configurable: true,
    })
    editor.setSelectionRange(1, 4, 'backward')
    fireEvent.scroll(editor)

    expect(highlight.scrollTop).toBe(0)
    expect(highlight.scrollLeft).toBe(0)
    expect(track).toHaveStyle({ transform: 'translate(-40px, -24px)' })
    expect(screen.getByTestId('code-line-numbers')).toHaveStyle({
      transform: 'translateY(-24px)',
    })
    expect(editor.selectionStart).toBe(1)
    expect(editor.selectionEnd).toBe(4)
    expect(editor.selectionDirection).toBe('backward')
  })

  it('resynchronizes transforms after value edits and expansion changes', async () => {
    const user = userEvent.setup()
    render(<EditorHarness initial="one" />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    const track = screen.getByTestId('code-editor-highlight-track')
    Object.defineProperty(editor, 'scrollTop', {
      value: 12,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(editor, 'scrollLeft', {
      value: 30,
      writable: true,
      configurable: true,
    })

    editor.setSelectionRange(1, 2, 'forward')
    fireEvent.change(editor, {
      target: { value: 'one\ntwo', selectionStart: 1, selectionEnd: 2 },
    })
    expect(track).toHaveStyle({ transform: 'translate(-30px, -12px)' })
    expect(editor.selectionStart).toBe(1)
    expect(editor.selectionEnd).toBe(2)

    editor.scrollLeft = 8
    editor.scrollTop = 6
    await user.click(screen.getByRole('button', { name: 'Expandir editor' }))
    expect(track).toHaveStyle({ transform: 'translate(-8px, -6px)' })
    expect(screen.getByTestId('code-line-numbers')).toHaveStyle({
      transform: 'translateY(-6px)',
    })
    expect(editor).toHaveValue('one\ntwo')
  })
})
