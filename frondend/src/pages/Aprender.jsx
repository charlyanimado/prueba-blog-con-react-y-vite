function Aprender() {
  return (
    <div className="row">
      {/* Desktop: Side information panel */}
      <div className="col-lg-3 d-none d-lg-block">
        <div className="content-card sticky-sidebar">
          <h5>Mi Journey 2025</h5>
          <p className="small mb-3">Un roadmap de tecnologías que quiero dominar este año.</p>
          
          <h6>Progreso actual</h6>
          <div className="mb-3">
            <small className="d-block">JavaScript</small>
            <div className="progress mb-2" style={{height: '8px'}}>
              <div className="progress-bar bg-success" style={{width: '15%'}}></div>
            </div>
            <small className="d-block">React</small>
            <div className="progress mb-2" style={{height: '8px'}}>
              <div className="progress-bar bg-primary" style={{width: '25%'}}></div>
            </div>
            <small className="d-block">Node.js</small>
            <div className="progress mb-2" style={{height: '8px'}}>
              <div className="progress-bar bg-info" style={{width: '10%'}}></div>
            </div>
          </div>
          
          <h6>Recursos útiles</h6>
          <ul className="list-unstyled small">
            <li><a href="https://midu.link/cursos" className="text-decoration-none">📚 Cursos Midu</a></li>
            <li><a href="https://developer.mozilla.org" className="text-decoration-none">📖 MDN Docs</a></li>
            <li><a href="https://github.com/charlyanimado" className="text-decoration-none">💻 Mi GitHub</a></li>
          </ul>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Aprender en 2025</h1>
          <div className="d-none d-md-block">
            <small className="text-muted">10 tecnologías en mi radar</small>
          </div>
        </div>
        
        <div className="d-lg-none mb-4">
          <div className="content-card">
            <p className="mb-0">Me gustaría aprender más sobre nuevas tecnologías, especialmente en el ámbito del desarrollo web, móvil, frameworks y el DevOps.</p>
          </div>
        </div>
        
        <div className="row">
          {/* Frontend Technologies */}
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fab fa-js text-warning me-2"></i>Frontend Development</h5>
              <p className="small mb-3">Tecnologías del lado del cliente que quiero dominar.</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="badge bg-warning text-dark me-2">JavaScript</span>
                  <small>Profundizar en ES6+ y patrones avanzados</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-primary me-2">React</span>
                  <small>Hooks, Context API, y optimización</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-info me-2">Astro</span>
                  <small>Framework moderno para sitios estáticos</small>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Backend Technologies */}
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-server text-success me-2"></i>Backend Development</h5>
              <p className="small mb-3">Tecnologías del servidor y bases de datos.</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="badge bg-success me-2">Node.js</span>
                  <small>APIs REST y GraphQL</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-secondary me-2">PHP</span>
                  <small>Laravel y desarrollo moderno</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-primary me-2">MySQL</span>
                  <small>Optimización y diseño de BD</small>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mobile & Cross-platform */}
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-mobile-alt text-primary me-2"></i>Mobile Development</h5>
              <p className="small mb-3">Desarrollo multiplataforma y móvil.</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="badge bg-primary me-2">Flutter</span>
                  <small>Apps nativas multiplataforma</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-info me-2">Python</span>
                  <small>Automatización y data science</small>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Design & Others */}
          <div className="col-md-6 mb-4">
            <div className="content-card h-100">
              <h5><i className="fas fa-palette text-danger me-2"></i>Design & Skills</h5>
              <p className="small mb-3">Habilidades complementarias y diseño.</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="badge bg-danger me-2">UX/UI</span>
                  <small>Diseño centrado en el usuario</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-dark me-2">DevOps</span>
                  <small>CI/CD y deployment</small>
                </li>
                <li className="mb-2">
                  <span className="badge bg-warning text-dark me-2">English</span>
                  <small>Mejorar fluidez técnica</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="content-card mt-4">
          <h5>Mi Plan de Aprendizaje</h5>
          <p>Mi enfoque está en construir una base sólida en desarrollo full-stack, con especial énfasis en React y Node.js. Paralelamente, quiero explorar el desarrollo móvil con Flutter y mejorar mis habilidades de diseño UX/UI para crear experiencias más completas.</p>
          <div className="mt-3">
            <span className="badge bg-primary me-2">🎯 Objetivo 2025</span>
            <span className="badge bg-success me-2">💼 Full-Stack Developer</span>
            <span className="badge bg-info">🚀 Proyectos Reales</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aprender;
