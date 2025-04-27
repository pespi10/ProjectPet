const mysql = require('mysql2/promise');

// Crear un pool de conexiones a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Usuario por defecto en MAMP
  password: 'root',     // Contraseña por defecto en MAMP
  database: 'project_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar la conexión
module.exports = pool;