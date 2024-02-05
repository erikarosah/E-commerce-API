import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetProductByIdUseCase } from '@/infra/factories/products/make-get-product-by-id'

export async function getProductById(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string()
    })

    const {
        id
    } = registerBodySchema.parse(request.params)

    try {
        const product = makeGetProductByIdUseCase()

        const result = await product.execute({
            id
        })

        if (result.isLeft()) {
            return result.value.message
        }

        return reply.status(200).send([
            result.value.product
        ])

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }

}