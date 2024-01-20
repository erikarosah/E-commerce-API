import { Product } from '../../entities/product'

export interface ProductRepository {
    create(product: Product): Promise<void>
    findByName(name: string): Promise<Product | null>
}