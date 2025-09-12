import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ user, handleLogout }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        setIsCollapsed(true);
    };

    const closeNavbar = () => {
        setIsCollapsed(true);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
            <div className='container-fluid'>
                <NavLink className="navbar-brand fw-bold fs-3" to="/" onClick={closeNavbar}>
                    <i className="fas fa-code me-2"></i>
                    Charlyanimado
                </NavLink>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded={!isCollapsed} 
                    aria-label="Toggle navigation"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/"
                                onClick={closeNavbar}
                            >
                                <i className="fas fa-home me-1"></i>
                                Blog
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/gustos"
                                onClick={closeNavbar}
                            >
                                <i className="fas fa-heart me-1"></i>
                                Me gusta
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/aprender"
                                onClick={closeNavbar}
                            >
                                <i className="fas fa-graduation-cap me-1"></i>
                                Aprender en 2025
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/contacto"
                                onClick={closeNavbar}
                            >
                                <i className="fas fa-envelope me-1"></i>
                                Contáctame
                            </NavLink>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav">
                        {user ? (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle d-flex align-items-center" 
                                    href="#" 
                                    id="navbarDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user-circle me-2 fs-5"></i>
                                    Hola, {user.nombre}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <NavLink 
                                            className="dropdown-item" 
                                            to="/perfil"
                                            onClick={closeNavbar}
                                        >
                                            <i className="fas fa-user me-2"></i>
                                            Mi Perfil
                                        </NavLink>
                                    </li>
                                    {user.rol === 'admin' && (
                                        <li>
                                            <NavLink 
                                                className="dropdown-item" 
                                                to="/admin/usuarios"
                                                onClick={closeNavbar}
                                            >
                                                <i className="fas fa-users-cog me-2"></i>
                                                Gestionar Usuarios
                                            </NavLink>
                                        </li>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button 
                                            onClick={handleLogoutClick} 
                                            className="dropdown-item text-danger"
                                        >
                                            <i className="fas fa-sign-out-alt me-2"></i>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink 
                                    className="btn btn-outline-light me-2" 
                                    to="/login"
                                    onClick={closeNavbar}
                                >
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;