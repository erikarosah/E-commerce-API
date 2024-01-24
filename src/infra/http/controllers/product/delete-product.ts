import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteProductUseCase } from '@/infra/factories/products/make-delete-product'

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.coerce.string()
    })

    const {
        id
    } = registerBodySchema.parse(request.params)

    try {
        const deleteProduct = makeDeleteProductUseCase()

        const result = await deleteProduct.execute({
            id
        })

        if (result.isLeft()) {
            return result.value
        }

        return reply.status(200).send()

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }
}