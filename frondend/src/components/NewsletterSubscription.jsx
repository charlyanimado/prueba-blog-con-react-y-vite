import { useState } from 'react';

function NewsletterSubscription({ 
    title = "Suscríbete al Newsletter", 
    description = "Recibe las últimas actualizaciones y contenido.",
    buttonText = "Suscribirse",
    placeholder = "Tu email",
    className = "",
    size = "normal" // "small", "normal", "large"
}) {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setSubscriptionStatus('error');
            setMessage('Por favor, ingresa un email válido');
            setTimeout(() => setSubscriptionStatus(''), 3000);
            return;
        }

        setIsSubscribing(true);
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubscriptionStatus('success');
                setMessage(data.message || '¡Suscripción exitosa!');
                setEmail('');
            } else {
                setSubscriptionStatus('error');
                setMessage(data.message || 'Error al suscribirse');
            }
        } catch (error) {
            setSubscriptionStatus('error');
            setMessage('Error de conexión. Intenta de nuevo.');
        } finally {
            setIsSubscribing(false);
            setTimeout(() => {
                setSubscriptionStatus('');
                setMessage('');
            }, 5000);
        }
    };

    // Determinar tamaños de clases según el prop size
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return {
                    title: 'h6',
                    description: 'small',
                    input: 'form-control-sm',
                    button: 'btn-sm'
                };
            case 'large':
                return {
                    title: 'h4',
                    description: '',
                    input: 'form-control-lg',
                    button: 'btn-lg'
                };
            default:
                return {
                    title: 'h5',
                    description: '',
                    input: '',
                    button: ''
                };
        }
    };

    const sizeClasses = getSizeClasses();

    return (
        <div className={`newsletter-subscription ${className}`}>
            {title && (
                <h5 className={`${sizeClasses.title} fw-bold mb-3`}>
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    {title}
                </h5>
            )}
            
            {description && (
                <p className={`${sizeClasses.description} text-muted mb-3`}>
                    {description}
                </p>
            )}
            
            <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group mb-3">
                    <input 
                        type="email" 
                        className={`form-control ${sizeClasses.input} ${
                            subscriptionStatus === 'error' ? 'is-invalid' : ''
                        } ${subscriptionStatus === 'success' ? 'is-valid' : ''}`}
                        placeholder={placeholder}
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubscribing}
                        required
                    />
                    <button 
                        className={`btn btn-primary ${sizeClasses.button}`}
                        type="submit"
                        disabled={isSubscribing || !email}
                        title="Suscribirse al newsletter"
                    >
                        {isSubscribing ? (
                            <>
                                <i className="fas fa-spinner fa-spin me-1"></i>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane me-1"></i>
                                {buttonText}
                            </>
                        )}
                    </button>
                </div>
            </form>
            
            {/* Mensaje de estado */}
            {message && (
                <div className={`alert ${
                    subscriptionStatus === 'success' ? 'alert-success' : 'alert-danger'
                } d-flex align-items-center mb-0`}>
                    <i className={`fas ${
                        subscriptionStatus === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                    } me-2`}></i>
                    {message}
                </div>
            )}
            
            {!message && (
                <div className="small text-muted">
                    <i className="fas fa-shield-alt me-1"></i>
                    Sin spam, solo contenido de calidad. Puedes cancelar en cualquier momento.
                </div>
            )}
        </div>
    );
}

export default NewsletterSubscription;