import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { FetchProductsUseCase } from './fetch-products'
import { Product } from '../../entities/product'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: FetchProductsUseCase

describe('Fetch Products Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new FetchProductsUseCase(inMemoryProductRepositoty)
    })

    it('should be able to fetch products', async () => {
        for (let i = 1; i <= 22; i++) {
            inMemoryProductRepositoty.create(
                Product.create({
                    name: `product ${i}`,
                    available: true,
                    category: 'Kids',
                    image: 'url',
                    price: 50,
                    old_price: 40
                })
            )
        }

        const result = await sut.execute({
            page: 2
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toMatchObject(
            expect.objectContaining({ products: expect.any(Array) })
        )
    })

    it('should not be able to fetch products if not exists', async () => {
        const result = await sut.execute({
            page: 1
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})