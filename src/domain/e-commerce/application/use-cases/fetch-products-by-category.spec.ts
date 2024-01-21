import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'
import { FetchProductsByCategoryUseCase } from './fetch-products-by-category'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: FetchProductsByCategoryUseCase

describe('Fetch Products By Category Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new FetchProductsByCategoryUseCase(inMemoryProductRepositoty)
    })

    it('should be able to fetch products by category', async () => {
        for (let i = 1; i <= 22; i++) {
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

        inMemoryProductRepositoty.create(
            Product.create({
                name: 'some product',
                available: true,
                category: 'Fem',
                image: 'url',
                new_price: 50,
                old_price: 40
            },
                new UniqueID()
            )
        )

        const { products } = await sut.execute({
            category: 'Kids',
            page: 2
        })

        expect(products).toHaveLength(2)
        expect(products[0].name).toBe('product 21')
        expect(products[1].name).toBe('product 22')
    })

    it('should not be able to fetch products if not exists', async () => {
        await expect(() =>
            sut.execute({
                category: 'Kids',
                page: 1
            })
        ).rejects.toBeInstanceOf(Error)
    })
})