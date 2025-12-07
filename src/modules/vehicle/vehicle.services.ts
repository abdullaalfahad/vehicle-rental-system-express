import { pool } from '../../config/db';

const createVehicle = async (payload: Record<string, any>) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } =
    payload;

  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );

  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getVehicleById = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
  return result.rows[0];
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
};
