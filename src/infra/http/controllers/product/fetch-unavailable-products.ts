import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUnavailableProducts } from '@/infra/factories/products/make-fetch-unavailable-products'

export async function fetchUnavailableProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchProducts = makeFetchUnavailableProducts()

        const products = await fetchProducts.execute()

        return reply.status(200).send([
            products.value
        ])

    } catch (error) {
        throw new Error('Error fetching products')
    }

}