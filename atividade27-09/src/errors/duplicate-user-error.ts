export class DuplicateUserError extends Error {
    public readonly name = 'DuplicateUser'

    constructor() {
        super('Duplicate User.')
    }
}