import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProductByIdUseCaseRequest {
    id: string
}

type GetProductByIdUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        product: product
    }
>

export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        id
    }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
        const product = await this.productRepository.findById(id)

        if (!product) {
            return left(new ResourceNotFoundError())
        }

        return right({
            product
        })
    }
}