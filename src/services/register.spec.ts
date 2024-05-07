import { describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

describe('Register use case', () => {
  it('A senha do usuário deve ser Hash', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUserCase(usersRepositoryInMemory)

    const { user } = await registerUserCase.mutationCreate({
      name: 'John',
      email: 'John@example.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('O e-mail já está cadastrado', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUserCase(usersRepositoryInMemory)

    const { user } = await registerUserCase.mutationCreate({
      name: 'John',
      email: 'John@example.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
