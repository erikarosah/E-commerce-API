import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'
import { Product } from './product'

interface UserProps {
    name: string,
    email: string,
    password: string,
    cart: Product[]
}

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    get cart() {
        return this.props.cart
    }

    set cart(data: Product[]) {
        this.props.cart = data
    }

    static create(props: UserProps, id?: UniqueID) {
        const user = new User({
            ...props,
        },
            id
        )

        return user
    }
}