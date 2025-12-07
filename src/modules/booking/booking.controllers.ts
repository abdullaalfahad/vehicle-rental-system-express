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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings(req.user!);

    res.status(200).send({
      success: true,
      message:
        req.user?.role === 'admin'
          ? 'Bookings retrieved successfully'
          : 'Your bookings retrieved successfully',
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
  getAllBookings,
};
