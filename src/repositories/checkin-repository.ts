import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInCreateInput): Promise<CheckIn>
}
