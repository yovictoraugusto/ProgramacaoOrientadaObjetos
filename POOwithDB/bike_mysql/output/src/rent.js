"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, start, end = undefined, id) {
        this.bike = bike;
        this.user = user;
        this.start = start;
        this.end = end;
        this.id = id;
    }
}
exports.Rent = Rent;
