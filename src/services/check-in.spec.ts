import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('criar o check-in de usuário', async () => {
    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })
})
