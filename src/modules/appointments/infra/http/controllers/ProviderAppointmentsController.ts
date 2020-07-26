import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService.ts';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { day, month, year } = req.body;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointmentsService.execute({
      day,
      month,
      year,
      provider_id: id,
    });

    return res.json(appointments);
  }
}
