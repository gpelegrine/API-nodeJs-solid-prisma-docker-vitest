import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FindManyNearbyGymsUserCase } from './findMany-nearby-gyms'

let findManyNearbyGyms: InMemoryGymsRepository
let sut: FindManyNearbyGymsUserCase

describe('Buscar academias próximas', () => {
  beforeEach(() => {
    findManyNearbyGyms = new InMemoryGymsRepository()
    sut = new FindManyNearbyGymsUserCase(findManyNearbyGyms)
  })

  it('Deve ser capaz de buscar academias até 10km', async () => {
    await findManyNearbyGyms.createGym({
      title: 'Near Javascript',
      description: '2024',
      phone: '11979521202',
      latitude: -23.5567362,
      longitude: -46.66157,
    })

    await findManyNearbyGyms.createGym({
      title: 'Far Javascript',
      description: '2024',
      phone: '11979521202',
      latitude: -23.543916,
      longitude: -46.7677364,
    })

    const { gyms } = await sut.mutationCreate({
      userLatitude: -23.5567362,
      userLongitude: -46.66157,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Javascript' }),
    ])
  })
})
