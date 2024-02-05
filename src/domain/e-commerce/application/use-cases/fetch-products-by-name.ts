import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchProductsByNameUseCaseRequest {
    name: string
}

type FetchProductsByNameUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsByNameUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        name
    }: FetchProductsByNameUseCaseRequest): Promise<FetchProductsByNameUseCaseResponse> {
        const products = await this.productRepository.findByName(name)

        if (!products || products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}