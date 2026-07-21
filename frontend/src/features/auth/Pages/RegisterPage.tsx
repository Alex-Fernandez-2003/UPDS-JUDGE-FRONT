import { useNavigate } from 'react-router-dom';
import AuthTemplate from '@/features/auth/templates/AuthTemplate';
import RegisterForm from '@/features/auth/Components/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <AuthTemplate mode='register'>
      <RegisterForm
        onToggleMode={() => navigate('/login')}
      />
    </AuthTemplate>
  );
}