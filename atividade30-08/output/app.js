"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    findUser(email) {
        return this.users.find(user => user.email === email);
    }
    findBike(id) {
        return this.bikes.find(bike => bike.id === id);
    }
    registerUser(user) {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto_1.default.randomUUID();
        this.users.push(user);
        return user.id;
    }
    //removeUser
    removeUser(user) {
        this.users.slice(this.users.indexOf(user));
    }
    //register bike
    registerBike(bike) {
        bike.id = crypto_1.default.randomUUID();
        this.bikes.push(bike);
        return bike.id;
    }
    //rent bike
    rentBike(bikeId, userEmail, startDate, endDate) {
        const bike = this.findBike(bikeId);
        const user = this.findUser(userEmail);
        //Arrray somente com as reservas para bike
        const result = this.rents.filter(rent => rent.bike === bike);
        //tentar criar o rent com o array e as informações da reserva
        const newRent = rent_1.Rent.create(result, bike, user, startDate, endDate);
        //adicionar a reserva ao array de reservas
        this.rents.push(newRent);
    }
    //return bike
    returnBike(rent) {
        const today = new Date();
        for (const rRent of this.rents) {
            if (rRent === rent) {
                rent.dateReturn = today;
            }
        }
    }
}
exports.App = App;
