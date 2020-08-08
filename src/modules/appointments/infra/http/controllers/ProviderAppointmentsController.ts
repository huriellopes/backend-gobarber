import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService.ts';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { day, month, year } = req.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointmentsService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id: id,
    });

    return res.json(classToClass(appointments));
  }
}
