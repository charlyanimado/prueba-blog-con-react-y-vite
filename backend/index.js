// ===== BACKEND BLOG - VERSIÓN FINAL PARA RAILWAY =====

// 1. Importaciones
const express = require('express'); 
const { Client } = require('pg');
const cors = require('cors');

console.log('✅ 1. Script iniciado y dependencias cargadas.');

// 2. Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middleware
const corsOptions = {
  origin: 'https://vercel.com/carlos-projects-bbb2b79a/prueba-blog-con-react-y-vite/31CFdLMdYMt71D987ZvBxrYnfA4t', // Permitir todas las fuentes (ajusta esto según tus necesidades de seguridad)
};
app.use(cors(corsOptions));
app.use(express.json());
console.log('✅ 2. Aplicación Express y middleware configurados.');

// 4. Declarar la variable de la base de datos
// La declaramos aquí para que esté disponible para todas las rutas.
let db;

// =================================================================
// 5. DEFINICIÓN DE TODAS LAS RUTAS DE LA API
// =================================================================
// Las rutas deben definirse aquí, antes de que el servidor se inicie.

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/api/test', (req, res) => {
  res.json({ message: '🚀 API funcionando' });
});

// RUTA PARA LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT u.id, u.nombre, u.email, u.password, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = $1";
  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error('Error en la consulta de login:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    const user = results[0];
    if (password !== user.password) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    res.json({ 
      message: 'Login exitoso', 
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } 
    });
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
    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito' });
    }
    const insertSql = "INSERT INTO newsletter_subscriptions (email) VALUES ($1)";
    db.query(insertSql, [email], (insertError, insertResult) => {
      if (insertError) {
        console.error('Error al suscribir al newsletter:', insertError);
        return res.status(500).json({ message: 'Error al procesar la suscripción' });
      }
      res.status(201).json({ 
        message: '¡Suscripción exitosa!',
        subscriptionId: insertResult.insertId 
      });
    });
  });
});


// =================================================================
// RUTAS CRUD DE USUARIOS
// =================================================================

// OBTENER TODOS LOS USUARIOS
app.get('/usuarios', (req, res) => {
  const sql = "SELECT u.id, u.nombre, u.email, u.password, u.fecha_registro, r.nombre as rol FROM usuarios u LEFT JOIN roles r ON u.rol_id = r.id ORDER BY u.id DESC";
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.json(results.rows);
  });
});

// OBTENER UN USUARIO POR ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT u.id, u.nombre, u.email, u.password, u.fecha_registro, r.nombre as rol FROM usuarios u LEFT JOIN roles r ON u.rol_id = r.id WHERE u.id = $1";
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(results.rows[0]);
  });
});

// CREAR NUEVO USUARIO
app.post('/usuarios', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
  }

  // Verificar si el email ya existe
  const checkEmailSql = "SELECT email FROM usuarios WHERE email = $1";
  db.query(checkEmailSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar email:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (checkResults.rows.length > 0) {
      return res.status(409).json({ message: 'Este email ya está registrado' });
    }

    // Insertar nuevo usuario (rol_id = 2 para usuario normal)
    const insertSql = "INSERT INTO usuarios (nombre, email, password, rol_id, fecha_registro) VALUES ($1, $2, $3, $4, NOW()) RETURNING id";
    db.query(insertSql, [nombre, email, password, 2], (insertError, insertResult) => {
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

  // Si se incluye password, actualizar con password
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

// =================================================================
// RUTA DE CONTACTO
// =================================================================

// RUTA PARA CONTACTO
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


// ... AQUÍ PUEDES AGREGAR MÁS RUTAS EN EL FUTURO ...


// =================================================================
// 6. CONECTAR A LA BASE DE DATOS E INICIAR EL SERVIDOR (AL FINAL)
// =================================================================

console.log('⏳ 3. Configurando conexión a la base de datos...');
const connectionString = process.env.DATABASE_URL;

// ...
db = new Client({ // Cambiamos a "new Client"
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((error) => {
  if (error) {
    console.error('❌ ERROR FATAL AL CONECTAR A LA BASE DE DATOS:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }

  console.log('✅ 4. Conexión a la base de datos exitosa.');

  // Si la conexión es exitosa, iniciamos el servidor
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 5. Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
});