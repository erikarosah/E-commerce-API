import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchProductsByCategoryUseCaseRequest {
    category: string,
    page: number
}

type FetchProductsByCategoryUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsByCategoryUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        category,
        page
    }: FetchProductsByCategoryUseCaseRequest): Promise<FetchProductsByCategoryUseCaseResponse> {
        const products = await this.productRepository.fetchManyByCategory(category, page)

        if (!products || products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}