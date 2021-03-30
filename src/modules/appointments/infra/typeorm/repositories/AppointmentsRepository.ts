import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private omrRepository: Repository<Appointment>;

  constructor() {
    this.omrRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    return this.omrRepository.findOne({
      where: { date, provider_id },
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
            `to_char(${dateFielName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });
  }

  findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    return this.omrRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFielName =>
            `to_char(${dateFielName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });
  }

  public async create({
    date,
    user_id,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.omrRepository.create({
      provider_id,
      date,
      user_id,
    });

    await this.omrRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
