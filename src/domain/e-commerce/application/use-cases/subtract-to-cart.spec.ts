import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { SubtractToCartUseCase } from './subtract-to-cart'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { User } from '../../entities/user'
import { Product } from '../../entities/product'
import { AddToCartUseCase } from './add-to-cart'
import { UniqueID } from '@/core/entities/unique-id'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepositoty: InMemoryProductRepository
let addToCartUseCase: AddToCartUseCase
let sut: SubtractToCartUseCase

describe('Subtract to Cart Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new SubtractToCartUseCase(inMemoryUserRepository, inMemoryProductRepositoty)
    })

    it('should be able to subtract a product to cart', async () => {
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

        await addToCartUseCase.execute({
            productId: product.id.toString(),
            userId: user.id.toString()
        })

        const result = await sut.execute({
            productId: product.id.toString(),
            userId: user.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items[0].cart).toHaveLength(0)
    })

    it('should be able to subtract several products to cart', async () => {
        addToCartUseCase = new AddToCartUseCase(inMemoryUserRepository, inMemoryProductRepositoty)

        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepository.create(user)

        for (let i = 1; i <= 5; i++) {
            inMemoryProductRepositoty.create(
                Product.create({
                    name: `product ${i}`,
                    available: true,
                    category: 'Kids',
                    image: 'url',
                    new_price: 50,
                    old_price: 40
                },
                    new UniqueID(`${i}`)
                )
            )
        }

        for (let i = 1; i <= 5; i++) {
            await addToCartUseCase.execute({
                productId: `${i}`,
                userId: user.id.toString()
            })
        }

        for (let i = 1; i <= 4; i++) {
            await sut.execute({
                productId: `${i}`,
                userId: user.id.toString()
            })
        }

        expect(inMemoryUserRepository.items[0].cart).toHaveLength(1)
        expect(inMemoryUserRepository.items[0].cart).toEqual([
            expect.objectContaining({ name: 'product 5' })
        ])
    })
})