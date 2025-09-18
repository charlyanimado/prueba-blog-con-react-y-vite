import { useState, useEffect } from 'react';

function ProfilePage({ user, onUserUpdate }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});

  // useEffect corre cuando cambia la propiedad 'user'
  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Perfil actualizado exitosamente!');
        // Actualiza el estado del usuario en App.jsx
        onUserUpdate({ ...user, nombre, email });
      } else {
        setMessage(data.message || 'Error al actualizar.');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor.');
    }
  };

  // Password change functions
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'La contraseña actual es requerida';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'La nueva contraseña es requerida';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'La nueva contraseña debe ser diferente a la actual';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    
    if (!validatePassword()) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre: user.nombre, 
          email: user.email, 
          password: passwordData.newPassword,
          currentPassword: passwordData.currentPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage('¡Contraseña actualizada exitosamente!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordMessage('');
        }, 2000);
      } else {
        setPasswordMessage(data.message || 'Error al actualizar la contraseña.');
      }
    } catch (error) {
      setPasswordMessage('No se pudo conectar con el servidor.');
    }
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordMessage('');
    setPasswordErrors({});
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordMessage('');
    setPasswordErrors({});
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (!user) {
    return <p>Por favor, inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div className="row">
      {/* Desktop: User info sidebar */}
      <div className="col-lg-4 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <div className="text-center mb-4">
            <div className="avatar-large mb-3">
              <i className="fas fa-user-circle text-muted" style={{fontSize: '4rem'}}></i>
            </div>
            <h5>{user.nombre}</h5>
            <p className="text-muted small mb-1">{user.email}</p>
            <span className="badge bg-primary">Usuario</span>
          </div>
          
          <div className="mb-4">
            <h6>Información de la cuenta</h6>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Miembro desde</span>
              <span className="small text-muted">
                {user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : '2020-01-01'}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Último acceso</span>
              <span className="small text-muted">Hoy</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Rol</span>
              <span className="badge bg-secondary">{user.rol || 'Usuario'}</span>
            </div>
          </div>
          
          <div className="alert alert-info small">
            <i className="fas fa-shield-alt me-1"></i>
            <strong>Privacidad:</strong> Tu información está protegida y no se compartirá con terceros.
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-8">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Mi Perfil</h2>
            <div className="d-none d-md-block">
              <small className="text-muted">
                <i className="fas fa-edit me-1"></i>Edita tu información personal
              </small>
            </div>
          </div>
          
          {/* Mobile user info */}
          <div className="d-lg-none mb-4">
            <div className="text-center p-3 bg-light rounded">
              <i className="fas fa-user-circle text-muted fs-1 d-block mb-2"></i>
              <h5>{user.nombre}</h5>
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">
                  <i className="fas fa-user me-1"></i>Nombre completo
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombre" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  placeholder="Tu nombre completo"
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-1"></i>Correo Electrónico
                </label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="tu.email@ejemplo.com"
                  required 
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label">
                <i className="fas fa-lock me-1"></i>Seguridad de la cuenta
              </label>
              <div className="d-grid gap-2 d-md-flex">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={openPasswordModal}
                >
                  <i className="fas fa-key me-1"></i>Cambiar Contraseña
                </button>
              </div>
            </div>
            
            {message && (
              <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-warning'} alert-dismissible fade show`}>
                <i className={`fas ${message.includes('exitosamente') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-1`}></i>
                {message}
              </div>
            )}
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i>Actualizar Perfil
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-key me-2"></i>Cambiar Contraseña
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closePasswordModal}
                ></button>
              </div>
              <div className="modal-body">
                {passwordMessage && (
                  <div className={`alert ${passwordMessage.includes('exitosamente') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                    <i className={`fas ${passwordMessage.includes('exitosamente') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-1`}></i>
                    {passwordMessage}
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      <i className="fas fa-unlock me-1"></i>Contraseña Actual *
                    </label>
                    <input 
                      type="password" 
                      className={`form-control ${passwordErrors.currentPassword ? 'is-invalid' : ''}`}
                      id="currentPassword" 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu contraseña actual"
                      required 
                    />
                    {passwordErrors.currentPassword && (
                      <div className="invalid-feedback">
                        {passwordErrors.currentPassword}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      <i className="fas fa-lock me-1"></i>Nueva Contraseña *
                    </label>
                    <input 
                      type="password" 
                      className={`form-control ${passwordErrors.newPassword ? 'is-invalid' : ''}`}
                      id="newPassword" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu nueva contraseña"
                      required 
                    />
                    <div className="form-text">Mínimo 6 caracteres</div>
                    {passwordErrors.newPassword && (
                      <div className="invalid-feedback">
                        {passwordErrors.newPassword}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock me-1"></i>Confirmar Nueva Contraseña *
                    </label>
                    <input 
                      type="password" 
                      className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirma tu nueva contraseña"
                      required 
                    />
                    {passwordErrors.confirmPassword && (
                      <div className="invalid-feedback">
                        {passwordErrors.confirmPassword}
                      </div>
                    )}
                  </div>
                  
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-1"></i>
                    <strong>Importante:</strong> Asegúrate de recordar tu nueva contraseña. Será necesaria para futuros inicios de sesión.
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closePasswordModal}
                >
                  <i className="fas fa-times me-1"></i>Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  onClick={handlePasswordSubmit}
                >
                  <i className="fas fa-save me-1"></i>Actualizar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;