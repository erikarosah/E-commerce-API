import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface FetchProductsUseCaseResponse {
    products: Product[]
}

export class FetchProductsUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchProductsUseCaseResponse> {
        const products = await this.productRepository.fetchProducts()

        if (products.length === 0) {
            throw new Error('Resource not found')
        }

        return {
            products
        }
    }
}