import RegistroForm from '../components/RegistroForm';
import { Link } from 'react-router-dom';

function RegistroPage() {
  return (
    <div className="row min-vh-75 align-items-center">
      {/* Desktop: Benefits showcase sidebar */}
      <div className="col-lg-6 d-none d-lg-block">
        <div className="content-card h-100">
          <div className="text-center mb-4">
            <i className="fas fa-rocket text-success" style={{fontSize: '3rem'}}></i>
            <h3 className="mt-3">Únete a la comunidad</h3>
            <p className="text-muted">Crea tu cuenta y comienza tu journey en el desarrollo web</p>
          </div>
          
          <div className="alert alert-success">
            <i className="fas fa-gift me-2"></i>
            <strong>¡Registro gratuito!</strong> Crear una cuenta es completamente gratis y siempre lo será.
          </div>
          
          <div className="text-center">
            <small className="text-muted">
              <i className="fas fa-users me-1"></i>
              Únete a otros desarrolladores que ya forman parte de esta comunidad
            </small>
          </div>
        </div>
      </div>
      
      {/* Registration form */}
      <div className="col-lg-6">
        <div className="content-card">
          <div className="text-center mb-4 d-lg-none">
            <i className="fas fa-user-plus text-success fs-1"></i>
            <h3 className="mt-2">Crear Cuenta</h3>
          </div>
          
          <div className="d-none d-lg-block text-center mb-4">
            <h2>Crear una cuenta</h2>
            <p className="text-muted">Completa el formulario para comenzar</p>
          </div>
          
          <RegistroForm />

          <div className="text-center mt-4">
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small">¿Ya tienes cuenta?</span>
              <hr className="flex-grow-1" />
            </div>
            
            <Link 
              to="/login" 
              className="btn btn-outline-primary w-100"
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Iniciar sesión
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <small className="text-muted">
              Al registrarte, aceptas nuestros 
              <a href="#" className="text-decoration-none"> términos de servicio</a> y 
              <a href="#" className="text-decoration-none"> política de privacidad</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroPage;