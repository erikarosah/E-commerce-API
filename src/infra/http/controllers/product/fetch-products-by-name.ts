import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsByNameUseCase } from '@/infra/factories/products/make-fetch-products-by-name'

export async function fetchProductsByName(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string()
    })

    const {
        name
    } = registerBodySchema.parse(request.params)

    try {
        const fetchProductsByName = makeFetchProductsByNameUseCase()

        const result = await fetchProductsByName.execute({
            name
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