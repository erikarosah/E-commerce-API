import { ProductRepository } from '@/domain/e-commerce/application/repositories/product-repository'
import { Product } from '@/domain/e-commerce/entities/product'

export class InMemoryProductRepository implements ProductRepository {
    public items: Product[] = []

    async create(product: Product) {
        this.items.push(product)
    }

    async findByName(name: string) {
        const product = this.items.find((item) => item.name === name)

        if (product) {
            return product
        }

        return null
    }

    async findById(id: string) {
        const product = this.items.find((item) => item.id.toString() === id)

        if (product) {
            return product
        }

        return null
    }

    async delete(id: string) {
        const productIndex = this.items.findIndex((item) => item.id.toString() === id)

        this.items.splice(productIndex, 1)
    }

    async fetchProducts(page: number) {
        return this.items.slice((page - 1) * 20, page * 20)
    }

    async fetchManyByCategory(category: string, page: number) {
        const items = this.items.filter((item) => item.category === category).
            slice((page - 1) * 20, page * 20)

        if (!items) {
            return null
        }

        return items
    }

    async fetchUnavailables() {
        const items = this.items.filter((item) => item.available === false)
        if (!items) {
            return null
        }

        return items
    }
}