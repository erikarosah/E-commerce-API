import { GetProductByIdUseCase } from '@/domain/e-commerce/application/use-cases/get-product-by-id'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'


export function makeGetProductByIdUseCase() {
    const productRepository = new PrismaProductRepository()
    const product = new GetProductByIdUseCase(productRepository)

    return product
}