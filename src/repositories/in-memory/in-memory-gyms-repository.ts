import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, FindManyNearbyGym } from '../gyms-repository'
import { randomInt } from 'crypto'
import { getDistanceBetweenCoordinates } from '../../services/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  items: Gym[] = []

  async findByUserId(id: number) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchGym(search: string, pageInfo: number) {
    return this.items
      .filter((item) => item.title.includes(search))
      .slice((pageInfo - 1) * 20, pageInfo * 20)
  }

  async findManyNearbyGyms(params: FindManyNearbyGym) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      )

      return distance < 10
    })
  }

  async createGym(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomInt(10000),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
