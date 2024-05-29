import { PrismaCheckInsRepository } from '../repositories/prisma/prisma-check-ins-repository'
import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository'
import { CheckInService } from '../services/check-in'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymRepository = new PrismaGymRepository()
  const useCase = new CheckInService(
    prismaCheckInsRepository,
    prismaGymRepository,
  )

  return useCase
}
