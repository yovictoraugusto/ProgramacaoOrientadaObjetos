export class DuplicateBike extends Error {
    public readonly name = 'DuplicateBike'

    constructor() {
        super('Duplicate bike.')
    }
}