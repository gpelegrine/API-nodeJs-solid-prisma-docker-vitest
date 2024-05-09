import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkin-repository'

interface CheckInServiceRequest {
  userId: number
  gymId: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
