import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { RemoveProductUseCase } from './remove-product'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: RemoveProductUseCase

describe('Remove Product Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new RemoveProductUseCase(inMemoryProductRepositoty)
    })

    it('should be able to remove a product', async () => {
        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'Kids',
            image: 'url',
            new_price: 50,
            old_price: 40
        },
            new UniqueID('1')
        )

        inMemoryProductRepositoty.create(product)

        const result = await sut.execute({
            id: product.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryProductRepositoty.items).toHaveLength(0)
    })

    it('should not be able to remove a non-existent product ', async () => {
        const result = await sut.execute({
            id: '1'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})