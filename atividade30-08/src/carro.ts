import { Modelo } from "./modelo";

export class Carro{
    constructor(
        public placa: string,
        public modelo: Modelo,
        public cor: string
    ){}
}

const ka = new Modelo('Ford', 'Ka', 5, 200000, 'Gasolina')
const carroJoao = new Carro ('abc-1234', ka, 'branca')