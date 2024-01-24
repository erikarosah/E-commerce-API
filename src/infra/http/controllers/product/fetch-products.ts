import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsUseCase } from '@/infra/factories/products/make-fetch-products'

export async function fetchProducts(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        page: z.coerce.number()
    })

    const {
        page
    } = registerBodySchema.parse(request.params)

    try {
        const fetchProducts = makeFetchProductsUseCase()

        const result = await fetchProducts.execute({
            page
        })

        if (result.isLeft()) {
            return result.value
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