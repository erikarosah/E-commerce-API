import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'
import { Optional } from '@/core/types/optional'

interface ProductProps {
    name: string,
    image: string,
    category: string,
    new_price: number,
    old_price: number,
    available: boolean,
    adds: number
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

    get new_price() {
        return this.props.new_price
    }

    get old_price() {
        return this.props.old_price
    }

    get available() {
        return this.props.available
    }

    get adds() {
        return this.props.adds
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

    set new_price(new_price: number) {
        this.props.new_price = new_price
    }

    set old_price(old_price: number) {
        this.props.old_price = old_price
    }

    set available(value: boolean) {
        this.props.available = value
    }

    set adds(value: number) {
        this.props.adds = value
    }

    static create(props: Optional<ProductProps, 'adds'>, id?: UniqueID) {
        const product = new Product({
            ...props,
            adds: props.adds ?? 1
        },
            id
        )

        return product
    }
}