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

    gymsRepository.items.push({
      id: 1,
      title: 'Academia',
      description: '',
      latitude: new Decimal(-23.543916),
      longitude: new Decimal(-46.7677364),
      phone: '',
    })

    vi.isFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('criar o check-in de usuário', async () => {
    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
      userLatitude: -23.543916,
      userLongitude: -46.7677364,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('não deve ser possível fazer check-in duas vezes no mesmo dia', async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0))

    await sut.execute({
      gymId: 1,
      userId: 1,
      userLatitude: -23.543916,
      userLongitude: -46.7677364,
    })

    await expect(() =>
      sut.execute({
        gymId: 1,
        userId: 1,
        userLatitude: -23.543916,
        userLongitude: -46.7677364,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('O usuário pode fazer checkIn, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0))

    await sut.execute({
      gymId: 1,
      userId: 1,
      userLatitude: -23.543916,
      userLongitude: -46.7677364,
    })

    vi.setSystemTime(new Date(2024, 1, 16, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 1,
      userId: 1,
      userLatitude: -23.543916,
      userLongitude: -46.7677364,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('Não deverá fazer checkIn há distancia', async () => {
    gymsRepository.items.push({
      id: 2,
      title: 'Academia',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5137162),
      longitude: new Decimal(-46.7529418),
    })

    await expect(() =>
      sut.execute({
        gymId: 2,
        userId: 1,
        userLatitude: -23.543916,
        userLongitude: -46.7677364,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
