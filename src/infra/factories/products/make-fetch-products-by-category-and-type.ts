import { FetchProductsByCategoryAndTypeUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products-by-category-and-type'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'

export function makeFetchProductsByCategoryAndTypeUseCase() {
    const productRepository = new PrismaProductRepository()
    const fetchProductsByCategoryAndType = new FetchProductsByCategoryAndTypeUseCase(productRepository)

    return fetchProductsByCategoryAndType
}
