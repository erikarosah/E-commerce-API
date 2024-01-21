import { ProductRepository } from '../repositories/product-repository'

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

interface UpdateProductUseCaseResponse { }

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
            throw new Error('Resource not found')
        }

        product.name = name
        product.image = image
        product.category = category
        product.new_price = new_price
        product.old_price = old_price
        product.available = available
        product.sizes = sizes ?? ['P', 'M', 'G', 'XG']

        await this.productRepository.save(product)

        return {}
    }
}