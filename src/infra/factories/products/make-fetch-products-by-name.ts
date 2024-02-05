import { FetchProductsByNameUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products-by-name'
import { PrismaProductRepository } from '@/infra/prisma/prisma-product-repository'


export function makeFetchProductsByNameUseCase() {
    const productRepository = new PrismaProductRepository()
    const fetchProductsByName = new FetchProductsByNameUseCase(productRepository)

    return fetchProductsByName
}
