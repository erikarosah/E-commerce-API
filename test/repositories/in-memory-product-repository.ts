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

        this.items.slice(productIndex, 1)
    }
}