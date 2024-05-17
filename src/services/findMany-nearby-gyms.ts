import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface findManyNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface findManyNearbyGymsUserCaseResponse {
  gyms: Gym[]
}

export class FindManyNearbyGymsUserCase {
  constructor(private gymRepository: GymsRepository) {}

  async mutationCreate({
    userLatitude,
    userLongitude,
  }: findManyNearbyGymsServiceRequest): Promise<findManyNearbyGymsUserCaseResponse> {
    const gyms = await this.gymRepository.findManyNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
