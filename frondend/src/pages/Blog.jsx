function Blog() {
  return (
    <div className="row">
      {/* Desktop: Side information panel */}
      <div className="col-lg-3 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <h5>Acerca de mí</h5>
          <p className="small mb-3">Soy una persona curiosa y dedicada, con interés en el desarrollo web, bases de datos y programación móvil.</p>
          
          <h6>Tecnologías</h6>
          <div className="tech-tags mb-3">
            <span className="badge bg-primary me-1 mb-1">React</span>
            <span className="badge bg-secondary me-1 mb-1">Node.js</span>
            <span className="badge bg-success me-1 mb-1">MySQL</span>
            <span className="badge bg-info me-1 mb-1">JavaScript</span>
            <span className="badge bg-warning me-1 mb-1">PHP</span>
          </div>
          
          <h6>Enlaces rápidos</h6>
          <ul className="list-unstyled small">
            <li><a href="mailto:charlyanimado@gmail.com" className="text-decoration-none">📧 Contacto</a></li>
            <li><a href="https://github.com/charlyanimado" className="text-decoration-none">💼 Portfolio</a></li>
            <li><a href="https://midu.link/cursos" className="text-decoration-none">📚 Recursos</a></li>
          </ul>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-9">
        {/* Mobile: About section */}
        <div className="d-lg-none">
          <div className="content-card">
            <h4>Acerca de mí</h4>
            <p className="mb-0">Soy una persona curiosa y dedicada, con interés en el desarrollo web, bases de datos y programación móvil. Además, busco aprender más sobre PHP, MySQL, JavaScript, Kotlin y Jetpack Compose, incluso explorando el aprendizaje del inglés. También tengo interés en Desarrollo DevOps, Flutter.</p>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Últimas Entradas</h1>
          <div className="d-none d-md-block">
            <small className="text-muted">3 artículos publicados</small>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <article className="content-card h-100">
              <h5><a href="https://www.twitch.tv/videos/2525615573" className="text-decoration-none">Comparativa Editores de Código con IA</a></h5>
              <p className="blog-post-meta small text-muted">Julio 31, 2025 por <a href="https://www.linkedin.com/in/midudev/recent-activity/all/" className="text-decoration-none">midudev</a></p>
              <p className="small">En este emocionante stream, midudev realiza un análisis exhaustivo de los principales editores de código potenciados por IA que están transformando el desarrollo de software en 2025...</p>
              <a href="https://www.twitch.tv/videos/2525615573" className="btn btn-outline-primary btn-sm">Leer más</a>
            </article>
          </div>
          
          <div className="col-md-6 mb-4">
            <article className="content-card h-100">
              <h5><a href="https://github.com/features/copilot?locale=es-419" className="text-decoration-none">GitHub Copilot</a></h5>
              <p className="blog-post-meta small text-muted">Julio 30, 2025 por <a href="https://www.linkedin.com/in/carlosmroca/" className="text-decoration-none">Charly</a></p>
              <p className="small">GitHub Copilot, el asistente de IA que está revolucionando el desarrollo de software. Con la capacidad de sugerir código en tiempo real, completar funciones enteras y ayudar en la documentación...</p>
              <a href="https://github.com/features/copilot?locale=es-419" className="btn btn-outline-primary btn-sm">Leer más</a>
            </article>
          </div>
          
          <div className="col-12">
            <article className="content-card">
              <h5><a href="https://kiro.dev/blog/introducing-kiro/" className="text-decoration-none">Kiro IDE</a></h5>
              <p className="blog-post-meta small text-muted">Julio 23, 2025 por <a href="https://www.linkedin.com/in/carlosmroca/" className="text-decoration-none">Charly</a></p>
              <p>Kiro IDE emerge como una nueva alternativa en el mundo del desarrollo. Este innovador entorno de desarrollo promete una experiencia más fluida y personalizable que sus competidores. Con características únicas como su motor de IA integrado, temas dinámicos que se adaptan a tu código, y un sistema de extensiones revolucionario, Kiro está generando gran expectación en la comunidad.</p>
              <a href="https://kiro.dev/blog/introducing-kiro/" className="btn btn-primary">Leer artículo completo</a>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
