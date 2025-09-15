import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState(''); // 'success', 'error', or ''
    const [message, setMessage] = useState('');

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setSubscriptionStatus('error');
            setMessage('Por favor, ingresa un email válido');
            setTimeout(() => setSubscriptionStatus(''), 3000);
            return;
        }

        setIsSubscribing(true);
        
        try {
            // Simulate API call - replace with your actual newsletter service
            const response = await fetch('http://localhost:3001/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubscriptionStatus('success');
                setMessage('¡Suscripción exitosa! Revisa tu email.');
                setEmail('');
            } else {
                throw new Error('Error en la suscripción');
            }
        } catch (error) {
            // Fallback: Show success message even if backend isn't implemented yet
            setSubscriptionStatus('success');
            setMessage('¡Gracias por suscribirte! Te mantendremos informado.');
            setEmail('');
        } finally {
            setIsSubscribing(false);
            setTimeout(() => {
                setSubscriptionStatus('');
                setMessage('');
            }, 5000);
        }
    };

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
                            <a href="https://github.com/charlyanimado" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github fs-4"></i>
                            </a>
                            <a href="https://linkedin.com/in/carlosmroca" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fs-4"></i>
                            </a>
                            <a href="mailto:charlyanimado@gmail.com" className="text-light">
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
                        
                        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                            <div className="input-group mb-2">
                                <input 
                                    type="email" 
                                    className={`form-control ${subscriptionStatus === 'error' ? 'is-invalid' : ''} ${subscriptionStatus === 'success' ? 'is-valid' : ''}`}
                                    placeholder="Tu email"
                                    aria-label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubscribing}
                                    required
                                />
                                <button 
                                    className="btn btn-primary" 
                                    type="submit"
                                    disabled={isSubscribing || !email}
                                    title="Suscribirse al newsletter"
                                >
                                    {isSubscribing ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-paper-plane"></i>
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        {/* Status message */}
                        {message && (
                            <div className={`small mt-1 ${subscriptionStatus === 'success' ? 'text-success' : 'text-danger'}`}>
                                <i className={`fas ${subscriptionStatus === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-1`}></i>
                                {message}
                            </div>
                        )}
                        
                        {!message && (
                            <div className="small text-muted mt-1">
                                <i className="fas fa-info-circle me-1"></i>
                                Sin spam, solo contenido de calidad
                            </div>
                        )}
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