import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../checkin-repository'
import { randomInt } from 'crypto'

export class InMemoryCheckInRepository implements CheckInRepository {
  items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomInt(10000),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
