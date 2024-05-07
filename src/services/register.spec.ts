import { describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  it('A senha do usuário deve ser Hash', async () => {
    const registerUserCase = new RegisterUserCase({
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: parseInt('user-1'),
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
