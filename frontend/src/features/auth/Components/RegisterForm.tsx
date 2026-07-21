import React, { useState } from 'react'
import { Button, Card, Alert } from '@/components/common'
import {
  FormField,
  Input,
  PasswordInput,
  Checkbox,
  PasswordStrength,
} from '@/components/forms'
import { CheckCircle2 } from 'lucide-react'
import { authService } from '@/features/auth/authService'

interface RegisterFormProps {
  onToggleMode: () => void
}

export default function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: typeof errors = {}

    // Validaciones
    if (!name.trim()) {
      newErrors.name = 'El nombre completo es requerido.'
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido.'
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida.'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña.'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.'
    }

    if (!acceptTerms) {
      newErrors.general = 'Debes aceptar los términos y condiciones.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      await authService.register({
        nombre: name,
        correo: email,
        contrasena: password,
      })

      setShowSuccessAlert(true)

      // Redirigir al login después de 2.5 segundos
      setTimeout(() => {
        onToggleMode()
      }, 2500)
    } catch (error: any) {
      setErrors({
        general:
          error?.mensaje || error?.error || 'No se pudo crear la cuenta.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <Card className="space-y-6">
        {/* Éxito */}
        {showSuccessAlert && (
          <Alert tone="success" className="flex items-start gap-3">
            <CheckCircle2 className="size-5 shrink-0 mt-0.5" />

            <div className="text-left">
              <p className="font-semibold">¡Cuenta creada con éxito!</p>

              <p className="mt-1 text-sm">Ya puedes iniciar sesión.</p>
            </div>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Crear una cuenta
          </h2>

          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Completa tus datos para comenzar.
          </p>
        </div>

        {/* Error global */}
        {errors.general && !showSuccessAlert && (
          <Alert tone="danger">{errors.general}</Alert>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Nombre completo" error={errors.name}>
            <Input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading || showSuccessAlert}
            />
          </FormField>

          <FormField label="Correo electrónico" error={errors.email}>
            <Input
              type="email"
              placeholder="juan.perez@upds.edu.bo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || showSuccessAlert}
            />
          </FormField>

          {/* Contraseña */}
          <div className="space-y-2">
            <FormField label="Contraseña" error={errors.password}>
              <PasswordInput
                placeholder="Crea tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || showSuccessAlert}
              />
            </FormField>

            {password && (
              <div className="space-y-2">
                <PasswordStrength value={password} />

                <p className="text-xs text-[var(--text-secondary)]">
                  Usa al menos 8 caracteres, una letra mayúscula, una letra
                  minúscula y un número.
                </p>
              </div>
            )}
          </div>

          {/* Confirmar contraseña */}
          <FormField
            label="Confirmar contraseña"
            error={errors.confirmPassword}
          >
            <PasswordInput
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || showSuccessAlert}
            />
          </FormField>

          {/* Términos */}
          <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading || showSuccessAlert}
            />

            <span>Acepto los términos de uso y la política de privacidad.</span>
          </label>

          {/* Botón */}
          <Button
            type="submit"
            fullWidth
            loading={isLoading || showSuccessAlert}
          >
            {isLoading || showSuccessAlert
              ? 'Creando cuenta...'
              : 'Crear cuenta'}
          </Button>
        </form>

        {/* Link a login */}
        <div className="text-center text-sm font-medium text-[var(--text-secondary)]">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-semibold text-[var(--primary)] hover:underline cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      </Card>
    </div>
  )
}
