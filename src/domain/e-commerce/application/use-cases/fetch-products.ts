import { Either, left, right } from '@/core/either'
import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchProductsUseCaseRequest {
    page: number
}

type FetchProductsUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: Product[]
    }
>

export class FetchProductsUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        page
    }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
        const products = await this.productRepository.fetchProducts(page)

        if (products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}