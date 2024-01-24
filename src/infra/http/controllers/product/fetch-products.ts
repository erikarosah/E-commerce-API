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

        const products = await fetchProducts.execute({
            page
        })

        return reply.status(200).send([
            products.value
        ])

    } catch (error) {
        console.log(error)
        throw new Error('Error fetching products')
    }

}