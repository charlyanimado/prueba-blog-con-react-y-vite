import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, role, children }) {
  if (!user) {
    // si no hay usuario, directito pal login
    return <Navigate to="/Login" replace />;
  }

  if (user.rol !== role) {
    // si el usuario está conectado pero no es un admin😎, envialo a su perfil we
    return <Navigate to="/PerfilUsuario" replace />;
  }

  // si el usuario está conectado y tiene el rol correcto, mostrar la página
  return children;
}

export default ProtectedRoute;