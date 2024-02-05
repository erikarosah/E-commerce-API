import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsUseCase } from '@/infra/factories/products/make-fetch-products'

export async function fetchProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchProducts = makeFetchProductsUseCase()

        const result = await fetchProducts.execute()

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