import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface FetchProductUseCaseResponse {
    products: Product[]
}

export class FetchProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchProductUseCaseResponse> {
        const products = await this.productRepository.fetchProducts()

        if (products.length === 0) {
            throw new Error('Resource not found')
        }

        return {
            products
        }
    }
}