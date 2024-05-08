import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../services/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
