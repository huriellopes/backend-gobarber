import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Soc : Separation of Concerns (Separação de preocupações)
// DTO - Data Transfer Object

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (_req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

// eslint-disable-next-line consistent-return
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
