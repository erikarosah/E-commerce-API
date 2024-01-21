import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveToCartUseCaseRequest {
    userId: string,
    productId: string
}

type RemoveToCartUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class RemoveToCartUseCase {
    constructor(
        private userRepository: UserRepository,
        private productRepository: ProductRepository
    ) { }

    async execute({
        userId,
        productId
    }: RemoveToCartUseCaseRequest): Promise<RemoveToCartUseCaseResponse> {

        const product = await this.productRepository.findById(productId)
        const user = await this.userRepository.findById(userId)

        if (product && user) {
            const productOnCart = user.cart.find((item) => item.id === product.id)
            const productIndex = user.cart.findIndex((item) => item.id === product.id)

            if (productOnCart) {
                user.cart.splice(productIndex, 1)

            } else {
                return left(new ResourceNotFoundError())
            }
        }

        return right({})
    }
}