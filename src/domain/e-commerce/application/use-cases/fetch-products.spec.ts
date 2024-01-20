import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { FetchProductsUseCase } from './fetch-products'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: FetchProductsUseCase

describe('Fetch Products Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new FetchProductsUseCase(inMemoryProductRepositoty)
    })

    it('should be able to fetch products', async () => {
        for (let i = 1; i <= 3; i++) {
            inMemoryProductRepositoty.create(
                Product.create({
                    name: `product ${i}`,
                    available: true,
                    category: 'some category',
                    image: 'url',
                    new_price: 50,
                    old_price: 40
                },
                    new UniqueID(`${i}`)
                )
            )
        }

        const { products } = await sut.execute()

        expect(products).toHaveLength(3)
    })

    it('should not be able to fetch products if not exists', async () => {
        await expect(() =>
            sut.execute()
        ).rejects.toBeInstanceOf(Error)
    })
})