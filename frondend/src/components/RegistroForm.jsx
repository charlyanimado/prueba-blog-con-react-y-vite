import { useState } from 'react';

function RegistroForm({ onUserAdded }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Limpiamos el mensaje previo

    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        // Clear form fields
        setNombre('');
        setEmail('');
        setPassword('');
        // Call the parent callback if provided
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setMessage(data.message || 'Error en el registro.');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor.');
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear una Cuenta</h2>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Registrarse</button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}

export default RegistroForm;