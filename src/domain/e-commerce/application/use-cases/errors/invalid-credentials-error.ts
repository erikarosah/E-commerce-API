import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidCrendentialsError extends Error implements UseCaseError {
    constructor() {
        super('Invalid credentials')
    }
}