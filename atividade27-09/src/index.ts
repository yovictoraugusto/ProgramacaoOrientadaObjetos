import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'
import { UserRepo } from "../src/ports/user-repo"
import { BikeRepo } from "../src/ports/bike-repo"
import { RentRepo } from "../src/ports/rent-repo"


let userRepo: UserRepo
let bikeRepo: BikeRepo
let rentRepo: RentRepo

async function main() {


    const clock = sinon.useFakeTimers();
    const app = new App(userRepo, bikeRepo, rentRepo)
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    console.log('Bike disponível: ', bike.available)
    app.rentBike(bike.id, user1.email)
    console.log('Bike disponível: ', bike.available)
    clock.tick(1000 * 60 * 65)
    console.log(app.returnBike(bike.id, user1.email))
    console.log('Bike disponível: ', bike.available)
}

main()








