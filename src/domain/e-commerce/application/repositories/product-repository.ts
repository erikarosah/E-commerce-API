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
    available: boolean | string;
    sizes: string[];
} | null

export interface ProductRepository {
    create(product: ProductCreateInput): Promise<void>
    findByName(query: string): Promise<product[] | null>
    findByNameUnique(name: string): Promise<product | null>
    findById(id: string): Promise<product | null>
    delete(id: string): Promise<void>
    fetchProducts(): Promise<product[]>
    fetchManyByCategory(category: string): Promise<product[] | null>
    fetchUnavailables(): Promise<product[] | null>
    fetchManyByCategoryAndType(category: string, query: string): Promise<product[] | null>
    update(id: string, data: any): Promise<product | null>
}