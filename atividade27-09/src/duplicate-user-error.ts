export class DuplicateUser extends Error {
    public readonly name = 'DuplicateUser'

    constructor() {
        super('Duplicate User.')
    }
}