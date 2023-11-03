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
var app_1 = require("./app");
var bike_1 = require("./bike");
var db_1 = require("./db");
var bike_repo_1 = require("./models/bike-repo");
var rent_repo_1 = require("./models/rent-repo");
var user_repo_1 = require("./models/user-repo");
var location_1 = require("./location");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db, userRepo, bikeRepo, rentRepo, app, _a, _b, _c, _d, _e, _f, bike, _g, _h, newYork;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    db = new db_1.DB();
                    db.query_test();
                    userRepo = new user_repo_1.DBUserRepo();
                    bikeRepo = new bike_repo_1.DBBikeRepo();
                    rentRepo = new rent_repo_1.DBRentRepo();
                    app = new app_1.App(userRepo, bikeRepo, rentRepo, db);
                    _b = (_a = console).log;
                    return [4 /*yield*/, app.listUsers()];
                case 1:
                    _b.apply(_a, [_j.sent()]);
                    //const user = new User('Jose', 'jose@mail.com', '1234')
                    //console.log("Result: " + await app.registerUser(user));
                    //console.log("Result: " + (await app.findUser('Pruu')).name);
                    //console.log("Result: " + (await app.removeUser('Pruu')));
                    //console.log("Result: " + (await app.findUser('Pruu')).name);
                    _d = (_c = console).log;
                    return [4 /*yield*/, app.listBikes()];
                case 2:
                    //const user = new User('Jose', 'jose@mail.com', '1234')
                    //console.log("Result: " + await app.registerUser(user));
                    //console.log("Result: " + (await app.findUser('Pruu')).name);
                    //console.log("Result: " + (await app.removeUser('Pruu')));
                    //console.log("Result: " + (await app.findUser('Pruu')).name);
                    _d.apply(_c, [_j.sent()]);
                    _f = (_e = console).log;
                    return [4 /*yield*/, app.findBike('1')];
                case 3:
                    _f.apply(_e, [_j.sent()]);
                    bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, ['teste', 'teste2']);
                    _h = (_g = console).log;
                    return [4 /*yield*/, app.registerBike(bike)];
                case 4:
                    _h.apply(_g, [_j.sent()]);
                    newYork = new location_1.Location(40.753056, -73.983056);
                    return [4 /*yield*/, app.moveBikeTo('4', newYork)
                        //console.log("Result: " + await app.findUser('findUser'));
                    ];
                case 5:
                    _j.sent();
                    //console.log("Result: " + await app.findUser('findUser'));
                    return [2 /*return*/];
            }
        });
    });
}
main();
