import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { bookingControllers } from './booking.controllers';

const router: Router = Router();

router.post('/', auth('admin', 'customer'), bookingControllers.createBooking);

export const bookingRoutes = router;
