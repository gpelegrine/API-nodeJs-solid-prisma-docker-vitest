import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: number, date: Date): Promise<CheckIn | null>
  findManyByUserHistory(userId: number, pageInfo: number): Promise<CheckIn[]>
}
