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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBBikeRepo = void 0;
var bike_1 = require("../../src/bike");
var location_1 = require("../location");
var DBBikeRepo = /** @class */ (function () {
    function DBBikeRepo() {
        this.bikes = [];
    }
    DBBikeRepo.prototype.find = function (db, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var bike;
                        db.connection.query('select `id`, `name`, `type`, `bodySize`, `maxLoad`, `rate`, `description`, `ratings`, `available`, `latitude`, `longitude` from bikes WHERE id = ? LIMIT 1', [id], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (results.length > 0) {
                                    var value = results[0];
                                    bike = new bike_1.Bike(value['name'], value['type'], value['bodySize'], value['maxLoad'], value['rate'], value['description'], value['ratings'], [], value['available'], new location_1.Location(value['latitude'], value['longitude']), value['id']);
                                    db.connection.query('select imageUrl from bike_imageurls WHERE bike_id = ? LIMIT 1', [id], function (error, results, fields) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            results.forEach(function (value) {
                                                var imageUrl = value['imageUrl'];
                                                bike.imageUrls.push(imageUrl);
                                            });
                                        }
                                    });
                                }
                                resolve(bike);
                            }
                        });
                    })];
            });
        });
    };
    DBBikeRepo.prototype.add = function (db, bike) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("INSERT INTO bikes (name, type, bodySize, maxLoad, rate, description, ratings, available, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.available, bike.location.latitude, bike.location.longitude], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                var id = results.insertId;
                                if (bike.imageUrls.length > 1) {
                                    var temp_query = 'insert into bike_imageurls (bike_id,imageUrl) values';
                                    var aux = 0;
                                    bike.imageUrls.forEach(function (value) {
                                        if (aux != 0) {
                                            temp_query = temp_query + ',';
                                        }
                                        temp_query = temp_query + '("' + id + '","' + value + '")';
                                        aux = aux + 1;
                                    });
                                    temp_query = temp_query + ';';
                                    db.connection.query(temp_query, function (error, results, fields) {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve(id.toString());
                                        }
                                    });
                                }
                                resolve(id.toString());
                            }
                        });
                    })];
            });
        });
    };
    DBBikeRepo.prototype.remove = function (db, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("DELETE FROM bike_imageurls where bike_id = ?", [id], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                db.connection.query("DELETE FROM bikes where id = ?", [id], function (error, results, fields) {
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        resolve(results.affectedRows.toString());
                                    }
                                });
                            }
                        });
                    })];
            });
        });
    };
    DBBikeRepo.prototype.update = function (db, id, bike) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("UPDATE bikes SET name = ?, type = ?, bodySize = ?, maxLoad = ?, rate = ?, description = ?, ratings = ?, available = ?, latitude = ?, longitude = ? WHERE id = ?", [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.available, bike.location.latitude, bike.location.longitude, bike.id], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                var nid = results.insertId;
                                db.connection.query("DELETE FROM bike_imageurls where bike_id = ?", [id], function (error, results, fields) {
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        if (bike.imageUrls.length > 1) {
                                            var temp_query = 'insert into bike_imageurls (bike_id,imageUrl) values';
                                            var aux = 0;
                                            bike.imageUrls.forEach(function (value) {
                                                if (aux != 0) {
                                                    temp_query = temp_query + ',';
                                                }
                                                temp_query = temp_query + '("' + id + '","' + value + '")';
                                                aux = aux + 1;
                                            });
                                            temp_query = temp_query + ';';
                                            db.connection.query(temp_query, function (error, results, fields) {
                                                if (error) {
                                                    reject(error);
                                                }
                                                else {
                                                    resolve(nid.toString());
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    })];
            });
        });
    };
    DBBikeRepo.prototype.list = function (db) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var bikes = [];
                        db.connection.query('select `id`, `name`, `type`, `bodySize`, `maxLoad`, `rate`, `description`, `ratings`, `available`, `latitude`, `longitude` from bikes ORDER BY id ASC', function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                results.forEach(function (value) {
                                    var user = new bike_1.Bike(value['name'], value['type'], value['bodySize'], value['maxLoad'], value['rate'], value['description'], value['ratings'], [], value['available'], new location_1.Location(value['latitude'], value['longitude']), value['id']);
                                    bikes.push(user);
                                });
                                db.connection.query('select bike_id,imageUrl from bike_imageurls', function (error, results, fields) {
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        results.forEach(function (value) {
                                            var bike_id = value['bike_id'];
                                            var imageUrl = value['imageUrl'];
                                            var userIndex = bikes.findIndex(function (bike) { return bike.id === bike_id; });
                                            if (userIndex >= 0) {
                                                bikes[userIndex].imageUrls.push(imageUrl);
                                            }
                                        });
                                        resolve(bikes);
                                    }
                                });
                            }
                        });
                    })];
            });
        });
    };
    return DBBikeRepo;
}());
exports.DBBikeRepo = DBBikeRepo;
