import { FetchProductsUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'


export function makeFetchProductsUseCase() {
    const productRepository = new PrismaProductRepository()
    const fetchProducts = new FetchProductsUseCase(productRepository)

    return fetchProducts
}
