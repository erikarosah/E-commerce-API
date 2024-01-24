import { FetchProductsUnavailableUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products-unavailable'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'

export function makeFetchUnavailableProducts() {
    const productRepository = new PrismaProductRepository()
    const fetchProducts = new FetchProductsUnavailableUseCase(productRepository)

    return fetchProducts
}