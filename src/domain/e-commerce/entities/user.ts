import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { randomUUID } from 'crypto'

interface UserProps {
    id?: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get password() {
        return this.props.password
    }

    get role() {
        return this.props.role
    }

    set name(name: string) {
        this.props.name = name
    }

    set email(email: string) {
        this.props.email = email
    }

    set password(password: string) {
        this.props.password = password
    }

    set role(role: string) {
        this.props.role = role
    }

    static create(props: Optional<UserProps, 'role' | 'id'>) {
        const user = new User({
            ...props,
            role: props.role ?? 'USER',
            id: props.id ?? randomUUID(),
        })

        return user
    }
}