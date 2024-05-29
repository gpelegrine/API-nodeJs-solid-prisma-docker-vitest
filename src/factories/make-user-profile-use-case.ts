import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { GetUsersProfile } from '../services/get-user-profile'

export function makeUserProfileUseCase() {
  const gymRepository = new PrismaUsersRepository()
  const useCase = new GetUsersProfile(gymRepository)

  return useCase
}
