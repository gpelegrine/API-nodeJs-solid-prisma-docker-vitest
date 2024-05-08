import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

describe('Authenticate use case', () => {
  it('deve ser capaz de autenticar', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepositoryInMemory) // sut - System under test (Indicar qual a principal variavel que está sendo testada)

    const hashPassword = hash('1234567', 6)

    await usersRepositoryInMemory.create({
      name: 'John',
      email: 'John@example.com',
      password_hash: await hashPassword,
    })

    const { user } = await sut.execute({
      email: 'John@example.com',
      password: '1234567',
    })

    await expect(user.id).toEqual(expect.any(Number))
  })

  it('não deve ser possível autenticar com e-mail errado', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepositoryInMemory)

    await expect(() =>
      sut.execute({
        email: 'John@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('não deve ser possível autenticar com senha errada', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepositoryInMemory)

    await expect(() =>
      sut.execute({
        email: 'John@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
