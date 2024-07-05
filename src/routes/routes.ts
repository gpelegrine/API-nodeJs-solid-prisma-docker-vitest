import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register.controller'
import { authenticatedService } from '../controllers/authenticate'
import { profile } from '../controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticatedService)

  app.post('/me', profile)
}
