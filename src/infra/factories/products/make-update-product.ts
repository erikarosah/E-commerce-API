
import { UpdateProductUseCase } from '@/domain/e-commerce/application/use-cases/update-product'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'

export function makeUpdateProductUseCase() {
    const productRepository = new PrismaProductRepository()
    const updateProduct = new UpdateProductUseCase(productRepository)

    return updateProduct
}
