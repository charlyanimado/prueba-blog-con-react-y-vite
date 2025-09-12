function Contacto() {
  return (
    // Estructura contenedora para centrar y dar margen
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          {/* Usamos .content-card para el estilo visual */}
          <div className="content-card"> 
            <h1 className="text-center">Conversemos</h1>
            <p className="text-center">¿Tienes alguna pregunta? ¡Escríbeme!</p>

            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea className="form-control" id="mensaje" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contacto;