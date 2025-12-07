import { JwtPayload } from 'jsonwebtoken';
import { pool } from '../../config/db';

const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    'SELECT * FROM vehicles WHERE id = $1 AND availability_status = $2',
    [vehicle_id, 'available']
  );

  if (vehicle.rowCount === 0) {
    throw new Error('Vehicle is not available for booking');
  }

  const days =
    (new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime()) / (1000 * 3600 * 24);
  const total_price = days * parseFloat(vehicle.rows[0].daily_rent_price);

  const status = 'active';

  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]
  );

  await pool.query('UPDATE vehicles SET availability_status = $1 WHERE id = $2', [
    'booked',
    vehicle_id,
  ]);

  return {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicle.rows[0].vehicle_name,
      daily_rent_price: vehicle.rows[0].daily_rent_price,
    },
  };
};

const getAllBookings = async (user: JwtPayload) => {
  // If customer — fetch only their bookings with vehicle info
  if (user.role === 'customer') {
    const query = `
      SELECT 
        b.id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        v.vehicle_name,
        v.registration_number,
        v.type
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
    `;

    const result = await pool.query(query, [user.id]);

    const data = result.rows.map((row) => ({
      id: row.id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type: row.type,
      },
    }));

    return data;
  }

  const query = `
    SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      u.name AS customer_name,
      u.email AS customer_email,
      v.vehicle_name,
      v.registration_number
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
  `;

  const result = await pool.query(query);

  const data = result.rows.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
    },
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
    },
  }));

  return data;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
};
