import React, { useState } from 'react';
import {Button,Card,Alert,Divider,} from '@/components/common';
import {FormField,Input,PasswordInput,} from '@/components/forms';
import type { LoginResponse } from '@/features/auth/authTypes';
import { authService } from '@/features/auth/authService';

interface LoginFormProps {
  onToggleMode: () => void;
  onLoginSuccess: (res: LoginResponse) => void;
}

export default function LoginForm({
  onToggleMode,
  onLoginSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};

    // Validaciones
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const authData = await authService.login({
        correo: email,
        contrasena: password,
      });

      onLoginSuccess(authData);

    } catch (error: any) {
      setErrors({
        general:
          error?.mensaje ||
          error?.error ||
          'No se pudo iniciar sesión.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto px-4 py-8'>
      <Card className='space-y-8'>

        {/* Header */}
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight text-[var(--text-primary)]'>
            Iniciar sesión
          </h2>

          <p className='text-sm font-medium text-[var(--text-secondary)]'>
            Ingresa con tu cuenta para continuar
          </p>
        </div>

        {/* Error global */}
        {errors.general && (
          <Alert tone='danger'>
            {errors.general}
          </Alert>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className='space-y-5'>

          <FormField
            label='Correo electrónico'
            error={errors.email}
          >
            <Input
              type='email'
              placeholder='ejemplo@upds.edu.bo'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </FormField>

          <FormField
            label='Contraseña'
            error={errors.password}
          >
            <PasswordInput
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </FormField>

          {/* Recuperar contraseña */}
          <div className='flex justify-end'>
            <button
              type='button'
              className='text-sm font-semibold text-[var(--primary)] hover:underline'
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón principal */}
          <Button
            type='submit'
            fullWidth
            loading={isLoading}
          >
            Iniciar sesión
          </Button>
        </form>

        {/* Divider */}
        <div className='relative'>
          <Divider />

          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='bg-[var(--surface)] px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]'>
              o
            </span>
          </div>
        </div>

        {/* Link a register */}
        <div className='text-center text-sm font-medium text-[var(--text-secondary)]'>
          ¿Aún no tienes una cuenta?{' '}

          <button
            type='button'
            onClick={onToggleMode}
            className='font-semibold text-[var(--primary)] hover:underline'
          >
            Crear cuenta
          </button>
        </div>

      </Card>

      {/* Footer */}
      <div className='mt-8 flex items-center justify-center gap-4 text-xs font-medium text-[var(--text-secondary)]'>
        <a
          href='#terms'
          className='hover:text-[var(--text-primary)] transition-colors'
        >
          Términos de uso
        </a>

        <a
          href='#privacy'
          className='hover:text-[var(--text-primary)] transition-colors'
        >
          Política de privacidad
        </a>
      </div>
    </div>
  );
}