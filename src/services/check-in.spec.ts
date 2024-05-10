import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    vi.isFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('criar o check-in de usuário', async () => {
    gymsRepository.items.push({
      id: 1,
      title: 'Academia',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
    })

    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('não deve ser possível fazer check-in duas vezes no mesmo dia', async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0))

    await sut.execute({
      gymId: 1,
      userId: 1,
    })

    await expect(() =>
      sut.execute({
        gymId: 1,
        userId: 1,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('O usuário pode fazer checkIn, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0))

    await sut.execute({
      gymId: 1,
      userId: 1,
    })

    vi.setSystemTime(new Date(2024, 1, 16, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })
})
