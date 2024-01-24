
import { RegisterProductUseCase } from '@/domain/e-commerce/application/use-cases/register-product'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'

export function makeRegisterProductUseCase() {
    const productRepository = new PrismaProductRepository()
    const registerUseCase = new RegisterProductUseCase(productRepository)

    return registerUseCase
}
