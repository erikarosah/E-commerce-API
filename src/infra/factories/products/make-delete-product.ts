import { RemoveProductUseCase } from '@/domain/e-commerce/application/use-cases/remove-product'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'

export function makeDeleteProductUseCase() {
    const productRepository = new PrismaProductRepository()
    const deleteProduct = new RemoveProductUseCase(productRepository)

    return deleteProduct
}
