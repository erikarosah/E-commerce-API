import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SubtractToCartUseCaseRequest {
    userId: string,
    productId: string
}

type SubtractToCartUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class SubtractToCartUseCase {
    constructor(
        private userRepository: UserRepository,
        private productRepository: ProductRepository
    ) { }

    async execute({
        userId,
        productId
    }: SubtractToCartUseCaseRequest): Promise<SubtractToCartUseCaseResponse> {

        const product = await this.productRepository.findById(productId)
        const user = await this.userRepository.findById(userId)

        if (product && user) {
            const productOnCart = user.cart.find((item) => item.id === product.id)
            const productIndex = user.cart.findIndex((item) => item.id === product.id)

            if (productOnCart) {
                productOnCart.adds = productOnCart.adds - 1

                if (productOnCart.adds === 0) {
                    user.cart.splice(productIndex, 1)
                }

            } else {
                return left(new ResourceNotFoundError())
            }
        }

        return right({})
    }
}