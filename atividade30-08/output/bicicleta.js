"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bicicleta = void 0;
class Bicicleta {
    constructor(idBicicleta, aro, marca, valorDia) {
        this._idBicicleta = idBicicleta;
        this.aro = aro;
        this.marca = marca;
        this.valorDia = valorDia;
    }
    get id() {
        return this._idBicicleta;
    }
}
exports.Bicicleta = Bicicleta;
