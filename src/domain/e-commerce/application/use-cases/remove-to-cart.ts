import { ProductRepository } from '../repositories/product-repository'
import { UserRepository } from '../repositories/user-repository'

interface RemoveToCartUseCaseRequest {
    userId: string,
    productId: string
}

interface RemoveToCartUseCaseResponse { }

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
                productOnCart.adds = productOnCart.adds - 1

                if (productOnCart.adds === 0) {
                    user.cart.splice(productIndex, 1)
                }

            } else {
                throw new Error('Resource not found')
            }
        }

        return {}
    }
}