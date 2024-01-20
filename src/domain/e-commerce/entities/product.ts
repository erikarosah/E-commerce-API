import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

interface ProductProps {
    name: string,
    image: string,
    category: string,
    new_price: number,
    old_price: number,
    available: boolean
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

    static create(props: ProductProps, id?: UniqueID) {
        const product = new Product({
            ...props,
        },
            id
        )

        return product
    }
}