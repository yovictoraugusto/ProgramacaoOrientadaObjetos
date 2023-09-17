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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new app_1.App();
        // const user1 = new User('Jose', 'jose@email.com', '1234')
        // await app.registerUser(user1)
        // console.log(user1.password)
        const bike = new bike_1.Bike('caloi mountainbike', 'Mountain Bike', 0, 0, 234, 1234, 100.0);
        // const clock = sinon.useFakeTimers();
        // app.registerBike(bike)
        // //console.log('Bike disponível: ', bike.available)
        // app.rentBike(bike.id, user1.email)
        // //console.log('Bike disponível: ', bike.available)
        // clock.tick(1000 * 60 * 65)
        // //console.log(app.returnBike(bike.id, user1.email))
        // //console.log('Bike disponível: ', bike.available)
        // const test = await app.authenticate(user1.email, '1234')
        // console.log(test)
        app.readHTMLFile(bike);
        console.log(bike);
    });
}
main();
