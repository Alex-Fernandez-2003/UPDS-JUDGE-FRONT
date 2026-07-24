import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MAX_CONTEST_ZIP_SIZE_BYTES } from './constants'
import { ContestZipField } from './ContestZipField'

const fileWithSize = (name: string, size: number) => {
  const file = new File(['zip'], name, { type: 'application/zip' })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

function ZipHarness() {
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string>()

  return (
    <ContestZipField
      value={file}
      error={error}
      onChange={setFile}
      onError={setError}
      onClearError={() => setError(undefined)}
    />
  )
}

describe('ContestZipField', () => {
  it('opens the native selector from the empty area by click and keyboard', async () => {
    const user = userEvent.setup()
    const { container } = render(<ZipHarness />)
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    const click = vi.spyOn(input, 'click')
    const dropzone = screen.getByRole('button', {
      name: /Arrastrá un archivo ZIP o seleccioná uno/,
    })

    await user.click(dropzone)
    dropzone.focus()
    await user.keyboard('{Enter}')

    expect(click).toHaveBeenCalledTimes(2)
  })

  it('accepts a dropped valid ZIP and clears the selection when a ZIP is oversized', () => {
    render(<ZipHarness />)
    const dropzone = screen.getByRole('button', {
      name: /Arrastrá un archivo ZIP o seleccioná uno/,
    })

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [fileWithSize('exact.zip', MAX_CONTEST_ZIP_SIZE_BYTES)],
      },
    })
    expect(screen.getByText('exact.zip')).toBeInTheDocument()
    expect(screen.getByText('100 MB')).toBeInTheDocument()

    fireEvent.drop(screen.getByText('exact.zip').closest('div')!, {
      dataTransfer: {
        files: [fileWithSize('oversized.zip', MAX_CONTEST_ZIP_SIZE_BYTES + 1)],
      },
    })
    expect(screen.queryByText('exact.zip')).not.toBeInTheDocument()
    expect(
      screen.getByText('El ZIP no puede superar 100 MB.'),
    ).toBeInTheDocument()
  })
})
