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
exports.App = void 0;
var crypt_1 = require("./crypt");
var rent_1 = require("./rent");
var bike_not_found_error_1 = require("./errors/bike-not-found-error");
var unavailable_bike_error_1 = require("./errors/unavailable-bike-error");
var user_not_found_error_1 = require("./errors/user-not-found-error");
var duplicate_user_error_1 = require("./errors/duplicate-user-error");
var user_has_open_rent_error_1 = require("./errors/user-has-open-rent-error");
var App = /** @class */ (function () {
    function App(userRepo, bikeRepo, rentRepo, db) {
        this.userRepo = userRepo;
        this.bikeRepo = bikeRepo;
        this.rentRepo = rentRepo;
        this.db = db;
        this.crypt = new crypt_1.Crypt();
    }
    App.prototype.findUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find(this.db, email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new user_not_found_error_1.UserNotFoundError();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    App.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find(this.db, user.email)];
                    case 1:
                        if (_a.sent()) {
                            throw new duplicate_user_error_1.DuplicateUserError();
                        }
                        return [4 /*yield*/, this.crypt.encrypt(user.password)];
                    case 2:
                        encryptedPassword = _a.sent();
                        user.password = encryptedPassword;
                        return [4 /*yield*/, this.userRepo.add(this.db, user)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.authenticate = function (userEmail, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUser(userEmail)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.crypt.compare(password, user.password)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.registerBike = function (bike) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bikeRepo.add(this.db, bike)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.removeUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUser(email)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.rentRepo.findOpenFor(this.db, email)];
                    case 2:
                        if ((_a.sent()).length > 0) {
                            throw new user_has_open_rent_error_1.UserHasOpenRentError();
                        }
                        return [4 /*yield*/, this.userRepo.remove(this.db, email)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.rentBike = function (bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var bike, user, newRent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBike(bikeId)];
                    case 1:
                        bike = _a.sent();
                        if (!bike.available) {
                            throw new unavailable_bike_error_1.UnavailableBikeError();
                        }
                        return [4 /*yield*/, this.findUser(userEmail)];
                    case 2:
                        user = _a.sent();
                        bike.available = false;
                        return [4 /*yield*/, this.bikeRepo.update(this.db, bikeId, bike)];
                    case 3:
                        _a.sent();
                        newRent = new rent_1.Rent(bike, user, new Date());
                        return [4 /*yield*/, this.rentRepo.add(this.db, newRent)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.returnBike = function (bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var now, rent, hours;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, this.rentRepo.findOpen(this.db, bikeId, userEmail)];
                    case 1:
                        rent = _a.sent();
                        if (!rent)
                            throw new Error('Rent not found.');
                        rent.end = now;
                        return [4 /*yield*/, this.rentRepo.update(this.db, rent.id, rent)];
                    case 2:
                        _a.sent();
                        rent.bike.available = true;
                        return [4 /*yield*/, this.bikeRepo.update(this.db, rent.bike.id, rent.bike)];
                    case 3:
                        _a.sent();
                        hours = diffHours(rent.end, rent.start);
                        return [2 /*return*/, hours * rent.bike.rate];
                }
            });
        });
    };
    App.prototype.listUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.list(this.db)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listBikes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bikeRepo.list(this.db)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.moveBikeTo = function (bikeId, location) {
        return __awaiter(this, void 0, void 0, function () {
            var bike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBike(bikeId)];
                    case 1:
                        bike = _a.sent();
                        bike.location.latitude = location.latitude;
                        bike.location.longitude = location.longitude;
                        return [4 /*yield*/, this.bikeRepo.update(this.db, bikeId, bike)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.findBike = function (bikeId) {
        return __awaiter(this, void 0, void 0, function () {
            var bike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bikeRepo.find(this.db, bikeId)];
                    case 1:
                        bike = _a.sent();
                        if (!bike)
                            throw new bike_not_found_error_1.BikeNotFoundError();
                        return [2 /*return*/, bike];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
function diffHours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}
