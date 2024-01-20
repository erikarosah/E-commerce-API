import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'
import { Product } from './product'
import { Optional } from '@/core/types/optional'

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

    get email() {
        return this.props.email
    }

    get cart() {
        return this.props.cart
    }

    get password() {
        return this.props.password
    }

    set cart(data: Product[]) {
        this.props.cart = data
    }

    static create(props: Optional<UserProps, 'cart'>, id?: UniqueID) {
        const user = new User({
            ...props,
            cart: props.cart ?? []
        },
            id
        )

        return user
    }
}