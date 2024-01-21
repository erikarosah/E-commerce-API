import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface FetchProductsUseCaseRequest {
    page: number
}

interface FetchProductsUseCaseResponse {
    products: Product[]
}

export class FetchProductsUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        page
    }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
        const products = await this.productRepository.fetchProducts(page)

        if (products.length === 0) {
            throw new Error('Resource not found')
        }

        return {
            products
        }
    }
}