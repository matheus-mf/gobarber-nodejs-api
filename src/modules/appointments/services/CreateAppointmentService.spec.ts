import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
      user_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointments on the same time', async () => {
    const appointmentData = new Date(2022, 10, 2);
    await createAppointment.execute({
      date: appointmentData,
      provider_id: '123123',
      user_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentData,
        provider_id: '123123',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
