// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 9, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 11, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 12, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 13, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 14, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 15, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 16, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 25, 17, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 26, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      month: 7,
      year: 2020
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 24, available: true },
      { day: 25, available: false },
      { day: 26, available: true },
      { day: 27, available: true },
    ]));
  });
});
