import { Request, Response } from 'express';
import { vehicleServices } from './vehicle.services';

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);

    res.status(201).send({
      success: true,
      message: 'Vehicle created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();

    res.status(200).send({
      success: true,
      message: result.length ? 'Vehicles retrieved successfully' : 'No vehicles found',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
  getAllVehicles,
};
