import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private omrRepository: Repository<Appointment>;

  constructor() {
    this.omrRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.omrRepository.findOne({
      where: { date },
    });
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.omrRepository.create({ provider_id, date });

    await this.omrRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
