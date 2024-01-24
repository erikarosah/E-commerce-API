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

        const products = await fetchProductsByCategory.execute({
            page,
            category
        })

        return reply.status(200).send([
            products.value
        ])

    } catch (error) {
        throw new Error('Error fetching products')
    }

}