import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterProductUseCase } from '@/infra/factories/products/make-register-product-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        image: z.string(),
        category: z.string(),
        price: z.coerce.number(),
        old_price: z.coerce.number(),
        available: z.coerce.boolean(),
        sizes: z.any()
    })

    const {
        name,
        image,
        category,
        price,
        old_price,
        available,
        sizes
    } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterProductUseCase()

        const result = await registerUseCase.execute({
            name,
            image,
            category,
            price,
            old_price,
            available,
            sizes
        })

        if (result.isLeft()) {
            return result.value
        }

        return reply.status(201).send()

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }
}