"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
class Bike {
    constructor(name, type, bodySize, maxLoad, rate, latitude = 0, longitude = 0, description, ratings, imageUrls, available = true, id // ? é algo opcional
    ) {
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.maxLoad = maxLoad;
        this.rate = rate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.ratings = ratings;
        this.imageUrls = imageUrls;
        this.available = available;
        this.id = id;
    }
}
exports.Bike = Bike;
