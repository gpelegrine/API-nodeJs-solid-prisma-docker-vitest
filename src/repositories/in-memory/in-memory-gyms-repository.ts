import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomInt } from 'crypto'

export class InMemoryGymsRepository implements GymsRepository {
  items: Gym[] = []

  async findByUserId(id: number) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
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
