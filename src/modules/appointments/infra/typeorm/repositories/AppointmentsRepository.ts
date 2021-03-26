import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository, Raw } from 'typeorm';

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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    return this.omrRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFielName =>
            `to_char(${dateFielName}, MM-YYYY) = '${parsedMonth}-${year}'`,
        ),
      },
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
