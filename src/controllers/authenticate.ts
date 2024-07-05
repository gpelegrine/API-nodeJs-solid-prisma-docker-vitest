import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../services/error/invalid-credentials-error'
import { makeAuthenticateUseCase } from '../factories/make-authenticate-use-case'

export async function authenticatedService(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateUseCase()

    const { user } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: String(user.id)
        }
      }
    )
    console.log(`🚀------------token------------🚀`, token);
    return reply.status(200).send({
      token,
    })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
  }

}
