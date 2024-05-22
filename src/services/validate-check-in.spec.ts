import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInService } from './validate-check-in'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let ValidadeCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in use case', () => {
  beforeEach(() => {
    ValidadeCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInService(ValidadeCheckInRepository)

    // vi.isFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('validar o check-in de usuário', async () => {
    const createCheckIn = await ValidadeCheckInRepository.create({
      gym_id: 1,
      user_id: 1,
    })

    const { checkIn } = await sut.execute({
      checkInId: createCheckIn.id,
    })

    await expect(checkIn.id).toEqual(expect.any(Number))
    await expect(ValidadeCheckInRepository.items[0].validated_at).toEqual(
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
})
