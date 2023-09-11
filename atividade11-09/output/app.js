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
        const newId = crypto_1.default.randomUUID();
        user.id = newId;
        this.users.push(user);
        return newId;
    }
    //register bike
    // registerBike(bike: Bike): string{
    //     bike.id = crypto.randomUUID()
    //     this.bikes.push(bike)
    //     return bike.id
    // }
    registerBike(bike) {
        const newId = crypto_1.default.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
        return newId;
    }
    //removeUser
    // removeUser(user: User): void{
    //     this.users.slice(this.users.indexOf(user))
    // }
    removeUser(email) {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return;
        }
        throw new Error('User not found.');
    }
    //rent bike
    // rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date){
    //     const bike = this.findBike(bikeId)
    //     const user = this.findUser(userEmail)
    //     //Arrray somente com as reservas para bike
    //     const result = this.rents.filter(rent => rent.bike === bike)
    //     //tentar criar o rent com o array e as informações da reserva
    //     const newRent = Rent.create(result, bike, user, startDate, endDate)
    //     //adicionar a reserva ao array de reservas
    //     this.rents.push(newRent)
    // }
    rentBike(bikeId, userEmail, startDate, endDate) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        const user = this.findUser(userEmail);
        if (!bike) {
            throw new Error('Bike not found.');
        }
        if (!user) {
            throw new Error('User not found.');
        }
        const bikeRents = this.rents.filter(rent => rent.bike.id === bikeId && !rent.dateReturn);
        const newRent = rent_1.Rent.create(bikeRents, bike, user, startDate, endDate);
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
