import bycrypt from 'bcryptjs';
import { pool } from '../../config/db';

const signup = async (payload: Record<string, any>) => {
  const passwordHash = await bycrypt.hash(payload.password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [payload.name, payload.email, passwordHash, payload.phone, payload.role]
  );
  return result.rows[0];
};

export const authServices = {
  signup,
};
