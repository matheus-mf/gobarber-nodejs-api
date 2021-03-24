import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import passwordsRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);
router.use('/password', passwordsRouter);

export default router;
