import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsByCategoryUseCase } from '@/infra/factories/products/make-fetch-products-by-category'

export async function fetchProductsByCategory(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        page: z.coerce.number(),
        category: z.coerce.string()
    })

    const {
        page,
        category
    } = registerBodySchema.parse(request.params)

    try {
        const fetchProductsByCategory = makeFetchProductsByCategoryUseCase()

        const result = await fetchProductsByCategory.execute({
            page,
            category
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