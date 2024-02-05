import Stripe from 'stripe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'

const productsInfoSchema = z.object({
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
})

export async function payment(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        data: z.array(productsInfoSchema),
    })

    const {
        data
    } = registerBodySchema.parse(request.body)
    try {
        const stripe = new Stripe(
            env.STRIPE_API
        )

        const lineItems = data.map((product) => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${env.URL_FRONT}/success`,
            cancel_url: `${env.URL_FRONT}/cancel`
        })

        return reply.status(200).send({
            id: session.id,
            url: session.url
        })

    } catch (error) {
        return reply.status(400).send({ error })
    }
}
