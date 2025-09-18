import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistroForm from '../components/RegistroForm';

function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/usuarios`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setMessage("No se pudo cargar la lista de usuarios.");
      });
  };

   useEffect(() => {
    fetchUsers();
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUserAdded = () => {
    setShowModal(false); // Cerrar el modal
    fetchUsers();      // Refrescar la lista de usuarios
    setMessage("Usuario añadido exitosamente."); // Opcional: mostrar un mensaje de éxito
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.nombre.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toString().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredUsers(users);
  };

  // Update filtered users when users array changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);
  // 2. Función para manejar la eliminación
  const handleDelete = async (userId) => {
    // Pedimos confirmación antes de borrar
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/usuarios/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // 3. Actualiza la lista de usuarios en la UI para reflejar el cambio
        setUsers(users.filter(user => user.id !== userId));
      } else {
        setMessage(data.message || "Error al eliminar.");
      }
    } catch (error) {
      setMessage("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="row">
      {/* Desktop: Admin statistics sidebar */}
      <div className="col-lg-3 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <h5>Estadísticas</h5>
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small">Total Usuarios</span>
              <span className="badge bg-primary">{users.length}</span>
            </div>
            {searchTerm && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small">Resultados</span>
                <span className="badge bg-info">{filteredUsers.length}</span>
              </div>
            )}
          </div>
          
          <h6>Acciones Rápidas</h6>
          <div className="d-grid gap-2 mb-3">
            <button 
              className="btn btn-success btn-sm" 
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i>Nuevo Usuario
            </button>
          </div>
          
          <div className="alert alert-info small">
            <i className="fas fa-info-circle me-1"></i>
            <strong>Tip:</strong> Usa Ctrl+F para enfocar la búsqueda rápidamente.
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-9">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Gestión de Usuarios</h2>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-success d-lg-none" 
                onClick={() => setShowModal(true)}
              >
                <i className="fas fa-plus me-1"></i>Añadir
              </button>
              <div className="input-group" style={{width: '250px'}}>
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={handleSearch}
                  id="search-input"
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={clearSearch}
                    title="Limpiar búsqueda"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {message && (
            <div className="alert alert-info alert-dismissible fade show" role="alert">
              {message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMessage('')}
              ></button>
            </div>
          )}
          
          {searchTerm && (
            <div className="alert alert-light border d-flex justify-content-between align-items-center">
              <div>
                <i className="fas fa-search me-2 text-muted"></i>
                <strong>Búsqueda activa:</strong> "{searchTerm}" 
                <span className="ms-2 text-muted">({filteredUsers.length} resultado{filteredUsers.length !== 1 ? 's' : ''})</span>
              </div>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={clearSearch}
              >
                <i className="fas fa-times me-1"></i>Limpiar
              </button>
            </div>
          )}
          
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>
                    <i className="fas fa-hashtag me-1"></i>ID
                  </th>
                  <th>
                    <i className="fas fa-user me-1"></i>Nombre
                    {searchTerm && (
                      <small className="ms-2 badge bg-light text-dark">
                        {filteredUsers.length}
                      </small>
                    )}
                  </th>
                  <th>
                    <i className="fas fa-envelope me-1"></i>Email
                  </th>
                  <th>
                    <i className="fas fa-lock me-1"></i>Contraseña
                  </th>
                  <th className="d-none d-md-table-cell">
                    <i className="fas fa-calendar me-1"></i>Registro
                  </th>
                  <th>
                    <i className="fas fa-cog me-1"></i>Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="fas fa-users text-muted fs-3 d-block mb-2"></i>
                      {searchTerm ? (
                        <>
                          <span className="text-muted d-block">No se encontraron usuarios</span>
                          <small className="text-muted">Busca por nombre, email o ID</small>
                        </>
                      ) : (
                        <span className="text-muted">No hay usuarios registrados</span>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-secondary">{user.id}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-placeholder me-2">
                            <i className="fas fa-user-circle text-muted fs-5"></i>
                          </div>
                          <span>{user.nombre}</span>
                        </div>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <a href={`password:${user.password}`} className="text-decoration-none">
                          {user.password}
                        </a>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <small className="text-muted">
                          {new Date(user.fecha_registro).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/admin/usuario/editar/${user.id}`} 
                            className="btn btn-primary btn-sm"
                            title="Editar usuario"
                          >
                            <i className="fas fa-edit"></i>
                            <span className="d-none d-lg-inline ms-1">Editar</span>
                          </Link>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                            title="Eliminar usuario"
                          >
                            <i className="fas fa-trash"></i>
                            <span className="d-none d-lg-inline ms-1">Eliminar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Crear Nuevo Usuario</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <RegistroForm onUserAdded={handleUserAdded}/>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
export default AdminUsuarios;