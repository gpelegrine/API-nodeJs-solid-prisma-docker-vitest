import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './error/user-already-exists-error'
import { User } from '@prisma/client'

interface registerServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async mutationCreate({
    name,
    email,
    password,
  }: registerServiceRequest): Promise<RegisterUserCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
