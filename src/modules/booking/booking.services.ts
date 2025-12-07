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

export const bookingServices = {
  createBooking,
};
