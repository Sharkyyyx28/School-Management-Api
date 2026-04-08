require('dotenv').config();
const mysql = require('mysql2/promise');

const setupDatabase = async () => {
  let connection;

  try {
    const connectionUri = process.env.MYSQL_URL || process.env.DATABASE_URL;

    if (connectionUri) {
      console.log('📡 Connecting using connection URL...');
      connection = await mysql.createConnection(connectionUri);
    } else {
      console.log('📡 Connecting using individual variables...');
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT) || 3306,
      });
    }

    const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway';

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' is ready`);

    await connection.query(`USE \`${dbName}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id          INT           NOT NULL AUTO_INCREMENT,
        name        VARCHAR(255)  NOT NULL,
        address     VARCHAR(500)  NOT NULL,
        latitude    FLOAT         NOT NULL,
        longitude   FLOAT         NOT NULL,
        created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `);
    console.log("✅ Table 'schools' is ready");

    console.log('\n🎉 Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
};

setupDatabase();
