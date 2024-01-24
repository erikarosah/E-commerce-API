import { FastifyInstance } from 'fastify'
import { register } from '../product/register'

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products', register)
}