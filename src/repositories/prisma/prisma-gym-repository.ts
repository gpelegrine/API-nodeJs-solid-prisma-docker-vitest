import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyGym, GymsRepository } from '../gyms-repository'
import { prisma } from '../../lib/prisma'

export class PrismaGymRepository implements GymsRepository {
  async findByUserId(id: number) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async createGym(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async searchGym(searchMany: string, pageInfo: number) {
    const searchGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: searchMany,
        },
      },
      take: 20,
      skip: (pageInfo - 1) * 20,
    })

    return searchGyms
  }

  async findManyNearbyGyms({ latitude, longitude }: FindManyNearbyGym) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
