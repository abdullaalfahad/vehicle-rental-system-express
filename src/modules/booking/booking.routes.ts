import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { bookingControllers } from './booking.controllers';

const router: Router = Router();

router.post('/', auth('admin', 'customer'), bookingControllers.createBooking);
router.get('/', auth('admin', 'customer'), bookingControllers.getAllBookings);
router.put('/:id', auth('admin', 'customer'), bookingControllers.updateBooking);

export const bookingRoutes = router;
