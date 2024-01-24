export type ProductCreateInput = {
    id?: string
    name: string
    image: string
    category: string
    price: number
    old_price?: number | null
    available: boolean
    sizes?: any | string
    user_id?: any
}

export type product = {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    old_price: number | null;
    available: boolean;
    sizes: string[];
} | null

export interface ProductRepository {
    create(product: ProductCreateInput): Promise<void>
    findByName(name: string): Promise<product | null>
    findById(id: string): Promise<product | null>
    delete(id: string): Promise<void>
    fetchProducts(page: number): Promise<product[]>
    fetchManyByCategory(category: string, page: number): Promise<product[] | null>
}