"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bike_1 = require("./bike");
const db_1 = require("./db");
const bike_repo_1 = require("./models/bike-repo");
const rent_repo_1 = require("./models/rent-repo");
const user_repo_1 = require("./models/user-repo");
const location_1 = require("./location");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new db_1.DB();
        db.query_test();
        const userRepo = new user_repo_1.DBUserRepo();
        const bikeRepo = new bike_repo_1.DBBikeRepo();
        const rentRepo = new rent_repo_1.DBRentRepo();
        //const clock = sinon.useFakeTimers();
        const app = new app_1.App(userRepo, bikeRepo, rentRepo, db);
        console.log(yield app.listUsers());
        //const user = new User('Jose', 'jose@mail.com', '1234')
        //console.log("Result: " + await app.registerUser(user));
        //console.log("Result: " + (await app.findUser('Pruu')).name);
        //console.log("Result: " + (await app.removeUser('Pruu')));
        //console.log("Result: " + (await app.findUser('Pruu')).name);
        console.log(yield app.listBikes());
        console.log(yield app.findBike('1'));
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, ['teste', 'teste2']);
        console.log(yield app.registerBike(bike));
        const newYork = new location_1.Location(40.753056, -73.983056);
        yield app.moveBikeTo('4', newYork);
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
    });
}
main();
