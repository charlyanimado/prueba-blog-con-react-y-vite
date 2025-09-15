import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Blog from './pages/Blog';
import Gustos from './pages/Gustos';
import Aprender from './pages/Aprender';
import Contacto from './pages/Contacto';
import LoginPage from './pages/Login';
import RegistroPage from './pages/Registro';
import AdminUsuarios from './pages/AdminUsuarios';
import ProfilePage from './pages/PerfilUsuarios';
import EditUserPage from './pages/EditarUsuarios';
import ProtectedRoute from './components/ProteccionRutas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
        <div className='app-container'>
            <Navbar user={user} handleLogout={handleLogout} />
            <main className="flex-grow-1">
                <div className="container mt-4">
                    <Routes>
                      <Route path="/" element={<Blog />} />
                      <Route path="/gustos" element={<Gustos />} />
                      <Route path="/aprender" element={<Aprender />} />
                      <Route path="/contacto" element={<Contacto />} />
                      <Route path="/login" element={<LoginPage onLoginSuccess={setUser} />} />
                      <Route path="/registro" element={<RegistroPage />} />
                      <Route path="/perfil" element={<ProfilePage user={user} onUserUpdate={setUser} />} />
                      <Route path="/admin/usuarios" element={
                      <ProtectedRoute user={user} role="admin">
                        <AdminUsuarios />
                      </ProtectedRoute>
                    } />
                      <Route path="/admin/usuario/editar/:id" element={
                        <ProtectedRoute user={user} role="admin">
                          <EditUserPage />
                        </ProtectedRoute>
                      } />
                    </Routes>
                </div>
            </main>
            <Footer />
        </div>
    </Router>
  );
}

export default App;