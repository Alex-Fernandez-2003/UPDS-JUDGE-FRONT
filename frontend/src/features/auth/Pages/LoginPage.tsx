import { useNavigate } from 'react-router-dom';
import AuthTemplate from '@/features/auth/templates/AuthTemplate';
import LoginForm from '@/features/auth/Components/LoginForm';
import type { LoginResponse } from '@/features/auth/authTypes';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (res: LoginResponse) => {
    // Guardar JWT
    sessionStorage.setItem('token', res.token);

    // Ir al dashboard
    navigate('/dashboard');
  };

  return (
    <AuthTemplate mode="login">
      <LoginForm
        onToggleMode={() => navigate('/register')}
        onLoginSuccess={handleLoginSuccess}
      />
    </AuthTemplate>
  );
}