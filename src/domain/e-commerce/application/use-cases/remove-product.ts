import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveProductUseCaseRequest {
    id: string
}

type RemoveProductUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class RemoveProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        id
    }: RemoveProductUseCaseRequest): Promise<RemoveProductUseCaseResponse> {
        const product = await this.productRepository.findById(id)

        if (!product) {
            return left(new ResourceNotFoundError())
        }

        await this.productRepository.delete(id)

        return right({})
    }
}