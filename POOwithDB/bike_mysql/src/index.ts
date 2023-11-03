import { App } from "./app";
import { Bike } from "./bike";
import { DB } from "./db";
import { DBBikeRepo } from "./models/bike-repo";
import { DBRentRepo } from "./models/rent-repo";
import { DBUserRepo } from "./models/user-repo";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'
import { Location } from "./location";

async function main() {
    const db = new DB();
    db.query_test();
    const userRepo = new DBUserRepo()
    const bikeRepo = new DBBikeRepo()
    const rentRepo = new DBRentRepo()
    //const clock = sinon.useFakeTimers();
    const app = new App(userRepo, bikeRepo, rentRepo,db);
    console.log(await app.listUsers());
    //const user = new User('Jose', 'jose@mail.com', '1234')
    //console.log("Result: " + await app.registerUser(user));
    //console.log("Result: " + (await app.findUser('Pruu')).name);
    //console.log("Result: " + (await app.removeUser('Pruu')));
    //console.log("Result: " + (await app.findUser('Pruu')).name);
    console.log(await app.listBikes());
    console.log(await app.findBike('1'));
    const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, ['teste','teste2'])
    console.log(await app.registerBike(bike))
    const newYork = new Location(40.753056, -73.983056)
    await app.moveBikeTo('4', newYork)
    //console.log("Result: " + await app.findUser('findUser'));
    return;
    /*
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    console.log('Bike disponível: ', bike.available)
    app.rentBike(bike.id, user1.email)
    console.log('Bike disponível: ', bike.available)
    */
    //clock.tick(1000 * 60 * 65)
    //console.log(app.returnBike(bike.id, user1.email))
    //console.log('Bike disponível: ', bike.available)

}

main()








