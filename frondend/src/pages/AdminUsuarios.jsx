import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistroForm from '../components/RegistroForm';

function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = () => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setMessage("No se pudo cargar la lista de usuarios.");
      });
  };

   useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = () => {
    setShowModal(false); // Cerrar el modal
    fetchUsers();      // Refrescar la lista de usuarios
    setMessage("Usuario añadido exitosamente."); // Opcional: mostrar un mensaje de éxito
  };
  // 2. Función para manejar la eliminación
  const handleDelete = async (userId) => {
    // Pedimos confirmación antes de borrar
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/usuarios/${userId}`, {
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
    <div className="container mt-5">
      <div className="content-card">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
          Añadir Usuario
        </button>
        {message && <p className="alert alert-info">{message}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Password</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{new Date(user.fecha_registro).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/usuario/editar/${user.id}`} className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
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
        )}
        {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
export default AdminUsuarios;