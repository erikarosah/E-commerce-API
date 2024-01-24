import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FetchProductsUnavailableUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsUnavailableUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchProductsUnavailableUseCaseResponse> {
        const products = await this.productRepository.fetchUnavailables()

        if (!products || products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}