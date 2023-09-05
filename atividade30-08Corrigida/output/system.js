"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const rent_1 = require("./rent");
const moment_1 = __importDefault(require("moment"));
class System {
    view() {
        console.log("\nTodas as bicicletas alugadas");
        for (const rent of rent_1.Rent.allRents) {
            console.log("Cliente: " + rent.client.name);
            console.log("Marca da bicileta alugada: " + rent.bicycle.brand);
            let formatedStartDate = ((0, moment_1.default)(rent.startDate).format('DD/MMM/YYYY'));
            let formatedEndDate = ((0, moment_1.default)(rent.endDate).format('DD/MMM/YYYY'));
            console.log("Intervalo do aluguel: " + formatedStartDate + " até " + formatedEndDate);
            let startDateInt = rent.startDate.getTime();
            let endDateInt = rent.endDate.getTime();
            console.log("Valor total do aluguel: " + ((endDateInt - startDateInt) * rent.bicycle.valueDay) / 86400000); //Dividi por 86400000 para transformar milissegundos em dias
            console.log("====================================\n");
        }
    }
    bikeAvailability(data10, data11) {
        //Mudando formato da data
        let formatedStartDate = ((0, moment_1.default)(data10).format('DD/MMM/YYYY'));
        let formatedEndDate = ((0, moment_1.default)(data11).format('DD/MMM/YYYY'));
        console.log("Bicicletas disponíveis para " + formatedStartDate + " até " + formatedEndDate + ":");
        for (const rent of rent_1.Rent.allRents) {
            if (rent.startDate.getTime() <= data10.getTime() && data10.getTime() <= rent.endDate.getTime()) {
                continue;
            }
            else if (rent.startDate.getTime() <= data11.getTime() && data11.getTime() <= rent.endDate.getTime()) {
                continue;
            }
            else {
                console.log(" - " + rent.bicycle.brand);
            }
        }
    }
}
exports.System = System;
