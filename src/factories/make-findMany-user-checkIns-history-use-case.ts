import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository'
import { FindManyNearbyGymsUserCase } from '../services/findMany-nearby-gyms'

export function makeFindManyUserCheckInHistoryUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new FindManyNearbyGymsUserCase(gymRepository)

  return useCase
}
