import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface FetchProductsByCategoryUseCaseRequest {
    category: 'Fem' | 'Masc' | 'Kids',
    page: number
}

interface FetchProductsByCategoryUseCaseResponse {
    products: Product[]
}

export class FetchProductsByCategoryUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        category,
        page
    }: FetchProductsByCategoryUseCaseRequest): Promise<FetchProductsByCategoryUseCaseResponse> {
        const products = await this.productRepository.fetchManyByCategory(category, page)

        if (!products || products.length === 0) {
            throw new Error('Resource not found')
        }

        return {
            products
        }
    }
}