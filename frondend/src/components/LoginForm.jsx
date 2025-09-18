import { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpiamos el mensaje previo

    try {
        // Lee la URL del backend desde las variables de entorno
        const apiUrl = import.meta.env.VITE_API_URL;

        // Usa esa variable para construir la URL completa de la petición
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        // Lee la respuesta del servidor
  const data = await response.json();

      if (response.ok) {
        setMessage('¡Login exitoso! Bienvenido.');
        onLoginSuccess(data.user);
      } else {
        setMessage(data.message || 'Error en el login.');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor.');
      console.error('Error de Red:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <h2>Iniciar Sesión</h2>
       
       <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Iniciar Sesión</button>

      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}

export default LoginForm;
