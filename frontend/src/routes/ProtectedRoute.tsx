import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: Props) {
  // Leer el JWT de la sesión
  const token = sessionStorage.getItem('token');
  // Si NO hay token → volver al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Si hay token → mostrar la página
  return <>{children}</>;
}