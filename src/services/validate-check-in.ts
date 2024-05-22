import dayjs from 'dayjs'
import { CheckInRepository } from '../repositories/checkin-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface ValidateCheckInServiceRequest {
  checkInId: number
}

export class ValidateCheckInService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({ checkInId }: ValidateCheckInServiceRequest) {
    const checkIn = await this.checkinRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    )

    console.log(
      `------------------ distanceInMinutesFromCheckInCreation ------------------>`,
      distanceInMinutesFromCheckInCreation,
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error()
    }

    checkIn.validated_at = new Date()

    await this.checkinRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
