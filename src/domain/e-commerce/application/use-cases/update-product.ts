import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Product } from '../../entities/product'

interface UpdateProductUseCaseRequest {
    id: string,
    name: string,
    image: string,
    category: 'Fem' | 'Masc' | 'Kids',
    new_price: number,
    old_price: number,
    available: boolean,
    sizes: string[]
}

type UpdateProductUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        product: Product
    }
>

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        id,
        name,
        image,
        category,
        new_price,
        old_price,
        available,
        sizes
    }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
        const product = await this.productRepository.findById(id)

        if (!product) {
            return left(new ResourceNotFoundError())
        }

        product.name = name
        product.image = image
        product.category = category
        product.new_price = new_price
        product.old_price = old_price
        product.available = available
        product.sizes = sizes ?? ['P', 'M', 'G', 'XG']

        await this.productRepository.save(product)

        return right({
            product
        })
    }
}