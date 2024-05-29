import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository'
import { CreateGymUserCase } from '../services/create-gym'

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new CreateGymUserCase(gymRepository)

  return useCase
}
