import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

/**
 * SOLID
 *
 * # Single Responsability Principle
 * Open Closed Principle
 * # Liskov Substitution Principle
 * Interface Segregation Principle
 * # Dependecy Invertion Principle
 */

/**
 * [x] Recebimento das informações
 * [x] Trativa de erros/excessões
 * [x] Acesso ao Repositório
 */

/**
 * Dependency Inversion (SOLID)
 */

// Dry Don't Repeat Yourself

/**
 * S: Single Responsability Principle
 * D: Dependecy Invertion Principle
 */

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
