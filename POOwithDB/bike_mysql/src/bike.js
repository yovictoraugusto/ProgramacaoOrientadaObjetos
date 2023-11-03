"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
var location_1 = require("./location");
var Bike = /** @class */ (function () {
    function Bike(name, type, bodySize, maxLoad, rate, description, ratings, imageUrls, available, location, id) {
        if (available === void 0) { available = true; }
        if (location === void 0) { location = new location_1.Location(0.0, 0.0); }
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.maxLoad = maxLoad;
        this.rate = rate;
        this.description = description;
        this.ratings = ratings;
        this.imageUrls = imageUrls;
        this.available = available;
        this.location = location;
        this.id = id;
    }
    return Bike;
}());
exports.Bike = Bike;
