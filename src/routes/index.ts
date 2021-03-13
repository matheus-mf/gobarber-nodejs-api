import { Router } from 'express';

import usersRouter from './users.routes';
import appointmentsRouter from './appointments.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);

export default router;
