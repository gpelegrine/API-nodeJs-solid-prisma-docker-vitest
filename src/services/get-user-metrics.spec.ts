import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'
import { FindUniqueUserMetricsService } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: FindUniqueUserMetricsService

describe('Buscar quantidade de check-in do usuário', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FindUniqueUserMetricsService(checkInRepository)
  })

  it('Deve ser capaz de buscar todos os check-in do usuário', async () => {
    await checkInRepository.create({
      gym_id: 1,
      user_id: 1,
    })

    await checkInRepository.create({
      gym_id: 2,
      user_id: 1,
    })

    const { checkInsCount } = await sut.execute({
      userId: 1,
    })

    expect(checkInsCount).toEqual(2)
  })
})
