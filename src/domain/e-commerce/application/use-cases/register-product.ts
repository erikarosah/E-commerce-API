import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface RegisterProductUseCaseRequest {
    name: string,
    image: string,
    category: string,
    new_price: number,
    old_price: number,
    available: boolean
}

interface RegisterProductUseCaseResponse {
    product: Product
}

export class RegisterProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        name,
        image,
        category,
        new_price,
        old_price,
        available,
    }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {

        const product = Product.create({
            name,
            image,
            category,
            new_price,
            old_price,
            available,
        })

        await this.productRepository.create(product)

        return {
            product
        }
    }
}