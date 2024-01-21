import { Either, left, right } from '@/core/either'
import { Product } from '../../entities/product'
import { ProductRepository } from '../repositories/product-repository'
import { NotAllowedError } from './errors/not-allowed-error'

interface RegisterProductUseCaseRequest {
    name: string,
    image: string,
    category: 'Fem' | 'Masc' | 'Kids',
    new_price: number,
    old_price: number,
    available: boolean,
    sizes: string[]
}

type RegisterProductUseCaseResponse = Either<
    NotAllowedError,
    {
        product: Product
    }
>

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
            return left(new NotAllowedError())
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

        return right({
            product
        })
    }
}