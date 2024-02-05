import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUpdateProductUseCase } from '@/infra/factories/products/make-update-product'

export async function updateProduct(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        image: z.string(),
        category: z.string(),
        price: z.coerce.number(),
        old_price: z.coerce.number(),
        available: z.string(),
        sizes: z.any()
    })

    const registerParamsSchema = z.object({
        id: z.string()
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

    const {
        id
    } = registerParamsSchema.parse(request.params)
    try {
        const updateProduct = makeUpdateProductUseCase()
        const result = await updateProduct.execute({
            id,
            name,
            image,
            category,
            price,
            old_price,
            available,
            sizes
        })

        if (result.isLeft()) {
            return result.value.message
        }

        return reply.status(200).send([
            result.value
        ])

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }
}