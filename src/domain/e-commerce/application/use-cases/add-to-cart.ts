import { ProductRepository } from '../repositories/product-repository'
import { UserRepository } from '../repositories/user-repository'

interface AddToCartUseCaseRequest {
    userId: string,
    productId: string
}

interface AddToCartUseCaseResponse { }

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
                product.adds = product.adds + 1

                await this.productRepository.save(product)

            } else {
                user.cart.push(product)
            }
        }

        return {}
    }
}