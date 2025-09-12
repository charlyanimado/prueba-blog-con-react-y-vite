import RegistroForm from '../components/RegistroForm'; // Usaremos un nuevo componente para el formulario

function RegistroPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="content-card">
            <RegistroForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroPage;