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
app.use(cors());
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
  const sql = "SELECT u.id, u.nombre, u.email, u.password, r.nombre as rol FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = ?";
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
  const checkSql = "SELECT email FROM newsletter_subscriptions WHERE email = ?";
  db.query(checkSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar suscripción:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito' });
    }
    const insertSql = "INSERT INTO newsletter_subscriptions (email) VALUES (?)";
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


// ... AQUÍ PUEDES PEGAR TUS OTRAS RUTAS (.../usuarios, .../contact, etc.) ...


// =================================================================
// 6. CONECTAR A LA BASE DE DATOS E INICIAR EL SERVIDOR (AL FINAL)
// =================================================================

console.log('⏳ 3. Configurando conexión a la base de datos...');
const connectionString = process.env.DATABASE_URL;

const { Client } = require('pg'); // Cambiamos la importación
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