import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light py-2 mt-auto">
            <div className="container-fluid">
                <div className="row">
                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6 mb-2">
                        <h5 className="fw-bold mb-1">
                            <i className="fas fa-code me-2 text-primary"></i>
                            Charlyanimado
                        </h5>
                        <p className="footer-text small mb-1">
                            Un espacio dedicado al desarrollo web, tecnología y aprendizaje continuo. 
                            Compartiendo conocimientos y experiencias en el mundo del código.
                        </p>
                        <div className="social-links">
                            <a href="https://github.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github fs-4"></i>
                            </a>
                            <a href="https://linkedin.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fs-4"></i>
                            </a>
                            <a href="mailto:contact@charlyanimado.com" className="text-light">
                                <i className="fas fa-envelope fs-4"></i>
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-3 col-md-6 offset-lg-5 mb-1">
                        <h6 className="fw-bold mb-1">Newsletter</h6>
                        <p className="footer-text small mb-1">
                            Suscríbete para recibir las últimas actualizaciones y contenido.
                        </p>
                        <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Tu email"
                                aria-label="Email"
                            />
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-secondary" />

                {/* Bottom Footer */}
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 footer-text small">
                            &copy; {currentYear} Charlyanimado. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 footer-text small">
                            Hecho con <i className="fas fa-heart text-danger"></i> y React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;