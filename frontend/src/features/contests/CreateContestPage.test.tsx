import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import {
  CONTEST_CODE_HINT,
  MAX_CONTEST_PROBLEMS,
  MAX_CONTEST_ZIP_SIZE_BYTES,
} from './constants'
import { CreateContestPage } from './CreateContestPage'

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <CreateContestPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )

const fileWithSize = (name: string, size: number) => {
  const file = new File(['zip'], name, { type: 'application/zip' })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('CreateContestPage', () => {
  it('renders safe summary placeholders, public modality, and ZIP warning', () => {
    renderPage()

    expect(
      screen.getByRole('heading', { name: 'Crear concurso' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Resumen del concurso' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Público')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña (opcional)')).toHaveValue('')
    expect(screen.getByLabelText('Código')).toHaveAttribute(
      'placeholder',
      'regional-2026',
    )
    expect(screen.getByLabelText('Código')).toHaveAttribute(
      'autocapitalize',
      'none',
    )
    expect(screen.getByLabelText('Código')).toHaveAttribute(
      'spellcheck',
      'false',
    )
    expect(screen.getByText(CONTEST_CODE_HINT)).toBeInTheDocument()
    expect(screen.getAllByText('Sin definir')).not.toHaveLength(0)
    expect(screen.getByText('No seleccionado')).toBeInTheDocument()
    expect(screen.getAllByText(/Tamaño máximo: 100 MB/)).not.toHaveLength(0)
    expect(screen.getByText(/carpetas de los problemas: A/)).toBeInTheDocument()
    expect(screen.queryByText('Contraseña')).not.toBeInTheDocument()
  })

  it('derives private modality without exposing the password', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('Contraseña (opcional)'), 'secret')
    expect(screen.getByText('Privado')).toBeInTheDocument()
    expect(screen.queryByText('secret')).not.toBeInTheDocument()
  })

  it('adds, bulk adds, and reindexes problems through accessible controls', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(
      screen.getByRole('button', { name: 'Agregar un problema' }),
    )
    expect(
      screen.getByRole('heading', { name: 'Problema B' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Agregar varios' }))
    expect(screen.getByLabelText('Cantidad adicional')).toBeInTheDocument()
    expect(
      screen.getByText('Podés agregar hasta 10 problemas.'),
    ).toBeInTheDocument()
    await user.type(screen.getByLabelText('Cantidad adicional'), '2')
    await user.click(screen.getByRole('button', { name: /^Agregar$/ }))
    expect(
      screen.getByRole('heading', { name: 'Problema D' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Cantidad adicional'),
    ).not.toBeInTheDocument()

    const deleteProblem = screen.getByRole('button', {
      name: 'Eliminar problema B',
    })
    expect(deleteProblem).toHaveAttribute('type', 'button')
    expect(deleteProblem).toHaveClass(
      'text-[var(--danger)]',
      'enabled:hover:bg-red-50',
    )
    await user.click(deleteProblem)
    expect(
      screen.getAllByRole('heading', { name: /^Problema [A-C]$/ }),
    ).toHaveLength(3)
    expect(
      screen.getByText(/carpetas de los problemas: A, B, C/),
    ).toBeInTheDocument()
  })

  it('rejects invalid bulk quantities without adding partial problems and cancels cleanly', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Agregar varios' }))
    const quantity = screen.getByLabelText('Cantidad adicional')
    await user.type(quantity, '0')
    await user.click(screen.getByRole('button', { name: /^Agregar$/ }))
    expect(
      screen.getByText('La cantidad debe ser al menos 1.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Problema B' }),
    ).not.toBeInTheDocument()

    for (const invalidQuantity of ['-1', '1.5', '26']) {
      await user.clear(quantity)
      await user.type(quantity, invalidQuantity)
      await user.click(screen.getByRole('button', { name: /^Agregar$/ }))
      expect(
        screen.queryByRole('heading', { name: 'Problema B' }),
      ).not.toBeInTheDocument()
    }
    expect(
      screen.getByText('Solo podés agregar hasta 11 problemas.'),
    ).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: 'Cancelar' })[0])
    expect(
      screen.queryByLabelText('Cantidad adicional'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Problema B' }),
    ).not.toBeInTheDocument()
  })

  it('enforces the central problem cap for single and bulk controls', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Agregar varios' }))
    await user.type(
      screen.getByLabelText('Cantidad adicional'),
      String(MAX_CONTEST_PROBLEMS - 1),
    )
    await user.click(screen.getByRole('button', { name: /^Agregar$/ }))

    expect(
      screen.getByRole('heading', { name: 'Problema L' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Agregar un problema' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Agregar varios' }),
    ).toBeDisabled()
  })

  it('selects, rejects, replaces, and removes ZIP files without uploading', async () => {
    const user = userEvent.setup()
    renderPage()
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const first = fileWithSize('first.zip', 1024)
    const tooLarge = fileWithSize('large.zip', MAX_CONTEST_ZIP_SIZE_BYTES + 1)
    const replacement = fileWithSize('replacement.zip', 2048)

    await user.upload(input, first)
    expect(screen.getAllByText('first.zip')).not.toHaveLength(0)
    expect(screen.getByText('1 KB')).toBeInTheDocument()
    expect(screen.getByText('Archivo válido')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Cambiar archivo' }),
    ).toBeInTheDocument()

    await user.upload(input, tooLarge)
    expect(screen.queryAllByText('first.zip')).toHaveLength(0)
    expect(
      screen.getByText('El ZIP no puede superar 100 MB.'),
    ).toBeInTheDocument()

    await user.upload(input, replacement)
    expect(screen.getAllByText('replacement.zip')).not.toHaveLength(0)
    expect(
      screen.queryByText('El ZIP no puede superar 100 MB.'),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Eliminar archivo ZIP' }),
    )
    expect(screen.getByText('Seleccionar archivo ZIP')).toBeInTheDocument()
    expect(input.value).toBe('')

    await user.upload(input, replacement)
    expect(screen.getAllByText('replacement.zip')).not.toHaveLength(0)
  })
})
