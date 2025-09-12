import { useState, useEffect } from 'react';

function ProfilePage({ user, onUserUpdate }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
      const response = await fetch(`http://localhost:3001/usuarios/${user.id}`, {
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

  if (!user) {
    return <p>Por favor, inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="content-card">
            <h2>Mi Perfil</h2>
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
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
              {message && <p className="mt-3">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;