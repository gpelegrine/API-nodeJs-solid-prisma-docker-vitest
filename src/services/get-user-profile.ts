import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface GetUsersProfileRequest {
  userId: number
}

interface GetUsersProfileResponse {
  user: User
}

export class GetUsersProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUsersProfileRequest): Promise<GetUsersProfileResponse> {
    const user = await this.usersRepository.findByUserId(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
