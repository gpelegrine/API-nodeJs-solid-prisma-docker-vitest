import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByUserId(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
