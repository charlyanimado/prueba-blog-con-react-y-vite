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
    fetch(`http://localhost:3001/usuarios/${id}`)
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
      const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="content-card">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="password" className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              {message && <p className="mt-3">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserPage;