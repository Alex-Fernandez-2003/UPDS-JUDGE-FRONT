import { useState } from 'react'
import {
  Alert,
  Badge,
  BrandMark,
  Button,
  Card,
  EmptyState,
  ProgressBar,
  Spinner,
} from '@/components/common'
import {
  FileDropzone,
  FormField,
  Input,
  PasswordInput,
  SearchInput,
} from '@/components/forms'
import { StatCard, Stepper } from '@/components/navigation'
import { DataTable } from '@/components/tables'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { uiFixture } from '@/mocks/fixtures/ui'
export default function DevUi() {
  const [disabled, setDisabled] = useState(false)
  return (
    <main className="space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold">Foundation catalog</h1>
        <p>Development-only visual examples with local fixtures.</p>
      </header>
      <Card>
        <h2>Tokens and actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <BrandMark />
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button loading>Saving</Button>
          <Button disabled={disabled} onClick={() => setDisabled(true)}>
            Disabled state
          </Button>
          <Badge tone="success">Success</Badge>
          <Spinner />
        </div>
      </Card>
      <Card>
        <h2>Feedback and fields</h2>
        <Alert tone="info">Generic informational feedback.</Alert>
        <ProgressBar value={66} />
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <FormField label="Example input" hint="A neutral field.">
            <Input placeholder="Value" />
          </FormField>
          <PasswordInput placeholder="Password" />
          <SearchInput placeholder="Search" />
        </div>
      </Card>
      <Card>
        <h2>Molecules</h2>
        <Stepper
          steps={['Basics', 'Rules', 'Problems', 'Review', 'Publish', 'Done']}
          activeIndex={1}
        />
        <div className="mt-3">
          <FileDropzone accept=".zip" maxSizeBytes={1_000_000} />
        </div>
      </Card>
      <section className="grid gap-4 md:grid-cols-2">
        <StatCard {...uiFixture.statistic} tone="info" />
        <EmptyState
          title="No records"
          description="This is a reusable empty state."
        />
      </section>
      <Card>
        <h2>Table primitive</h2>
        <DataTable
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'state', header: 'State' },
          ]}
          rows={[{ name: 'Sample item', state: 'Draft' }]}
        />
      </Card>
      <Card>
        <h2>Layout previews</h2>
        <div className="overflow-hidden rounded border">
          <AuthLayout title="Layout slot" description="Auth shell preview">
            <Button>Example action</Button>
          </AuthLayout>
        </div>
        <div className="mt-4 overflow-hidden rounded border">
          <AdminLayout>
            <p>Administrative content slot</p>
          </AdminLayout>
        </div>
      </Card>
    </main>
  )
}
