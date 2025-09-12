function Blog() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <div className="content-card">
          <h4>Acerca de mí</h4>
          <p className="mb-0">Soy una persona curiosa y dedicada, con interés en el desarrollo web, bases de datos y programación móvil. Además, busco aprender más sobre PHP, MySQL, JavaScript, Kotlin y Jetpack Compose, incluso explorando el aprendizaje del inglés. También tengo interés en Desarrollo DevOps, Flutter.</p>
        </div>
        
        <h1 className="mt-5">Últimas Entradas</h1>
        
        <article className="content-card">
          <h2><a href="https://www.twitch.tv/videos/2525615573">Comparativa Editores de Código con IA</a></h2>
          <p className="blog-post-meta">Julio 31, 2025 por <a href="https://www.linkedin.com/in/midudev/recent-activity/all/">midudev</a></p>
          <p>En este emocionante stream, midudev realiza un análisis exhaustivo de los principales editores de código potenciados por IA que están transformando el desarrollo de software en 2025. La comparativa incluye GitHub Copilot, Amazon CodeWhisperer, Tabnine, y otros asistentes emergentes, evaluando aspectos cruciales como la precisión de las sugerencias, velocidad de respuesta, soporte de lenguajes, y precio. A través de ejemplos prácticos y casos de uso reales, descubriremos cuál de estas herramientas ofrece la mejor experiencia para diferentes tipos de desarrolladores, desde principiantes hasta expertos. Un análisis imprescindible para entender el presente y futuro de la programación asistida por IA.</p>
        </article>
        
        <article className="content-card">
          <h2><a href="https://github.com/features/copilot?locale=es-419">GitHub copilot</a></h2>
          <p className="blog-post-meta">Julio 30, 2025 por <a href="https://www.linkedin.com/in/carlosmroca/">Charly</a></p>
          <p>GitHub Copilot, el asistente de IA que está revolucionando el desarrollo de software. Con la capacidad de sugerir código en tiempo real, completar funciones enteras y ayudar en la documentación, esta herramienta se ha convertido en un tema candente de debate en la comunidad desarrolladora. ¿Mejora realmente la productividad? ¿Qué impacto tiene en el aprendizaje de nuevos programadores? Exploraremos estas preguntas y compartiremos experiencias reales de uso.</p>
        </article>
        
        <article className="content-card">
          <h2><a href="https://kiro.dev/blog/introducing-kiro/">Kiro IDE </a></h2>
          <p className="blog-post-meta">Julio 23, 2025 por <a href="https://www.linkedin.com/in/carlosmroca/">Charly</a></p>
          <p>Kiro IDE emerge como una nueva alternativa en el mundo del desarrollo. Este innovador entorno de desarrollo promete una experiencia más fluida y personalizable que sus competidores. Con características únicas como su motor de IA integrado, temas dinámicos que se adaptan a tu código, y un sistema de extensiones revolucionario, Kiro está generando gran expectativa en la comunidad. Analizaremos en profundidad sus características, rendimiento y si realmente puede competir con los gigantes establecidos como VS Code.</p>
        </article>
      </div>
    </div>
  );
}

export default Blog;
