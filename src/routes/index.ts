import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const router = Router();

router.use('/appointments', appointmentsRouter);

export default router;
