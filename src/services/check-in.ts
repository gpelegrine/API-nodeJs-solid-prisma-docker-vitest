import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkin-repository'
import { GymsRepository } from '../repositories/gyms-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinates'
import { MaxDistanceError } from './error/max-distance-error'
import { MaxNumberOfCheckInsError } from './error/max-number-of-checkIns-error'

interface CheckInServiceRequest {
  userId: number
  gymId: number
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkinRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findByUserId(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      },
    )

    const MAX_DISTANCE_KM = 0.1

    if (distance > MAX_DISTANCE_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
