import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { vehicleControllers } from './vehicle.controllers';

const router: Router = Router();

router.post('/', auth('admin'), vehicleControllers.createVehicle);
router.get('/', vehicleControllers.getAllVehicles);

export const vehicleRoutes = router;
