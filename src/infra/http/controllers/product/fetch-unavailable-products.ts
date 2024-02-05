import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUnavailableProducts } from '@/infra/factories/products/make-fetch-unavailable-products'

export async function fetchUnavailableProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchProducts = makeFetchUnavailableProducts()

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