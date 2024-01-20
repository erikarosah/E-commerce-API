import { ProductRepository } from '../repositories/product-repository'

interface RemoveProductUseCaseRequest {
    id: string
}

interface RemoveProductUseCaseResponse { }

export class RemoveProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        id
    }: RemoveProductUseCaseRequest): Promise<RemoveProductUseCaseResponse> {
        const product = await this.productRepository.findById(id)

        if (!product) {
            throw new Error('Resource not found')
        }

        await this.productRepository.delete(id)

        return {}
    }
}