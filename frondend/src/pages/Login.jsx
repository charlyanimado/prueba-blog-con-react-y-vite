import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLoginSuccess }) {
  return (
    // 1. Contenedor principal con margen superior
    <div className="container mt-5">
      {/* 2. Fila para centrar el contenido */}
      <div className="row justify-content-center">
        {/* 3. Columna para limitar el ancho del formulario */}
        <div className="col-md-6">
          {/* 4. ¡La tarjeta que contiene todo! */}
          <div className="content-card">
            <LoginForm onLoginSuccess={onLoginSuccess} />

            <div className="mt-3">
              <Link to="/registro">¿No tienes una cuenta? Regístrate aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;