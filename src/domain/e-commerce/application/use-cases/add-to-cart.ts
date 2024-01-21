import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AddToCartUseCaseRequest {
    userId: string,
    productId: string
}

type AddToCartUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class AddToCartUseCase {
    constructor(
        private userRepository: UserRepository,
        private productRepository: ProductRepository
    ) { }

    async execute({
        userId,
        productId
    }: AddToCartUseCaseRequest): Promise<AddToCartUseCaseResponse> {

        const product = await this.productRepository.findById(productId)
        const user = await this.userRepository.findById(userId)

        if (product && user) {

            const productAlreadyAdded = user.cart.find((item) => item.id === product.id)

            if (productAlreadyAdded) {
                productAlreadyAdded.adds = productAlreadyAdded.adds + 1

            } else {
                user.cart.push(product)
            }

            return right({})
        }

        return left(new ResourceNotFoundError())
    }
}