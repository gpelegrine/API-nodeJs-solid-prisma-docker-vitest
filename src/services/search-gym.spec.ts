import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUserCase } from './search-gym'

let searchGymRepository: InMemoryGymsRepository
let sut: SearchGymUserCase

describe('Buscar por academias', () => {
  beforeEach(() => {
    searchGymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUserCase(searchGymRepository)
  })

  it('Deve ser capaz de buscar academias', async () => {
    await searchGymRepository.createGym({
      title: 'Javascript',
      description: '2024',
      phone: '11979521202',
      latitude: 0,
      longitude: 0,
    })

    await searchGymRepository.createGym({
      title: 'Typescript',
      description: '2024',
      phone: '11979521202',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.mutationCreate({
      search: 'Javascript',
      pageInfo: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript' })])
  })

  it('Deve ser capaz de buscar as academias paginado', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymRepository.createGym({
        title: `Javascript Gym ${i}`,
        description: '2024',
        phone: '11979521202',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.mutationCreate({
      search: 'Javascript',
      pageInfo: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
