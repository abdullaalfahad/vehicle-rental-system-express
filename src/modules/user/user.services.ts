import { JwtPayload } from 'jsonwebtoken';
import { pool } from '../../config/db';

const getAllUsers = async () => {
  const results = await pool.query(`SELECT id, name, email, phone, role FROM users`);
  return results.rows;
};

const updateUser = async (id: string, payload: Record<string, any>, user: JwtPayload) => {
  if (user.role === 'customer' && user.id !== parseInt(id)) {
    throw new Error("You don't have permission to update this user");
  }

  const allowedFields = ['name', 'email', 'phone', 'role'] as const;
  const updates: Record<string, any> = {};

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields provided for update');
  }

  const setParts: string[] = [];
  const values: any[] = [];

  Object.entries(updates).forEach(([field, value], idx) => {
    setParts.push(`${field} = $${idx + 1}`);
    values.push(value);
  });

  values.push(id);

  const result = await pool.query(
    `
    UPDATE users
    SET ${setParts.join(', ')}
    WHERE id = $${values.length}
    RETURNING id, name, email, phone, role
  `,
    values
  );

  return result.rows[0];
};

const deleteUser = async (id: string) => {
  const activeBookings = await pool.query(
    `SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookings.rowCount! > 0) {
    throw new Error('Cannot delete user with active bookings');
  }

  await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return;
};

export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
