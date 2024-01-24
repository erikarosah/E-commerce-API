import { FetchProductsByCategoryUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products-by-category'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'


export function makeFetchProductsByCategoryUseCase() {
    const productRepository = new PrismaProductRepository()
    const fetchProductsByCategory = new FetchProductsByCategoryUseCase(productRepository)

    return fetchProductsByCategory
}
