import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { CrearEnvioDto } from '../Types/sumbitTypes'
import { SubmitSolutionModal } from './SubmitSolutionModal'

const problems = [
  { inciso: 'A', titulo: 'Cadena Alternante' },
  { inciso: 'B', titulo: 'Matriz dispersa' },
]

function ModalHarness({
  onSubmit = vi.fn().mockResolvedValue(undefined),
}: {
  onSubmit?: (payload: CrearEnvioDto) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
        Abrir envío
      </button>
      {open && (
        <SubmitSolutionModal
          contest={{ code: 'upds-div4-010', name: 'Maratón UPDS' }}
          problems={problems}
          onSubmit={onSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

const openModal = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Abrir envío' }))
  return screen.getByRole('dialog', { name: 'Enviar solución' })
}

describe('SubmitSolutionModal', () => {
  it.each([
    [
      'button',
      async (user: ReturnType<typeof userEvent.setup>) =>
        user.click(screen.getByRole('button', { name: 'Cerrar modal' })),
    ],
    [
      'Escape',
      async (user: ReturnType<typeof userEvent.setup>) =>
        user.keyboard('{Escape}'),
    ],
    [
      'overlay',
      async () =>
        fireEvent.mouseDown(screen.getByTestId('submit-modal-overlay')),
    ],
  ])('closes with %s and restores trigger focus', async (_kind, close) => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)
    await close(user)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Abrir envío' })).toHaveFocus()
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  })

  it('shows real contest context, traps focus, and wraps in both directions', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    const dialog = await openModal(user)
    expect(dialog).toHaveTextContent('Concurso: upds-div4-010 · Maratón UPDS')
    expect(screen.getByRole('button', { name: 'Cerrar modal' })).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(
      screen.getByRole('button', { name: /^Enviar solución$/ }),
    ).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(screen.getByRole('button', { name: 'Cerrar modal' })).toHaveFocus()
  })

  it('shares selects across accessible keyboard tabs and preserves inactive work', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)

    const dialog = screen.getByRole('dialog')
    const tabs = screen.getAllByRole('tab')
    expect(dialog).toHaveClass('max-w-5xl')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Problema' }),
      'B',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Lenguaje' }),
      '2',
    )
    await user.clear(screen.getByRole('textbox', { name: 'Código fuente' }))
    await user.type(
      screen.getByRole('textbox', { name: 'Código fuente' }),
      'print(42)',
    )
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })

    expect(screen.getByRole('tab', { name: 'Subir archivo' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(dialog).toHaveClass('max-w-2xl')
    expect(screen.getByRole('combobox', { name: 'Problema' })).toHaveValue('B')
    expect(screen.getByRole('combobox', { name: 'Lenguaje' })).toHaveValue('2')
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Subir archivo' }), {
      key: 'Home',
    })
    expect(screen.getByRole('textbox', { name: 'Código fuente' })).toHaveValue(
      'print(42)',
    )
  })

  it('updates the editor filename by language without losing pasted code', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)

    const editor = screen.getByRole('textbox', { name: 'Código fuente' })
    expect(screen.getByText('solucion.cpp')).toBeInTheDocument()
    await user.clear(editor)
    await user.type(editor, 'keep this source')

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Lenguaje' }),
      '2',
    )
    expect(screen.getByText('solucion.py')).toBeInTheDocument()
    expect(editor).toHaveValue('keep this source')

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Lenguaje' }),
      '3',
    )
    expect(screen.getByText('solucion.cs')).toBeInTheDocument()
    expect(editor).toHaveValue('keep this source')
  })

  it('derives exact upload accept values and extension chips from each language', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)
    await user.click(screen.getByRole('tab', { name: 'Subir archivo' }))

    const input = screen.getByLabelText('Seleccionar archivo fuente')
    const language = screen.getByRole('combobox', { name: 'Lenguaje' })
    const cases: ReadonlyArray<readonly [string, readonly string[]]> = [
      ['1', ['.cpp', '.py', '.cs']],
      ['2', ['.py']],
      ['3', ['.cs']],
    ]

    for (const [languageId, extensions] of cases) {
      await user.selectOptions(language, languageId)
      expect(input).toHaveAttribute('accept', extensions.join(','))
      for (const extension of extensions) {
        expect(screen.getByText(extension)).toBeInTheDocument()
      }
      for (const other of ['.cpp', '.py', '.cs'].filter(
        (candidate) => !extensions.includes(candidate),
      )) {
        expect(screen.queryByText(other)).not.toBeInTheDocument()
      }
      expect(screen.queryByText('.cc')).not.toBeInTheDocument()
      expect(screen.queryByText('.cxx')).not.toBeInTheDocument()
      expect(screen.queryByText('.c')).not.toBeInTheDocument()
    }
  })

  it('activates the upload picker with Enter and Space', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)
    await user.click(screen.getByRole('tab', { name: 'Subir archivo' }))

    const input = screen.getByLabelText('Seleccionar archivo fuente')
    const inputClick = vi.spyOn(input, 'click')
    const dropzone = screen.getByRole('button', { name: /Arrastra tu archivo/ })
    dropzone.focus()

    await user.keyboard('{Enter}')
    expect(inputClick).toHaveBeenCalledTimes(1)
    expect(dropzone).toHaveFocus()

    await user.keyboard(' ')
    expect(inputClick).toHaveBeenCalledTimes(2)
  })

  it('supports click/drop feedback and keeps invalid files visible for replacement or removal', async () => {
    const user = userEvent.setup()
    render(<ModalHarness />)
    await openModal(user)
    await user.click(screen.getByRole('tab', { name: 'Subir archivo' }))

    const input = screen.getByLabelText('Seleccionar archivo fuente')
    const inputClick = vi.spyOn(input, 'click')
    const dropzone = screen.getByRole('button', { name: /Arrastra tu archivo/ })
    await user.click(dropzone)
    expect(inputClick).toHaveBeenCalled()

    fireEvent.dragEnter(dropzone)
    expect(dropzone).toHaveAttribute('data-dragging', 'true')
    fireEvent.dragLeave(dropzone)
    expect(dropzone).toHaveAttribute('data-dragging', 'false')
    fireEvent.dragOver(dropzone)
    expect(dropzone).toHaveAttribute('data-dragging', 'true')

    const incompatible = new File(['not source'], 'solution.txt')
    fireEvent.drop(dropzone, { dataTransfer: { files: [incompatible] } })
    expect(dropzone).toHaveAttribute('data-dragging', 'false')
    expect(screen.getByText('solution.txt')).toBeInTheDocument()
    expect(screen.getByText('Archivo inválido')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/no corresponde/)
    expect(screen.getByText('.cpp')).toBeInTheDocument()
    expect(screen.queryByText('.cc')).not.toBeInTheDocument()
    expect(screen.queryByText('.cxx')).not.toBeInTheDocument()
    expect(screen.queryByText('.c')).not.toBeInTheDocument()
    const replace = screen.getByRole('button', { name: 'Reemplazar archivo' })
    expect(replace).toBeInTheDocument()
    Object.defineProperty(input, 'value', {
      value: 'C:\\fakepath\\solution.txt',
      writable: true,
      configurable: true,
    })
    await user.click(replace)
    expect(input).toHaveValue('')
    expect(screen.getByText('solution.txt')).toBeInTheDocument()
    expect(screen.getByText('Archivo inválido')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Eliminar archivo' }))
    expect(screen.queryByText('solution.txt')).not.toBeInTheDocument()
  })

  it('serializes only the active mode and prevents double submit while pending', async () => {
    const user = userEvent.setup()
    let resolveSubmit!: () => void
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve
        }),
    )
    render(<ModalHarness onSubmit={onSubmit} />)
    await openModal(user)
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Problema' }),
      'A',
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Código fuente' }), {
      target: { value: 'int main() {}' },
    })

    const submit = screen.getByRole('button', { name: /^Enviar solución$/ })
    await user.click(submit)
    await user.click(submit)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      codigoConcurso: 'upds-div4-010',
      incisoProblema: 'A',
      idLenguaje: 1,
      codigoFuente: 'int main() {}',
    })
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    resolveSubmit()
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  })

  it('keeps an incompatible file visible but excludes it from a paste payload', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<ModalHarness onSubmit={onSubmit} />)
    await openModal(user)
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Problema' }),
      'A',
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Código fuente' }), {
      target: { value: 'print("paste wins")' },
    })
    await user.click(screen.getByRole('tab', { name: 'Subir archivo' }))
    await user.upload(
      screen.getByLabelText('Seleccionar archivo fuente'),
      new File(['inactive file'], 'solution.cpp'),
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Lenguaje' }),
      '2',
    )
    expect(screen.getByText('solution.cpp')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/no corresponde/)

    await user.click(screen.getByRole('tab', { name: 'Pegar código' }))
    await user.click(screen.getByRole('button', { name: /^Enviar solución$/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit).toHaveBeenCalledWith({
      codigoConcurso: 'upds-div4-010',
      incisoProblema: 'A',
      idLenguaje: 2,
      codigoFuente: 'print("paste wins")',
    })
  })

  it('reads only the active upload file into the existing DTO', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<ModalHarness onSubmit={onSubmit} />)
    await openModal(user)
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Problema' }),
      'A',
    )
    await user.click(screen.getByRole('tab', { name: 'Subir archivo' }))
    await user.upload(
      screen.getByLabelText('Seleccionar archivo fuente'),
      new File(['uploaded code'], 'SOLUTION.CPP', { type: 'text/plain' }),
    )
    expect(screen.getByRole('status')).toHaveTextContent('Archivo listo')
    await user.click(screen.getByRole('button', { name: /^Enviar solución$/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ codigoFuente: 'uploaded code' }),
    )
  })

  it('shows validation and preserves all work after a normalized backend error', async () => {
    const user = userEvent.setup()
    const onSubmit = vi
      .fn()
      .mockRejectedValue(new Error('El juez no está disponible.'))
    render(<ModalHarness onSubmit={onSubmit} />)
    await openModal(user)

    await user.click(screen.getByRole('button', { name: /^Enviar solución$/ }))
    expect(
      await screen.findByText('Debes seleccionar un problema.'),
    ).toBeInTheDocument()

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Problema' }),
      'A',
    )
    await user.clear(screen.getByRole('textbox', { name: 'Código fuente' }))
    await user.type(
      screen.getByRole('textbox', { name: 'Código fuente' }),
      'work in progress',
    )
    await user.click(screen.getByRole('button', { name: /^Enviar solución$/ }))

    expect(
      await screen.findByText('El juez no está disponible.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Código fuente' })).toHaveValue(
      'work in progress',
    )
    expect(screen.getByRole('combobox', { name: 'Problema' })).toHaveValue('A')
  })
})
