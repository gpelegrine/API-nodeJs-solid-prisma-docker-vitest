import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../checkin-repository'
import { prisma } from '../../lib/prisma'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async countByUserId(userId: number) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async findByUserIdOnDate(userId: number, date: Date) {
    throw new Error('Method not implemented.')
  }

  async findManyByUserHistory(userId: number, pageInfo: number) {
    const UserHistory = await prisma.checkIn.findMany({
      where: {
        user_id: {
          equals: userId,
        },
      },
      take: (pageInfo - 1) * 20,
      skip: 0,
    })

    return UserHistory
  }

  async findById(id: number) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
