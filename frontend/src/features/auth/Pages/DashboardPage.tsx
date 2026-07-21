import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/common';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el JWT
    sessionStorage.removeItem('token');

    // Volver al login
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
      <Card className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          ¡Bienvenido a UPDS Judge!
        </h1>

        <p className="text-[var(--text-secondary)]">
          Has iniciado sesión correctamente y tu ruta está protegida mediante JWT.
        </p>

        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </Card>
    </div>
  );
}