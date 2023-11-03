"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
var Rent = /** @class */ (function () {
    function Rent(bike, user, start, end, id) {
        if (end === void 0) { end = undefined; }
        this.bike = bike;
        this.user = user;
        this.start = start;
        this.end = end;
        this.id = id;
    }
    return Rent;
}());
exports.Rent = Rent;
