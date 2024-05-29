import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository'
import { SearchGymUserCase } from '../services/search-gym'

export function makeSearchGymUseCase() {
  const gymSearch = new PrismaGymRepository()
  const useCase = new SearchGymUserCase(gymSearch)

  return useCase
}
