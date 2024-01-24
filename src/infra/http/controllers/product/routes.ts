import { FastifyInstance } from 'fastify'
import { register } from '../product/register'
import { fetchProducts } from './fetch-products'

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products', register)
    app.get('/products/:page', fetchProducts)
}