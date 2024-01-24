import { prisma } from '@/app'
import { ProductCreateInput, ProductRepository } from '@/domain/e-commerce/application/repositories/product-repository'

export class PrismaProductRepository implements ProductRepository {

    async create(newProduct: ProductCreateInput) {
        await prisma.product.create({
            data: {
                name: newProduct.name,
                available: newProduct.available,
                category: newProduct.category.toUpperCase(),
                image: newProduct.image,
                price: newProduct.price,
                sizes: newProduct.sizes,
                old_price: newProduct.old_price,
            }
        })

    }

    async findByName(name: string) {
        const product = await prisma.product.findFirst({
            where: {
                name
            }
        })

        if (product) {
            return product
        }

        return null
    }

    async findById(id: string) {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if (product) {
            return product
        }

        return null
    }

    async delete(id: string) {
        await prisma.product.delete({
            where: {
                id
            }
        })
    }

    async fetchProducts(page: number) {
        const products = await prisma.product.findMany({
            skip: page != 1 ? page * 20 : 0,
            take: 20,
            orderBy: {
                name: 'asc'
            }
        })

        return products
    }

    async fetchManyByCategory(category: string, page: number) {
        const products = await prisma.product.findMany({
            where: {
                category: category.toUpperCase(),
            },
            skip: page != 1 ? page * 20 : 0,
            take: 20
        })

        return products
    }

    async fetchUnavailables() {
        const products = await prisma.product.findMany({
            where: {
                available: false
            }
        })

        if (!products) {
            return null
        }

        return products
    }
}