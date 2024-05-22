import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInService } from './validate-check-in'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let validadeCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in use case', () => {
  beforeEach(() => {
    validadeCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInService(validadeCheckInRepository)

    vi.isFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('validar o check-in de usuário', async () => {
    const createCheckIn = await validadeCheckInRepository.create({
      gym_id: 1,
      user_id: 1,
    })

    const { checkIn } = await sut.execute({
      checkInId: createCheckIn.id,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
    await expect(validadeCheckInRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('Não pode validar um check-in inexistente', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Não será possível validar check-in após 20 minutos da sua criação', async () => {
    const beforeDate = new Date(2024, 1, 15, 14, 0)
    vi.setSystemTime(beforeDate)

    const createCheckIn = await validadeCheckInRepository.create({
      gym_id: 1,
      user_id: 1,
    })

    const afterDate = new Date(2024, 1, 15, 14, 21)
    vi.setSystemTime(afterDate)

    await expect(() =>
      sut.execute({
        checkInId: createCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
