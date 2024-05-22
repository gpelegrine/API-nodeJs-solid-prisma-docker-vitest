import dayjs from 'dayjs'
import { CheckInRepository } from '../repositories/checkin-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { LateCheckInValidateError } from './error/late-check-in-validate-error'

interface ValidateCheckInServiceRequest {
  checkInId: number
}

export class ValidateCheckInService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({ checkInId }: ValidateCheckInServiceRequest) {
    const checkIn = await this.checkinRepository.findById(checkInId)
    console.log(`------------------ checkIn ------------------>`, checkIn)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkinRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
