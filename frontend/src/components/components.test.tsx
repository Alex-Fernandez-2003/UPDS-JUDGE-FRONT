import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  Alert,
  Badge,
  BrandMark,
  Button,
  EmptyState,
  IconButton,
  ProgressBar,
  StatusDot,
} from './common'
import {
  Checkbox,
  FileDropzone,
  FormField,
  Input,
  PasswordInput,
  Radio,
} from './forms'
import { Breadcrumbs, Pagination, StatCard, Stepper } from './navigation'
import { DataTable } from './tables'

describe('foundation components', () => {
  it('renders accessible actions and feedback', async () => {
    const user = userEvent.setup()
    const click = vi.fn()
    render(
      <>
        <Button loading onClick={click}>
          Save
        </Button>
        <Alert tone="danger">Problem</Alert>
        <BrandMark alt="Technical mark" />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(click).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Problem')
    expect(screen.getByAltText('Technical mark')).toBeInTheDocument()
  })

  it('exposes pointer, hover, disabled, and non-submit icon action states', () => {
    render(
      <form>
        <Button>Primary action</Button>
        <IconButton label="Remove item" disabled>
          ×
        </IconButton>
      </form>,
    )

    expect(screen.getByRole('button', { name: 'Primary action' })).toHaveClass(
      'cursor-pointer',
      'enabled:hover:brightness-95',
    )
    expect(
      screen.getByRole('button', { name: 'Primary action' }),
    ).toHaveAttribute('type', 'button')
    expect(screen.getByRole('button', { name: 'Remove item' })).toHaveAttribute(
      'type',
      'button',
    )
    expect(screen.getByRole('button', { name: 'Remove item' })).toHaveClass(
      'disabled:cursor-not-allowed',
    )
  })

  it('renders Badge content with its selected tone', () => {
    render(<Badge tone="success">Published</Badge>)

    expect(screen.getByText('Published')).toHaveClass('bg-green-100')
  })

  it('merges root className values without losing base classes or native props', () => {
    const click = vi.fn()
    render(
      <>
        <StatusDot data-testid="status" className="size-3 ring-1" />
        <ProgressBar value={25} className="h-4" data-testid="progress" />
        <EmptyState title="Empty" className="mt-2" data-testid="empty" />
        <Checkbox className="size-5" data-testid="checkbox" onClick={click} />
        <Radio className="size-5" data-testid="radio" disabled />
        <Breadcrumbs items={[{ label: 'Home' }]} className="mt-3" />
        <Pagination
          page={1}
          totalPages={2}
          onPageChange={click}
          className="mt-4"
        />
      </>,
    )

    expect(screen.getByTestId('status')).toHaveClass('size-3', 'ring-1')
    expect(screen.getByTestId('progress')).toHaveClass('h-4', 'rounded-full')
    expect(screen.getByTestId('empty')).toHaveClass('mt-2', 'border-dashed')
    expect(screen.getByTestId('checkbox')).toHaveClass(
      'size-5',
      'accent-[var(--primary)]',
    )
    expect(screen.getByTestId('radio')).toBeDisabled()
    expect(screen.getByLabelText('Breadcrumb')).toHaveClass('mt-3')
    expect(screen.getByLabelText('Pagination')).toHaveClass('mt-4')
    fireEvent.click(screen.getByTestId('checkbox'))
    expect(click).toHaveBeenCalledTimes(1)
  })

  it('does not forward the custom error prop to native form controls', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    render(
      <FormField label="Native field">
        <input />
      </FormField>,
    )
    expect(screen.getByLabelText('Native field')).not.toHaveAttribute('error')
    expect(consoleError).not.toHaveBeenCalledWith(
      expect.stringContaining('non-boolean attribute'),
      expect.anything(),
    )
    consoleError.mockRestore()
  })

  it('associates a field and toggles password visibility', async () => {
    const user = userEvent.setup()
    render(
      <>
        <FormField label="Name" hint="Help" error="Required">
          <Input />
        </FormField>
        <PasswordInput aria-label="Password" />
      </>,
    )

    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Show password' }))
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text')
  })

  it('validates, selects, and removes dropped files', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FileDropzone accept=".zip" maxSizeBytes={10} onChange={onChange} />)
    const dropzone = screen.getByRole('button', {
      name: 'Drop a file here or select one',
    })

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [new File(['zip'], 'submission.zip')] },
    })
    expect(screen.getByText('submission.zip')).toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith(expect.any(File))

    await user.click(screen.getByRole('button', { name: 'Remove file' }))
    expect(onChange).toHaveBeenLastCalledWith(undefined)

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [new File(['text'], 'notes.txt')] },
    })
    expect(screen.getByRole('alert')).toHaveTextContent(
      'File type is not accepted.',
    )
  })

  it('identifies active steps, shows stats, and renders table states', () => {
    render(
      <>
        <Stepper steps={['One', 'Two']} activeIndex={1} />
        <StatCard label="Open" value="12" />
        <DataTable
          columns={[{ key: 'name', header: 'Name' }]}
          rows={[{ name: 'Sample row' }]}
        />
      </>,
    )

    expect(screen.getByText('2. Two')).toHaveAttribute('aria-current', 'step')
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Name' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Sample row' })).toBeInTheDocument()
  })
})
