import { FastifyInstance } from 'fastify'
import { register } from '../product/register'
import { fetchProducts } from './fetch-products'
import { fetchProductsByCategory } from './fetch-products-by-category'
import { deleteProduct } from './delete-product'
import { fetchUnavailableProducts } from './fetch-unavailable-products'
import { fetchProductsByName } from './fetch-products-by-name'
import { fetchProductsByCategoryAndType } from './fetch-products-by-category-and-type'
import { getProductById } from './get-product-by-id'
import { updateProduct } from './update-product'

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products', register)
    app.get('/products', fetchProducts)

    app.put('/product/:id', updateProduct)
    app.get('/product/:id', getProductById)
    app.delete('/product/:id', deleteProduct)

    app.get('/products/:category', fetchProductsByCategory)
    app.get('/products/name/:name', fetchProductsByName)
    app.get('/products/:query/:category', fetchProductsByCategoryAndType)
    app.get('/products/unavailables', fetchUnavailableProducts)
}