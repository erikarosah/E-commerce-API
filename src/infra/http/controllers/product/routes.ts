import { FastifyInstance } from 'fastify'
import { register } from '../product/register'
import { fetchProducts } from './fetch-products'
import { fetchProductsByCategory } from './fetch-products-by-category'
import { deleteProduct } from './delete-product'

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products', register)
    app.get('/products/:page', fetchProducts)
    app.get('/products/:page/:category', fetchProductsByCategory)
    app.delete('/products/:id', deleteProduct)
}