import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parseDate);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ error: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parseDate);

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
