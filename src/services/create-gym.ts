import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface createGymServiceRequest {
  title: string
  description?: string
  phone: string | null
  latitude: number
  longitude: number
}

interface createGymUserCaseResponse {
  gym: Gym
}

export class CreateGymUserCase {
  constructor(private gymRepository: GymsRepository) {}

  async mutationCreate({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: createGymServiceRequest): Promise<createGymUserCaseResponse> {
    const gym = await this.gymRepository.createGym({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
