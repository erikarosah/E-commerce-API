import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { Product } from '../../entities/product'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { FetchProductsUnavailableUseCase } from './fetch-products-unavailable'

let inMemoryProductRepository: InMemoryProductRepository
let sut: FetchProductsUnavailableUseCase

describe('Fetch Products Unavailable Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepository = new InMemoryProductRepository
        sut = new FetchProductsUnavailableUseCase(inMemoryProductRepository)
    })

    it('should be able to fetch unavailable products', async () => {
        for (let i = 1; i <= 5; i++) {
            inMemoryProductRepository.create(
                Product.create({
                    name: `product ${i}`,
                    available: false,
                    category: 'Kids',
                    image: 'url',
                    price: 50,
                    old_price: 40,
                })
            )
        }

        for (let i = 1; i <= 2; i++) {
            inMemoryProductRepository.create(
                Product.create({
                    name: `product ${i}`,
                    available: true,
                    category: 'Kids',
                    image: 'url',
                    price: 50,
                    old_price: 40,
                })
            )
        }

        const result = await sut.execute()

        expect(result.isRight()).toBe(true)
        expect(result.value).toMatchObject(
            expect.objectContaining({ products: expect.any(Array) })
        )
        expect(inMemoryProductRepository.items).toHaveLength(7)
    })

    it('should not be able to fetch products if not exists', async () => {
        const result = await sut.execute()

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})