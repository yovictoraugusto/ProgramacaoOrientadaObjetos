"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluguel = void 0;
class Aluguel {
    constructor(cliente, bicicleta, dataInicio, dataFim) {
        this.cliente = cliente;
        this.bicicleta = bicicleta;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
    verificaAluguel(bicicleta, dataInicio, dataFim) {
    }
    cadastraAluguel(cliente, bicicleta, dataInicio, dataFim) {
        this.cliente = cliente;
        this.bicicleta = bicicleta;
        this.dataInicio = dataInicio;
        this.dataInicio = dataFim;
    }
    verAluguel(cliente, bicicleta, dataInicio, dataFim) {
        console.log('Nome Cliente: ', this.cliente.nome);
        console.log('Marca Bicicleta', this.bicicleta.marca);
        console.log(dataInicio);
        console.log(dataFim);
    }
}
exports.Aluguel = Aluguel;
