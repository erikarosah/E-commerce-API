import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { RegisterProductUseCase } from './register-product'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: RegisterProductUseCase

describe('Register Product Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new RegisterProductUseCase(inMemoryProductRepositoty)
    })

    it('should be able to register a product', async () => {
        await sut.execute({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40,
            sizes: []
        })

        expect(inMemoryProductRepositoty.items).toHaveLength(1)
        expect(inMemoryProductRepositoty.items[0].name).toEqual('some product')
    })

    it('should not be able to register a product once again', async () => {
        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40,
            sizes: []
        },
            new UniqueID('1')
        )

        inMemoryProductRepositoty.create(product)

        expect(() =>
            sut.execute(product)
        ).rejects.toBeInstanceOf(Error)
    })
})