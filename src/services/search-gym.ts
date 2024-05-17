import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface searchGymServiceRequest {
  search: string
  pageInfo: number
}

interface searchGymUserCaseResponse {
  gyms: Gym[]
}

export class SearchGymUserCase {
  constructor(private gymRepository: GymsRepository) {}

  async mutationCreate({
    search,
    pageInfo,
  }: searchGymServiceRequest): Promise<searchGymUserCaseResponse> {
    const gyms = await this.gymRepository.searchGym(search, pageInfo)

    return {
      gyms,
    }
  }
}
