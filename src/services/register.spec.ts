import { describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

describe('Register use case', () => {
  it('Confirmação de cadastro', async () => {
    const usersRepositoryInMemory = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUserCase(usersRepositoryInMemory)

    const { user } = await registerUserCase.mutationCreate({
      name: 'John',
      email: 'John@example.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(Number))
  })

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

    const email = 'John@example.com'

    await registerUserCase.mutationCreate({
      name: 'John',
      email,
      password: '1234567',
    })

    await expect(() =>
      registerUserCase.mutationCreate({
        name: 'John',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
