import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-checkin-repository'
import { FindManyByUserHistoryService } from './findMany-user-checkIns-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FindManyByUserHistoryService

describe('Buscar histórico de check-in do usuário', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FindManyByUserHistoryService(checkInRepository)
  })

  it('Deve ser capaz de buscar o histórico de check-in', async () => {
    await checkInRepository.create({
      gym_id: 1,
      user_id: 1,
    })

    await checkInRepository.create({
      gym_id: 2,
      user_id: 1,
    })

    const { checkIns } = await sut.execute({
      userId: 1,
      pageInfo: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 1 }),
      expect.objectContaining({ gym_id: 2 }),
    ])
  })

  it('Deve ser capaz de buscar o histórico de check-in paginado', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: i,
        user_id: 1,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 1,
      pageInfo: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 21 }),
      expect.objectContaining({ gym_id: 22 }),
    ])
  })
})
