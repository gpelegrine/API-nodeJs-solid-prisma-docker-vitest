import { Gym } from '@prisma/client'

export interface GymsRepository {
  findByUserId(id: number): Promise<Gym | null>
}
