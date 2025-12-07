import { Request, Response } from 'express';
import { bookingServices } from './booking.services';

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).send({
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
};
