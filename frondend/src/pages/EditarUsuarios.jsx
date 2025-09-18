import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams(); // Traer el ID del usuario desde la URL
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir después de actualizar

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/usuarios/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar los datos del usuario');
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setNombre(data.nombre);
          setEmail(data.email);
        }
      })
      .catch(err => {
        console.error('Error al cargar los datos del usuario:', err);
        setMessage('No se pudieron cargar los datos del usuario.');
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Usuario actualizado. Redirigiendo...');
        setTimeout(() => navigate('/admin/usuarios'), 2000); // Redirigir después de 2 segundos
      } else {
        setMessage(data.message || 'Error al actualizar.');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="row">
      {/* Desktop: User info sidebar */}
      <div className="col-lg-4 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <div className="text-center mb-4">
            <div className="avatar-large mb-3">
              <i className="fas fa-user-circle text-muted" style={{fontSize: '4rem'}}></i>
            </div>
            <h5>{nombre || 'Cargando...'}</h5>
            <p className="text-muted small mb-1">{email || 'Cargando...'}</p>
            <span className="badge bg-warning">Editando</span>
          </div>
          
          <div className="mb-4">
            <h6>Información del usuario</h6>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">ID de usuario</span>
              <span className="badge bg-secondary">#{id}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Estado</span>
              <span className="badge bg-success">Activo</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Última edición</span>
              <span className="small text-muted">Ahora</span>
            </div>
          </div>
          
          <div className="alert alert-warning small">
            <i className="fas fa-exclamation-triangle me-1"></i>
            <strong>Atención:</strong> Los cambios se aplicarán inmediatamente al guardar.
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-8">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Editar Usuario</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => navigate('/admin/usuarios')}
                    >
                      Usuarios
                    </button>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Editar #{id}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-none d-md-block">
              <small className="text-muted">
                <i className="fas fa-edit me-1"></i>Editando información del usuario
              </small>
            </div>
          </div>
          
          {/* Mobile user info */}
          <div className="d-lg-none mb-4">
            <div className="text-center p-3 bg-light rounded">
              <i className="fas fa-user-circle text-muted fs-1 d-block mb-2"></i>
              <h5>{nombre || 'Cargando...'}</h5>
              <p className="text-muted mb-1">{email || 'Cargando...'}</p>
              <span className="badge bg-warning">Usuario #{id}</span>
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
                  placeholder="Nombre completo del usuario"
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
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-1"></i>Nueva Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Dejar vacío para mantener la actual"
              />
              <div className="form-text">
                <i className="fas fa-info-circle me-1"></i>
                Solo completa este campo si deseas cambiar la contraseña
              </div>
            </div>
            
            {message && (
              <div className={`alert ${message.includes('actualizado') ? 'alert-success' : 'alert-warning'} alert-dismissible fade show`}>
                <i className={`fas ${message.includes('actualizado') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-1`}></i>
                {message}
              </div>
            )}
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-md-2"
                onClick={() => navigate('/admin/usuarios')}
              >
                <i className="fas fa-times me-1"></i>Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i>Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserPage;