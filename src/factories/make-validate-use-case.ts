import { PrismaCheckInsRepository } from '../repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../services/validate-check-in'

export function makeValidateUseCase() {
  const checkInValidate = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInService(checkInValidate)

  return useCase
}
