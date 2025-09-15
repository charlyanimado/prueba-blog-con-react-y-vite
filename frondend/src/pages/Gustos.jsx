function Gustos() {
  return (
    <div className="row">
      {/* Desktop: Side information panel */}
      <div className="col-lg-3 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <h5>Mis Intereses</h5>
          <p className="small mb-3">Una colección de las cosas que me inspiran y motivan día a día.</p>
          
          <h6>Categorías</h6>
          <div className="tech-tags mb-3">
            <span className="badge bg-primary me-1 mb-1">🎵 Música</span>
            <span className="badge bg-secondary me-1 mb-1">🎨 Arte</span>
            <span className="badge bg-success me-1 mb-1">💻 Tech</span>
            <span className="badge bg-info me-1 mb-1">🎪 Eventos</span>
          </div>
          
          <h6>Enlaces relacionados</h6>
          <ul className="list-unstyled small">
            <li><a href="https://open.spotify.com" className="text-decoration-none">🎧 Mi Spotify</a></li>
            <li><a href="https://github.com/charlyanimado" className="text-decoration-none">💻 Mi GitHub</a></li>
            <li><a href="/aprender" className="text-decoration-none">📚 Aprender</a></li>
          </ul>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Me gusta</h1>
          <div className="d-none d-md-block">
            <small className="text-muted">Las cosas que me inspiran</small>
          </div>
        </div>
        
        <div className="d-lg-none mb-4">
          <div className="content-card">
            <p className="mb-0">En esta sección, compartiré algunas de las cosas que me gustan y que me inspiran.</p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-music text-primary me-2"></i>La música</h5>
              <p>Me encanta escuchar todo tipo de música, desde rock hasta música clásica. La música es una fuente constante de inspiración y creatividad en mi vida diaria.</p>
              <div className="mt-auto">
                <span className="badge bg-primary">Rock</span>
                <span className="badge bg-secondary ms-1">Clásica</span>
                <span className="badge bg-info ms-1">Electrónica</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-palette text-warning me-2"></i>El dibujo y la animación</h5>
              <p>Me gusta expresar mi creatividad a través del arte y la animación. Obviamente, no soy el más experto, pero disfruto aprendiendo y mejorando constantemente.</p>
              <div className="mt-auto">
                <span className="badge bg-warning">Dibujo</span>
                <span className="badge bg-danger ms-1">Animación</span>
                <span className="badge bg-success ms-1">Digital Art</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-laptop-code text-success me-2"></i>La tecnología</h5>
              <p>Siempre trato de estar al tanto de las últimas tecnologías y desarrollo web. La innovación tecnológica me fascina y motiva a seguir aprendiendo.</p>
              <div className="mt-auto">
                <span className="badge bg-success">Web Dev</span>
                <span className="badge bg-primary ms-1">IA</span>
                <span className="badge bg-info ms-1">DevOps</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-users text-info me-2"></i>Las convenciones</h5>
              <p>Últimamente he estado asistiendo a varias convenciones de tecnología y anime, y me encanta conocer a personas con intereses similares.</p>
              <div className="mt-auto">
                <span className="badge bg-info">Tech Conferences</span>
                <span className="badge bg-secondary ms-1">Anime</span>
                <span className="badge bg-primary ms-1">Networking</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="content-card mt-4">
          <h5>¿Qué me inspira?</h5>
          <p>Todas estas pasiones se complementan entre sí. La música me ayuda a concentrarme mientras programo, el arte me da una perspectiva diferente para resolver problemas de UX/UI, la tecnología me mantiene actualizado, y las convenciones me permiten conectar con una comunidad increíble de personas que comparten mis intereses.</p>
        </div>
      </div>
    </div>
  );
}

export default Gustos;
