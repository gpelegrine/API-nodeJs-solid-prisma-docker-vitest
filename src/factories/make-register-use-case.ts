import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '../services/register'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserCase = new RegisterUserCase(prismaUsersRepository)

  return registerUserCase
}
