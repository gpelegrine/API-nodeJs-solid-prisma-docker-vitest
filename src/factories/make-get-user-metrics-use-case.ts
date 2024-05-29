import { PrismaCheckInsRepository } from '../repositories/prisma/prisma-check-ins-repository'
import { FindUniqueUserMetricsService } from '../services/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInMetrics = new PrismaCheckInsRepository()
  const useCase = new FindUniqueUserMetricsService(checkInMetrics)

  return useCase
}
