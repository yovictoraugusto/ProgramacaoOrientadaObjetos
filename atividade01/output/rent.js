"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(client, bicycle, startDate, endDate) {
        this.client = client;
        this.bicycle = bicycle;
        this.startDate = startDate;
        this.endDate = endDate;
        Rent.allRents.push(this);
    }
}
exports.Rent = Rent;
Rent.allRents = []; //Matriz que armazena todos os objetos criados pela classe
