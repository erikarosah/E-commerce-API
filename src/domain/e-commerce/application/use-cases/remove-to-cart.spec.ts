import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { User } from '../../entities/user'
import { Product } from '../../entities/product'
import { AddToCartUseCase } from './add-to-cart'
import { RemoveToCartUseCase } from './remove-to-cart'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepositoty: InMemoryProductRepository
let addToCartUseCase: AddToCartUseCase
let sut: RemoveToCartUseCase

describe('Remove to Cart Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new RemoveToCartUseCase(inMemoryUserRepository, inMemoryProductRepositoty)
    })

    it('should be able to remove a product to cart', async () => {
        addToCartUseCase = new AddToCartUseCase(inMemoryUserRepository, inMemoryProductRepositoty)

        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepository.create(user)

        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40
        })

        inMemoryProductRepositoty.create(product)

        for (let i = 1; i <= 10; i++) {
            await addToCartUseCase.execute({
                productId: product.id.toString(),
                userId: user.id.toString()
            })
        }

        const result = await sut.execute({
            productId: product.id.toString(),
            userId: user.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items[0].cart).toHaveLength(0)
    })
})