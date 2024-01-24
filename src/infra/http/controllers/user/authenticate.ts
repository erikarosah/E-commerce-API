import 'dotenv/config'
import { makeAuthenticateUserUseCase } from '@/infra/factories/user/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const {
        email,
        password
    } = registerBodySchema.parse(request.body)

    try {
        const authenticate = makeAuthenticateUserUseCase()

        const result = await authenticate.execute({
            email,
            password
        })

        if (result.isLeft()) {
            return result.value
        }

        const token = jwt.sign({}, env.SECRET, {
            expiresIn: '7d'
        })

        return reply.status(200).send({
            token: token
        })

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }
}
