import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository'
import { FindManyNearbyGymsUserCase } from '../services/findMany-nearby-gyms'

export function makeFindManyNerbyUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new FindManyNearbyGymsUserCase(gymRepository)

  return useCase
}
