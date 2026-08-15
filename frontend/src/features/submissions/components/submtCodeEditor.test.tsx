import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
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

  it('inserts four spaces at a collapsed caret, keeps focus, and notifies the parent once', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function ControlledEditor() {
      const [value, setValue] = useState('return0;')
      return (
        <>
          <CodeEditor
            value={value}
            language={getLanguageConfig(1)!}
            onChange={(nextValue) => {
              onChange(nextValue)
              setValue(nextValue)
            }}
          />
          <button type="button">Después del editor</button>
        </>
      )
    }

    render(<ControlledEditor />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    editor.focus()
    editor.setSelectionRange(6, 6)

    await user.tab()

    expect(editor).toHaveValue('return    0;')
    expect(editor.selectionStart).toBe(10)
    expect(editor.selectionEnd).toBe(10)
    expect(editor).toHaveFocus()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('return    0;')
  })

  it('replaces a single-line selection with four spaces and restores the caret', () => {
    render(<EditorHarness initial="alpha beta" />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    editor.focus()
    editor.setSelectionRange(6, 10, 'forward')

    fireEvent.keyDown(editor, { key: 'Tab' })

    expect(editor).toHaveValue('alpha     ')
    expect(editor.selectionStart).toBe(10)
    expect(editor.selectionEnd).toBe(10)
  })

  it('indents multiline selections without including a next-line boundary and preserves direction', () => {
    render(<EditorHarness initial={'one\ntwo\nthree'} />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    editor.focus()
    editor.setSelectionRange(0, 8, 'backward')

    fireEvent.keyDown(editor, { key: 'Tab' })

    expect(editor).toHaveValue('    one\n    two\nthree')
    expect(editor.selectionStart).toBe(4)
    expect(editor.selectionEnd).toBe(16)
    expect(editor.selectionDirection).toBe('backward')
  })

  it('outdents selected lines by one tab or up to four spaces without removing code', () => {
    render(<EditorHarness initial={'    one\n  two\n\tthree\nfour'} />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    editor.focus()
    editor.setSelectionRange(0, 21, 'forward')

    fireEvent.keyDown(editor, { key: 'Tab', shiftKey: true })

    expect(editor).toHaveValue('one\ntwo\nthree\nfour')
    expect(editor.selectionStart).toBe(0)
    expect(editor.selectionEnd).toBe(14)
    expect(editor.selectionDirection).toBe('forward')
  })

  it('does not remove non-indent characters or leave stale selection work behind', () => {
    render(<EditorHarness initial="code" />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    editor.focus()
    editor.setSelectionRange(2, 2)

    const outdentEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    })
    editor.dispatchEvent(outdentEvent)
    expect(outdentEvent.defaultPrevented).toBe(true)
    expect(editor).toHaveValue('code')

    fireEvent.change(editor, {
      target: { value: 'code!', selectionStart: 5, selectionEnd: 5 },
    })
    expect(editor.selectionStart).toBe(5)
    expect(editor.selectionEnd).toBe(5)
  })

  it('preserves scroll positions and visual synchronization while indenting', () => {
    render(<EditorHarness initial={'one\ntwo'} />)
    const editor = screen.getByRole('textbox', {
      name: 'Código fuente',
    }) as HTMLTextAreaElement
    Object.defineProperty(editor, 'scrollTop', {
      value: 18,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(editor, 'scrollLeft', {
      value: 26,
      writable: true,
      configurable: true,
    })
    editor.focus()
    editor.setSelectionRange(0, 0)

    fireEvent.keyDown(editor, { key: 'Tab' })

    expect(editor.scrollTop).toBe(18)
    expect(editor.scrollLeft).toBe(26)
    expect(screen.getByTestId('code-editor-highlight-track')).toHaveStyle({
      transform: 'translate(-26px, -18px)',
    })
    expect(screen.getByTestId('code-line-numbers')).toHaveStyle({
      transform: 'translateY(-18px)',
    })
  })

  it('does not intercept Escape', () => {
    render(<EditorHarness initial="code" />)
    const editor = screen.getByRole('textbox', { name: 'Código fuente' })
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    editor.dispatchEvent(escapeEvent)

    expect(escapeEvent.defaultPrevented).toBe(false)
  })

  it('toggles native Tab navigation with Ctrl+M and exposes accessible mode help', async () => {
    const user = userEvent.setup()
    render(<EditorHarness initial="int main() {}" />)
    const editor = screen.getByRole('textbox', { name: 'Código fuente' })
    const nextControl = screen.getByRole('button', {
      name: 'Después del editor',
    })

    expect(editor).toHaveAttribute('aria-keyshortcuts', 'Control+M')
    expect(editor).toHaveAccessibleDescription(/Ctrl\+M/)
    editor.focus()
    fireEvent.keyDown(editor, { key: 'm', ctrlKey: true })
    expect(screen.getByRole('status')).toHaveTextContent(
      'Navegación con Tab activada',
    )

    await user.tab()
    expect(nextControl).toHaveFocus()

    editor.focus()
    fireEvent.keyDown(editor, { key: 'm', ctrlKey: true })
    expect(screen.getByRole('status')).toHaveTextContent(
      'Indentación con Tab activada',
    )
    await user.tab()
    expect(editor).toHaveFocus()
  })

  it('provides a reversible real expansion without changing the value', async () => {
    const user = userEvent.setup()
    render(<EditorHarness initial="int main() {}" />)

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
