import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./bike-not-found-error";
import { UnavailableBikeError } from ".//unavailable-bike-error";
import { UserNotFoundError } from ".//user-not-found-error";
import { UserNotExist } from "./user-not-exist-error";
import { DuplicateUser } from "./duplicate-user-error";
import { RentNotFound } from "./rent-not-found-error";
import { DuplicateBike } from "./duplicate-bike-error";

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })

    
    it('should throw bike not found error when bike is not found', () => {
        const app = new App()
        expect(() => {
            app.findBike('fake-id')
        }).toThrow(BikeNotFoundError)
    })

    it('should throw user not found error when user not exist', () => {
        const app = new App()
        expect(() => {
            app.removeUser('fake-email@gmail.com')
        }).toThrow(UserNotExist)
    })

    
    it('should throw duplicate user error when trying to register a user again', async () => {
        const app = new App()
        const user = new User('Teste', 'Teste@gmail.com', 'testando', 'fake-id')
        await app.registerUser(user)
        expect(async () => {
            await app.registerUser(user)
        }).rejects.toThrow(DuplicateUser)
    })
    
    it('should throw duplicate bike error when trying to register a bike again', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        expect(() => {
            app.registerBike(bike)
        }).toThrow(DuplicateBike)
    })

    it('shoud throw user not found error when user is not found', async () => {
        const app = new App()
        expect(async () => {
            await app.authenticate('fakeEmail@gmail.com', 'fakePassword')
        }).rejects.toThrow(UserNotFoundError)
    })
})