import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface RegisterProductUseCaseRequest {
    name: string,
    image: string,
    category: 'Fem' | 'Masc' | 'Kids',
    new_price: number,
    old_price: number,
    available: boolean,
    sizes: string[]
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
        sizes
    }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
        const productAlreadyRegistered = await this.productRepository.findByName(name)

        if (productAlreadyRegistered) {
            throw new Error('Not allowed')
        }

        const product = Product.create({
            name,
            image,
            category,
            new_price,
            old_price,
            available,
            sizes
        })

        await this.productRepository.create(product)

        return {
            product
        }
    }
}