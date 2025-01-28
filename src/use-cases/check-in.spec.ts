import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
   checkInsRepository = new InMemoryCheckInsRepository();
   sut = new CheckInUseCase(checkInsRepository);

   vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  })

  it('should be able to check in', async () => {
   vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

   const { checkIn } = await sut.execute({
    userId: 'user-id',
    gymId: 'gym-id',
   });

   expect(checkIn.id).toEqual(expect.any(String));
 })

 it('should not be able to check in twice on the same day', async () => {
   await sut.execute({
    userId: 'user-id',
    gymId: 'gym-id',
   });

  await expect(() => sut.execute({
    userId: 'user-id',
    gymId: 'gym-id',
   }),
  ).rejects.toBeInstanceOf(Error);
 })

 it('should be able to check in twice on different days', async () => {
  vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

   await sut.execute({
    userId: 'user-id',
    gymId: 'gym-id',
   });

   vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

  const { checkIn } = await sut.execute({
    userId: 'user-id',
    gymId: 'gym-id',
   });

   expect(checkIn.id).toEqual(expect.any(String));
 })
});


/**
 * TDD - Test-Driven Design
 * 
 * Etapa 1 - Red (falhar o teste)
 * 
 * Etapa 2 - Green (codar o mínimo para o teste passar)
 * 
 * Etapa 3 - Refactor (refatorar o código)
 */