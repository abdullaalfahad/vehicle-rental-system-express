import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { userControllers } from './user.controllers';

const router: Router = Router();

router.get('/', auth('admin'), userControllers.getAllUsers);
router.put('/:id', auth('admin', 'customer'), userControllers.updateUser);

export const userRoutes = router;
