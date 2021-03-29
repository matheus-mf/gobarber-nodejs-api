import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import ProviderDayAvailabilityController from '../controlles/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controlles/ProviderMonthAvailabilityController';
import ProvidersController from '../controlles/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
