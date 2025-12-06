import { Pool } from 'pg';
import { config } from '.';

export const pool = new Pool({
  connectionString: config.connectionString,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL, 
            password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 6),
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'admin'))
        )`);
};

export default initDB;
