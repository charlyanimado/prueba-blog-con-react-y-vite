// ===== BACKEND BLOG - VERSIÓN FINAL Y COMPLETA =====

// 1. Importaciones
const express = require('express'); 
const { Client } = require('pg'); // Usar pg para PostgreSQL
const cors = require('cors');

console.log('✅ 1. Script iniciado y dependencias cargadas.');

// 2. Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middleware
const corsOptions = {
  // ¡IMPORTANTE! Usa la URL exacta de tu frontend en Vercel.
  origin: 'https://prueba-blog-con-react-y-vite-bbb2b79a.vercel.app' 
};
app.use(cors(corsOptions));
app.use(express.json());
console.log('✅ 2. Aplicación Express y middleware configurados.');

// 4. Declarar la variable de la base de datos
let db;

// =================================================================
// 5. DEFINICIÓN DE TODAS LAS RUTAS DE LA API
// =================================================================

// Ruta de Health Check para Render/Vercel
app.get('/', (req, res) => {
  res.status(200).send('OK: Backend funcionando.');
});

// --- RUTA PARA LOGIN ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT u.id, u.nombre, u.email, u.password, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = $1";
  
  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error('Error en la consulta de login:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.rowCount === 0) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    const user = results.rows[0];
    if (password !== user.password) { 
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    res.json({ 
      message: 'Login exitoso', 
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } 
    });
  });
});

// --- RUTAS CRUD DE USUARIOS ---

// OBTENER TODOS LOS USUARIOS
app.get('/usuarios', (req, res) => {
  const sql = "SELECT id, nombre, email, password, fecha_registro FROM usuarios ORDER BY id DESC";
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      return res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
    res.json(results.rows);
  });
});

// OBTENER UN USUARIO POR ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, nombre, email, password FROM usuarios WHERE id = $1";
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(results.rows[0]);
  });
});

// CREAR (REGISTRAR) UN NUEVO USUARIO
app.post('/usuarios', (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
  }
  const checkEmailSql = "SELECT email FROM usuarios WHERE email = $1";
  db.query(checkEmailSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar email:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    if (checkResults.rowCount > 0) {
      return res.status(409).json({ message: 'Este email ya está registrado' });
    }
    const insertSql = "INSERT INTO usuarios (nombre, email, password, rol_id, fecha_registro) VALUES ($1, $2, $3, 2, NOW()) RETURNING id";
    db.query(insertSql, [nombre, email, password], (insertError, insertResult) => {
      if (insertError) {
        console.error('Error al crear usuario:', insertError);
        return res.status(500).json({ message: 'Error al crear el usuario' });
      }
      res.status(201).json({ 
        message: 'Usuario creado exitosamente',
        userId: insertResult.rows[0].id 
      });
    });
  });
});

// ACTUALIZAR USUARIO
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ message: 'Nombre y email son requeridos' });
  }
  let sql, params;
  if (password) {
    sql = "UPDATE usuarios SET nombre = $1, email = $2, password = $3 WHERE id = $4";
    params = [nombre, email, password, id];
  } else {
    sql = "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3";
    params = [nombre, email, id];
  }
  db.query(sql, params, (error, results) => {
    if (error) {
      console.error('Error al actualizar usuario:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  });
});

// ELIMINAR USUARIO
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = $1";
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar usuario:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});


// --- RUTA PARA NEWSLETTER ---
app.post('/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }
  const checkSql = "SELECT email FROM newsletter_subscriptions WHERE email = $1";
  db.query(checkSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar suscripción:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    if (checkResults.rowCount > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito' });
    }
    const insertSql = "INSERT INTO newsletter_subscriptions (email) VALUES ($1) RETURNING id";
    db.query(insertSql, [email], (insertError, insertResult) => {
      if (insertError) {
        console.error('Error al suscribir al newsletter:', insertError);
        return res.status(500).json({ message: 'Error al procesar la suscripción' });
      }
      res.status(201).json({ 
        message: '¡Suscripción exitosa!',
        subscriptionId: insertResult.rows[0].id
      });
    });
  });
});


// --- RUTA PARA FORMULARIO DE CONTACTO ---
app.post('/contact', (req, res) => {
  const { nombre, email, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Nombre, email y mensaje son requeridos' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }
  const sql = "INSERT INTO contactos (nombre, email, mensaje, fecha_envio) VALUES ($1, $2, $3, NOW()) RETURNING id";
  db.query(sql, [nombre, email, mensaje], (error, results) => {
    if (error) {
      console.error('Error al guardar mensaje de contacto:', error);
      return res.status(500).json({ message: 'Error al procesar el mensaje' });
    }
    res.status(201).json({ 
      message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
      contactId: results.rows[0].id 
    });
  });
});


// =================================================================
// 6. CONECTAR A LA BASE DE DATOS E INICIAR EL SERVIDOR (AL FINAL)
// =================================================================

console.log('⏳ 3. Configurando conexión a la base de datos...');
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ ERROR FATAL: La variable de entorno DATABASE_URL no está definida.');
  process.exit(1);
}

db = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((error) => {
  if (error) {
    console.error('❌ ERROR FATAL AL CONECTAR A LA BASE DE DATOS:', error);
    process.exit(1);
  }
  console.log('✅ 4. Conexión a la base de datos exitosa.');

  // Si la conexión es exitosa, iniciamos el servidor
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 5. Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
});