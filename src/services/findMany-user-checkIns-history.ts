import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkin-repository'

interface FindManyByUserHistoryServiceRequest {
  userId: number
  pageInfo: number
}

interface FindManyByUserHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FindManyByUserHistoryService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    userId,
    pageInfo,
  }: FindManyByUserHistoryServiceRequest): Promise<FindManyByUserHistoryServiceResponse> {
    const checkIns = await this.checkinRepository.findManyByUserHistory(
      userId,
      pageInfo,
    )

    return {
      checkIns,
    }
  }
}
