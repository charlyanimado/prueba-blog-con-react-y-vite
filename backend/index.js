// 1. Importaciones
const express = require('express'); 
const mysql = require('mysql2'); 
const cors = require('cors');

console.log('✅ 1. Script iniciado y dependencias cargadas.');

// 2. Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middleware para entender JSON
// Esto le enseña a Express a leer los datos JSON que enviará React
app.use(cors());
app.use(express.json());

console.log('✅ 2. Aplicación Express y middleware configurados.');




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
  const { nombre, email, password, currentPassword } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Nombre y email son obligatorios' });
  }

  // Si se está intentando cambiar la contraseña, validar la contraseña actual
  if (password && currentPassword) {
    // Primero verificamos la contraseña actual
    const checkPasswordSql = "SELECT password FROM usuarios WHERE id = ?";
    
    db.query(checkPasswordSql, [userId], (checkError, checkResults) => {
      if (checkError) {
        console.error('Error al verificar contraseña:', checkError);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (checkResults.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar que la contraseña actual sea correcta
      if (checkResults[0].password !== currentPassword) {
        return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
      }

      // Si la contraseña actual es correcta, actualizar con la nueva contraseña
      const updateSql = "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?";
      const updateParams = [nombre, email, password, userId];

      db.query(updateSql, updateParams, (updateError, updateResult) => {
        if (updateError) {
          console.error('Error al actualizar el usuario:', updateError);
          return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }

        res.json({ message: 'Usuario y contraseña actualizados exitosamente' });
      });
    });
  } else {
    // Actualización normal sin cambio de contraseña
    let sql = "UPDATE usuarios SET nombre = ?, email = ?";
    let params = [nombre, email];

    if (password && !currentPassword) {
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
  }
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

// --- RUTA PARA SUSCRIPCIÓN AL NEWSLETTER ---
app.post('/newsletter/subscribe', (req, res) => {
  const { email } = req.body;

  // Validación básica
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  // Verificar si el email ya está suscrito
  const checkSql = "SELECT email FROM newsletter_subscriptions WHERE email = ?";
  db.query(checkSql, [email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error al verificar suscripción:', checkError);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Este email ya está suscrito al newsletter' });
    }

    // Insertar nueva suscripción
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

// --- RUTA PARA OBTENER ESTADÍSTICAS DEL NEWSLETTER (ADMIN) ---
app.get('/newsletter/stats', (req, res) => {
  const sql = "SELECT COUNT(*) as total_subscribers, COUNT(CASE WHEN activo = 1 THEN 1 END) as active_subscribers FROM newsletter_subscriptions";
  
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener estadísticas:', error);
      return res.status(500).json({ message: 'Error al obtener estadísticas' });
    }

    res.json({
      total_subscribers: results[0].total_subscribers,
      active_subscribers: results[0].active_subscribers
    });
  });
});

// --- RUTA PARA FORMULARIO DE CONTACTO ---
app.post('/contact', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Nombre, email y mensaje son requeridos' });
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  // Validar longitud del mensaje
  if (mensaje.length < 10) {
    return res.status(400).json({ message: 'El mensaje debe tener al menos 10 caracteres' });
  }

  if (mensaje.length > 500) {
    return res.status(400).json({ message: 'El mensaje no puede superar los 500 caracteres' });
  }

  // Crear tabla si no existe
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      asunto VARCHAR(255),
      mensaje TEXT NOT NULL,
      fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      leido BOOLEAN DEFAULT FALSE,
      INDEX idx_fecha (fecha_envio),
      INDEX idx_leido (leido)
    )
  `;

  // Primero crear la tabla si no existe, luego insertar el mensaje
  db.query(createTableSql, (createError) => {
    if (createError) {
      console.error('Error al crear la tabla contact_messages:', createError);
    }

    // Insertar mensaje de contacto
    const insertSql = "INSERT INTO contact_messages (nombre, email, asunto, mensaje, fecha_envio, leido) VALUES (?, ?, ?, ?, NOW(), 0)";
    
    db.query(insertSql, [nombre, email, asunto || 'Sin asunto', mensaje], (error, result) => {
      if (error) {
        console.error('Error al guardar mensaje de contacto:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Check if it's a table doesn't exist error
        if (error.code === 'ER_NO_SUCH_TABLE') {
          return res.status(500).json({ 
            message: 'La tabla contact_messages no existe. Por favor, crea la tabla en tu base de datos.',
            sqlError: 'Tabla no encontrada'
          });
        }
        
        return res.status(500).json({ 
          message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
          sqlError: error.message 
        });
      }

      res.status(201).json({ 
        message: '¡Mensaje enviado correctamente! Te responderemos lo antes posible.',
        messageId: result.insertId 
      });
    });
  });
});

// --- RUTA PARA OBTENER MENSAJES DE CONTACTO (ADMIN) ---
app.get('/contact/messages', (req, res) => {
  const sql = "SELECT id, nombre, email, asunto, mensaje, fecha_envio, leido FROM contact_messages ORDER BY fecha_envio DESC";
  
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener mensajes:', error);
      return res.status(500).json({ message: 'Error al obtener mensajes' });
    }

    res.json(results);
  });
});

// --- RUTA PARA MARCAR MENSAJE COMO LEÍDO (ADMIN) ---
app.put('/contact/messages/:id/read', (req, res) => {
  const messageId = req.params.id;
  
  const sql = "UPDATE contact_messages SET leido = 1 WHERE id = ?";
  
  db.query(sql, [messageId], (error, result) => {
    if (error) {
      console.error('Error al marcar mensaje como leído:', error);
      return res.status(500).json({ message: 'Error al actualizar mensaje' });
    }

    res.json({ message: 'Mensaje marcado como leído' });
  });
});

// --- RUTA PARA OBTENER ESTADÍSTICAS DE CONTACTO (ADMIN) ---
app.get('/contact/stats', (req, res) => {
  const sql = "SELECT COUNT(*) as total_messages, COUNT(CASE WHEN leido = 0 THEN 1 END) as unread_messages FROM contact_messages";
  
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener estadísticas de contacto:', error);
      return res.status(500).json({ message: 'Error al obtener estadísticas' });
    }

    res.json({
      total_messages: results[0].total_messages,
      unread_messages: results[0].unread_messages
    });
  });
});

// Intentamos conectar a la base de datos
db.connect((error) => {
  if (error) {
    // Si la conexión falla, la aplicación se detendrá y mostrará un error claro.
    console.error('❌ ERROR FATAL AL CONECTAR A LA BASE DE DATOS:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }

  console.log('✅ 4. Conexión a la base de datos exitosa.');

  // --- INICIAR EL SERVIDOR ---
  // SOLO SI LA CONEXIÓN ES EXITOSA, PROCEDEMOS A INICIAR EL SERVIDOR.
  app.listen(PORT, () => {
    console.log(`🚀 5. Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
});

// --- MANEJO DE ERRORES NO CAPTURADOS ---
process.on('uncaughtException', (err) => {
  console.error('❌ Error no capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Promesa rechazada no manejada:', err);
  process.exit(1);
});