import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUserCase } from './create-gym'

let createGymRepositpry: InMemoryGymsRepository
let sut: CreateGymUserCase

describe('Buscar quantidade de check-in do usuário', () => {
  beforeEach(() => {
    createGymRepositpry = new InMemoryGymsRepository()
    sut = new CreateGymUserCase(createGymRepositpry)
  })

  it('Deve ser capaz de buscar todos os check-in do usuário', async () => {
    const { gym } = await sut.mutationCreate({
      title: 'Academia Javascript',
      description: '2024',
      phone: '11979521202',
      latitude: 0,
      longitude: 0,
    })

    await expect(gym.id).toEqual(expect.any(Number))
  })
})
