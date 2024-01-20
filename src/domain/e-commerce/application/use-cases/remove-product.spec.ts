import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { RemoveProductUseCase } from './remove-product'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'

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
            category: 'some category',
            image: 'url',
            new_price: 50,
            old_price: 40
        },
            new UniqueID('1')
        )

        inMemoryProductRepositoty.create(product)

        await sut.execute({
            id: product.id.toString()
        })

        expect(inMemoryProductRepositoty.items).toHaveLength(0)
    })

    it('should not be able to remove a non-existent product ', async () => {
        expect(() =>
            sut.execute({
                id: '1'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})