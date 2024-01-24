import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { randomUUID } from 'crypto'

interface ProductProps {
    id?: string,
    name: string,
    image: string,
    category: string,
    price: number,
    old_price: number,
    available: boolean,
    sizes: string[]
}

export class Product extends Entity<ProductProps> {
    get name() {
        return this.props.name
    }

    get image() {
        return this.props.image
    }

    get category() {
        return this.props.category
    }

    get price() {
        return this.props.price
    }

    get old_price() {
        return this.props.old_price
    }

    get available() {
        return this.props.available
    }

    get sizes() {
        return this.props.sizes
    }

    set name(name: string) {
        this.props.name = name
    }

    set image(image: string) {
        this.props.image = image
    }

    set category(category: string) {
        this.props.category = category
    }

    set price(price: number) {
        this.props.price = price
    }

    set old_price(old_price: number) {
        this.props.old_price = old_price
    }

    set available(value: boolean) {
        this.props.available = value
    }

    set sizes(value: string[]) {
        this.props.sizes = value
    }

    static create(props: Optional<ProductProps, 'sizes' | 'old_price' | 'id'>) {
        const product = new Product({
            ...props,
            sizes: props.sizes ?? ['P', 'M', 'G', 'XG'],
            old_price: props.old_price ?? 0,
            id: props.id ?? randomUUID()
        })

        return product
    }
}