import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLoginSuccess }) {
  return (
    <div className="row min-vh-75 align-items-center">
      {/* Desktop: Features showcase sidebar */}
      <div className="col-lg-6 d-none d-lg-block">
        <div className="content-card h-100">
          <div className="text-center mb-4">
            <i className="fas fa-code text-primary" style={{fontSize: '3rem'}}></i>
            <h3 className="mt-3">Bienvenido de vuelta</h3>
            <p className="text-muted">Accede a tu cuenta y continúa explorando el mundo del desarrollo</p>
          </div>
        </div>
      </div>
      {/* Login form */}
      <div className="col-lg-6">
        <div className="content-card">
          <div className="text-center mb-4 d-lg-none">
            <i className="fas fa-code text-primary fs-1"></i>
            <h3 className="mt-2">Iniciar Sesión</h3>
          </div>
          
          <div className="d-none d-lg-block text-center mb-4">
            <h2>Iniciar Sesión</h2>
            <p className="text-muted">Accede a tu cuenta para continuar</p>
          </div>
          
          <LoginForm onLoginSuccess={onLoginSuccess} />

          <div className="text-center mt-4">
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small">¿Nuevo aquí?</span>
              <hr className="flex-grow-1" />
            </div>
            
            <Link 
              to="/registro" 
              className="btn btn-outline-primary w-100"
            >
              <i className="fas fa-user-plus me-2"></i>
              Crear una cuenta nueva
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="fas fa-shield-alt me-1"></i>
              Tu información está protegida y segura
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;