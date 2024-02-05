import { prisma } from '@/app'
import { ProductCreateInput, ProductRepository, product } from '@/domain/e-commerce/application/repositories/product-repository'

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

    async findByNameUnique(name: string) {
        const products = await prisma.product.findFirst({
            where: {
                name: name
            }
        })

        if (products) {
            return products
        }

        return null
    }

    async findByName(query: string,) {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            take: 10,
            orderBy: {
                name: 'asc'
            }
        })

        if (products) {
            return products
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

    async fetchProducts() {
        const products = await prisma.product.findMany({
            where: {
                available: true
            },
            orderBy: {
                name: 'asc'
            }
        })

        return products
    }

    async fetchManyByCategory(category: string,) {
        const products = await prisma.product.findMany({
            where: {
                category: category.toUpperCase(),

            }
        })

        return products
    }

    async fetchManyByCategoryAndType(category: string, query: string,) {
        const products = await prisma.product.findMany({
            where: {
                category: category.toUpperCase(),
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
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

    async update(id: string, data: product) {
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: data?.name,
                image: data?.image,
                available: data?.available === 'false' ? false : true,
                category: data?.category,
                price: data?.price,
                old_price: data?.old_price,
                sizes: data?.sizes
            }
        })

        if (!product) {
            console.log('nao tem')
            return null
        }
        return product
    }

    async countProducts(arr: product[]) {
        const total = arr.filter((item) => item?.available === true)
        if (total.length === 0) {
            return null
        }

        return total.length
    }
}