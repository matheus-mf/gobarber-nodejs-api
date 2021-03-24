import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import passwordsRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);
router.use('/password', passwordsRouter);
router.use('/profile', profileRouter);
router.use('/providers', providersRouter);

export default router;
