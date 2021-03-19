import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const router = Router();

router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);

export default router;
