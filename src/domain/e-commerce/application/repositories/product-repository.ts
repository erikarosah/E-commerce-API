import { Product } from '../../entities/product'

export interface ProductRepository {
    create(product: Product): Promise<void>
    findByName(name: string): Promise<Product | null>
    findById(id: string): Promise<Product | null>
    delete(id: string): Promise<void>
    fetchProducts(): Promise<Product[]>
    save(product: Product): Promise<void>
}