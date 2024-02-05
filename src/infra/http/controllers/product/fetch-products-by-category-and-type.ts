import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsByCategoryAndTypeUseCase } from '@/infra/factories/products/make-fetch-products-by-category-and-type'

export async function fetchProductsByCategoryAndType(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        category: z.string(),
        query: z.string()
    })

    const {
        category,
        query
    } = registerBodySchema.parse(request.params)

    try {
        const fetchProductsByCategoryAndType = makeFetchProductsByCategoryAndTypeUseCase()

        const result = await fetchProductsByCategoryAndType.execute({
            category,
            query
        })

        if (result.isLeft()) {
            return result.value.message
        }

        return reply.status(200).send([
            result.value.products
        ])

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }

}