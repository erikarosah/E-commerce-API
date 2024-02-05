import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchProductsByCategoryAndTypeUseCaseRequest {
    category: string,
    query: string
}

type FetchProductsByCategoryAndTypeUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsByCategoryAndTypeUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        category,
        query
    }: FetchProductsByCategoryAndTypeUseCaseRequest): Promise<FetchProductsByCategoryAndTypeUseCaseResponse> {
        const products = await this.productRepository.fetchManyByCategoryAndType(category, query)

        if (!products || products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}