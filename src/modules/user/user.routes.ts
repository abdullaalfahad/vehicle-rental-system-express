import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { userControllers } from './user.controllers';

const router: Router = Router();

router.get('/', auth('admin'), userControllers.getAllUsers);
router.put('/:id', auth('admin', 'customer'), userControllers.updateUser);
router.delete('/:id', auth('admin'), userControllers.deleteUser);

export const userRoutes = router;
