import { Router } from 'express';
import { authControllers } from './auth.controllers';

const router: Router = Router();

router.post('/signup', authControllers.signup);

export const authRoutes = router;
