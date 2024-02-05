import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateProductUseCaseRequest {
    id: string,
    name: string,
    image: string,
    category: string,
    price: number,
    old_price: number,
    available: string,
    sizes: string[]
}

type UpdateProductUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        id,
        name,
        image,
        category,
        price,
        old_price,
        available,
        sizes
    }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
        const product = await this.productRepository.findById(id)

        if (!product) {
            return left(new ResourceNotFoundError())
        }

        const data = {
            name,
            image,
            category,
            price,
            old_price,
            available,
            sizes
        }

        await this.productRepository.update(
            product.id,
            data
        )
        return right({})
    }
}