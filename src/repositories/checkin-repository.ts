import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByUserId(userId: number): Promise<number>
  findByUserIdOnDate(userId: number, date: Date): Promise<CheckIn | null>
  findManyByUserHistory(userId: number, pageInfo: number): Promise<CheckIn[]>
  findById(id: number): Promise<CheckIn | null>
  save(CheckIn: CheckIn): Promise<CheckIn>
}
