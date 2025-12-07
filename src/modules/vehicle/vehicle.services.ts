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

const updateVehicle = async (vehicleId: string, payload: Record<string, any>) => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const allowedFields = [
    'vehicle_name',
    'type',
    'registration_number',
    'daily_rent_price',
    'availability_status',
  ] as const;

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

  Object.entries(updates).forEach(([field, value], index) => {
    setParts.push(`${field} = $${index + 1}`);
    values.push(value);
  });

  values.push(vehicleId);

  const query = `
    UPDATE vehicles
    SET ${setParts.join(', ')}
    WHERE id = $${values.length}
    RETURNING *
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
};
