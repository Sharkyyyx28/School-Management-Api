const mysql = require('mysql2/promise');

// Configuration: Priority order is MYSQL_URL > DB_HOST variables > Defaults
const dbConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'school_management',
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
};

const pool = process.env.MYSQL_URL || process.env.DATABASE_URL
  ? mysql.createPool(process.env.MYSQL_URL || process.env.DATABASE_URL)
  : mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

const testConnection = async () => {
  try {
    console.log(`📡 Attempting to connect to DB at: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Failed to connect to MySQL database:', error.message);
    console.error('💡 TIP: Ensure DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, and DB_PORT are set in Render Environment Variables.');
    process.exit(1);
  }
};

module.exports = { pool, testConnection };
