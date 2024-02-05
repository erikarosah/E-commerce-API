import { ProductRepository } from '@/domain/e-commerce/application/repositories/product-repository'
import { Product } from '@/domain/e-commerce/entities/product'

export class InMemoryProductRepository implements ProductRepository {
    public items: Product[] = []

    async create(product: Product) {
        this.items.push(product)
    }

    async findByName(query: string) {
        const products = this.items.filter((item) => item.name.includes(query))

        if (!products) {
            return null
        }

        return products
    }

    async findByNameUnique(name: string) {
        const product = this.items.find((item) => item.name.includes(name))

        if (!product) {
            return null
        }

        return product
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

    async fetchProducts() {
        return this.items
    }

    async fetchManyByCategory(category: string) {
        const items = this.items.filter((item) => item.category === category)

        if (!items) {
            return null
        }

        return items
    }

    async fetchManyByCategoryAndType(category: string, query: string) {
        const itemsCategory = this.items.filter((item) => item.category === category)

        const items = itemsCategory.filter((item) => item.name.includes(query))

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

    async update(id: string, data: Product) {
        const productIndex = this.items.findIndex((item) => item.id === id)
        const product = this.items[productIndex] = data
        if (!product) {
            return null
        }

        return product
    }
}