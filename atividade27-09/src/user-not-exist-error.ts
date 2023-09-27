export class UserNotExist extends Error {
    public readonly name = 'UserNotExist'

    constructor() {
        super('User not exist.')
    }
}