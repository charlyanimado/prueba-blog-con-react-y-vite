// 1. Importaciones
const express = require('express'); 
const mysql = require('mysql2'); 
const cors = require('cors');

// 2. Crear la aplicación Express
const app = express();
const PORT = 3001;

// 3. Middleware para entender JSON
// Esto le enseña a Express a leer los datos JSON que enviará React
app.use(cors());
app.use(express.json());

// 4. Configuración de la conexión a MySQL
// en un entorno de producción, no deberias de exponer tus credenciales
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '18970SOLpisco?',
  database: 'charly_SRL'
});
//para probar si mi base de datos se cayo o no 
db.connect(error => {
  if (error) {
    console.error('❌ ERROR AL CONECTAR A LA BASE DE DATOS:', error);
    return;
  }
  console.log('✅ Conexión a la base de datos MySQL exitosa.');
});

// 5. Crear la ruta POST para el login
app.post('/login', (req, res) => {
  // Obtenemos el email y la contraseña del cuerpo de la petición
  const { email, password } = req.body;

  // Creamos la consulta SQL para buscar al usuario por su email
  const sql = "SELECT u.id, u.nombre, u.email, u.password, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = ?";

  // Ejecutamos la consulta en la base de datos
  db.query(sql, [email], (error, results) => {
    // Si hay un error en la consulta
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Si no se encuentra ningún usuario con ese email
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Si se encontró el usuario, comparamos la contraseña
    const user = results[0];
    if (password !== user.password) { // ⚠️ ¡OJO! no sean sonso en un entorno real esto debe ir hasheado
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Si el email y la contraseña son correctos
    res.json({ message: 'Login exitoso', user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  });
});

// --- RUTA PARA CREAR (REGISTRAR) UN NUEVO USUARIO ---
app.post('/usuarios', (req, res) => {
  // Obtenemos los datos del nuevo usuario del cuerpo de la petición (que vendrá de React)
  const { nombre, email, password } = req.body;

  // Creamos la consulta SQL para insertar los datos en la tabla
  // Los signos de interrogación (?) son "placeholders" que nos protegen de ataques de inyección SQL
  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  
  // Ejecutamos la consulta en la base de datos
  db.query(sql, [nombre, email, password], (error, result) => {
    if (error) {
      // Si hay un error (por ejemplo, el email ya existe), lo reportamos
      console.error('Error al crear el usuario:', error);
      return res.status(500).json({ message: 'Error al crear el usuario. Es posible que el email ya esté en uso.' });
    }
    
    // Si todo sale bien, devolvemos una respuesta de éxito
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: result.insertId });
  });
});

app.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, email, password } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Nombre y email son obligatorios' });
  }

  // Creamos la consulta SQL para actualizar los datos del usuario
  let sql = "UPDATE usuarios SET nombre = ?, email = ?";
  let params = [nombre, email];

  if (password) {
    sql += ", password = ?";
    params.push(password);
  }

  sql += " WHERE id = ?";
  params.push(userId);

  // Ejecutamos la consulta en la base de datos
  db.query(sql, params, (error, result) => {
    if (error) {
      console.error('Error al actualizar el usuario:', error);
      return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }

    // Si todo sale bien, devolvemos una respuesta de éxito
    res.json({ message: 'Usuario actualizado exitosamente' });
  });
});

app.get('/usuarios', (req, res) => {
  const sql = "SELECT id, nombre, email, password, fecha_registro FROM usuarios";
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      return res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
    res.json(results);
  });
});
app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, nombre, email, password FROM usuarios WHERE id = ?";

  db.query(sql, [userId], (error, results) => {
    if (error || results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json(results[0]);
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;

  // Creamos la consulta SQL para eliminar al usuario
  const sql = "DELETE FROM usuarios WHERE id = ?";

  // Ejecutamos la consulta en la base de datos
  db.query(sql, [userId], (error, result) => {
    if (error) {
      console.error('Error al eliminar el usuario:', error);
      return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }

    // Si todo sale bien, devolvemos una respuesta de éxito
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// recuerda borrar los console.log en producción para evitar exponer información sensible