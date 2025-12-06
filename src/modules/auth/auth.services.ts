import bycrypt from 'bcryptjs';
import { pool } from '../../config/db';
import { signToken } from '../../utils/token';

const signup = async (payload: Record<string, any>) => {
  const passwordHash = await bycrypt.hash(payload.password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [payload.name, payload.email, passwordHash, payload.phone, payload.role]
  );
  return result.rows[0];
};

const signin = async (payload: Record<string, any>) => {
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [payload.email]);

  if (user.rowCount === 0) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bycrypt.compare(payload.password, user.rows[0].password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const { id, name, email, phone, role } = user.rows[0];

  const token = signToken({ id, email, role });

  const result = {
    token,
    user: { id, name, email, phone, role },
  };

  return result;
};

export const authServices = {
  signup,
  signin,
};
