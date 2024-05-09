import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { GetUsersProfile } from './get-user-profile'
import { hash } from 'bcryptjs'
import { randomInt } from 'crypto'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUsersProfile

describe('profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUsersProfile(usersRepository)
  })

  it('criar o perfil de usuário', async () => {
    const createUser = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('1234567', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    await expect(user.name).toEqual('John')
  })

  it('perfil de usuario não encontrado', async () => {
    await expect(() =>
      sut.execute({
        userId: randomInt(1000),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
