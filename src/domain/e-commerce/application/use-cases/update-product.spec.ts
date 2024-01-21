import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { UpdateProductUseCase } from './update-product'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: UpdateProductUseCase

describe('Update Product Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new UpdateProductUseCase(inMemoryProductRepositoty)
    })

    it('should be able to update product', async () => {
        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50
        },
            new UniqueID('1')
        )

        inMemoryProductRepositoty.create(product)

        const result = await sut.execute({
            id: product.id.toString(),
            name: 'new name product',
            available: false,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 0,
            sizes: ['P']
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryProductRepositoty.items[0]).toMatchObject({
            name: 'new name product',
            available: false,
            sizes: ['P']
        })
    })

    it('should not be able to update product if not exists', async () => {
        const result = await sut.execute({
            id: '1',
            name: 'new name product',
            available: false,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40,
            sizes: []
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})