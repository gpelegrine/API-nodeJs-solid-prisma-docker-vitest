import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { CheckIn } from '@prisma/client'

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
