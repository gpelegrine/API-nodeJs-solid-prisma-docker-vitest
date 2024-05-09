import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInService(checkInRepository)

    vi.isFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('criar o check-in de usuário', async () => {
    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('O usuário só poderá fazer checkIn duas vezes no dia', async () => {
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

  it('O usuário só pode fazer checkIn, mas em dias diferentes', async () => {
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

    await expect(checkIn.id).toBeInstanceOf(expect.any(Number))
  })
})
