import { UniqueID } from './unique-id'

export class Entity<T>{
    private _id: UniqueID
    protected props: T

    get id() {
        return this._id
    }

    protected constructor(props: any, id?: UniqueID) {
        this.props = props
        this._id = id ?? new UniqueID()
    }
}