export class userOpenRentError extends Error {
    public readonly name = 'UserOpenRentError'

    constructor() {
        super('User with open rent(s).')
    }
}