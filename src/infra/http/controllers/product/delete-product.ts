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

        await deleteProduct.execute({
            id
        })

        return reply.status(200).send()

    } catch (error) {
        throw new Error('Error delete products')
    }
}