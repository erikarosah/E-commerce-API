import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { AddToCartUseCase } from './add-to-cart'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { User } from '../../entities/user'
import { Product } from '../../entities/product'

let inMemoryUserRepositoty: InMemoryUserRepository
let inMemoryProductRepositoty: InMemoryProductRepository
let sut: AddToCartUseCase

describe('Add to Cart Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepositoty = new InMemoryUserRepository
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new AddToCartUseCase(inMemoryUserRepositoty, inMemoryProductRepositoty)
    })

    it('should be able to add a product to cart', async () => {
        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepositoty.create(user)

        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40,
            sizes: ['P']
        })

        inMemoryProductRepositoty.create(product)

        await sut.execute({
            userId: user.id.toString(),
            productId: product.id.toString()
        })

        expect(inMemoryUserRepositoty.items[0].cart).toHaveLength(1)
        expect(inMemoryUserRepositoty.items[0].cart).toEqual([
            expect.objectContaining({ name: product.name })
        ])

    })

    it('should be able to add several products to cart', async () => {
        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepositoty.create(user)

        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40
        })

        inMemoryProductRepositoty.create(product)

        for (let i = 1; i <= 5; i++) {
            await sut.execute({
                userId: user.id.toString(),
                productId: product.id.toString()
            })
        }

        expect(inMemoryUserRepositoty.items[0].cart).toHaveLength(1)
        expect(inMemoryUserRepositoty.items[0].cart).toEqual([
            expect.objectContaining({ adds: 5 })
        ])

    })
})