// ===== BACKEND BLOG CON REACT Y VITE =====
const express = require('express'); 
const mysql = require('mysql2'); 
const cors = require('cors');
require('dotenv').config();

console.log('✅ 1. Script iniciado y dependencias cargadas.');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

console.log('✅ 2. Aplicación Express y middleware configurados.');

// Configuración de la base de datos
let db = null;
let dbConnected = false;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blog_database'
  });
  console.log('✅ 3. Configuración de base de datos establecida.');
} catch (error) {
  console.error('❌ Error configurando base de datos:', error);
  db = null;
}

// Conectar a la base de datos
if (db) {
  db.connect(error => {
    if (error) {
      console.error('❌ ERROR AL CONECTAR A LA BASE DE DATOS:', error.message);
      console.log('⚠️  Continuando sin base de datos para desarrollo...');
      dbConnected = false;
    } else {
      console.log('✅ 4. Conexión a la base de datos exitosa.');
      dbConnected = true;
    }
  });
} else {
  console.log('⚠️  Sin configuración de base de datos - modo desarrollo.');
  dbConnected = false;
}

// ===== RUTAS DEL API =====

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '🚀 API funcionando correctamente', 
    timestamp: new Date().toISOString(),
    dbStatus: dbConnected ? 'conectada' : 'desconectada'
  });
});

// RUTA PARA LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Si no hay base de datos, usar datos simulados
  if (!dbConnected) {
    console.log('🔄 Simulando login sin base de datos');
    if (email === 'admin@test.com' && password === 'admin123') {
      return res.json({ 
        message: 'Login exitoso (simulado)', 
        user: { id: 1, nombre: 'Admin Test', email: email, rol: 'admin' } 
      });
    } else if (email === 'user@test.com' && password === 'user123') {
      return res.json({ 
        message: 'Login exitoso (simulado)', 
        user: { id: 2, nombre: 'Usuario Test', email: email, rol: 'usuario' } 
      });
    }
    return res.status(401).json({ message: 'Email o contraseña incorrectos (simulado)' });
  }

  // Consulta a la base de datos (cuando esté disponible)
  const sql = "SELECT u.id, u.nombre, u.email, u.password, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = ?";
  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
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

// RUTA PARA NEWSLETTER
app.post('/newsletter/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  // Si no hay base de datos, simular
  if (!dbConnected) {
    console.log('🔄 Simulando suscripción al newsletter sin base de datos');
    return res.status(201).json({ 
      message: '¡Suscripción exitosa! (simulado) Gracias por unirte a nuestro newsletter.',
      subscriptionId: Math.floor(Math.random() * 1000)
    });
  }

  // Código para base de datos (cuando esté disponible)
  const checkSql = "SELECT email FROM newsletter_subscriptions WHERE email = ?";
  db.query(checkSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar suscripción:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito al newsletter' });
    }

    const insertSql = "INSERT INTO newsletter_subscriptions (email, fecha_suscripcion, activo) VALUES (?, NOW(), 1)";
    db.query(insertSql, [email], (insertError, insertResult) => {
      if (insertError) {
        console.error('Error al suscribir al newsletter:', insertError);
        return res.status(500).json({ message: 'Error al procesar la suscripción' });
      }

      res.status(201).json({ 
        message: '¡Suscripción exitosa! Gracias por unirte a nuestro newsletter.',
        subscriptionId: insertResult.insertId 
      });
    });
  });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 4. Servidor iniciado en puerto ${PORT}`);
  console.log(`📱 Frontend disponible en: http://localhost:5173`);
  console.log(`🔗 API disponible en: http://localhost:${PORT}`);
  console.log(`🗄️  Base de datos: ${dbConnected ? 'Conectada' : 'Desconectada (modo desarrollo)'}`);
  console.log('');
  console.log('📋 Rutas disponibles:');
  console.log('   GET  /api/test           - Verificar API');
  console.log('   POST /login             - Iniciar sesión');  
  console.log('   POST /newsletter/subscribe - Suscribirse');
  console.log('');
  console.log('🔧 Credenciales de prueba (sin BD):');
  console.log('   admin@test.com / admin123');
  console.log('   user@test.com / user123');
});

// MANEJO DE ERRORES
process.on('uncaughtException', (err) => {
  console.error('❌ Error no capturado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Promesa rechazada no manejada:', err);
});