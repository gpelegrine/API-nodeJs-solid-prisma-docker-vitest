import { CheckInRepository } from '../repositories/checkin-repository'

interface FindUniqueUserMetricsServiceRequest {
  userId: number
}

interface FindUniqueUserMetricsServiceResponse {
  checkInsCount: number
}

export class FindUniqueUserMetricsService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    userId,
  }: FindUniqueUserMetricsServiceRequest): Promise<FindUniqueUserMetricsServiceResponse> {
    const checkInsCount = await this.checkinRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
