export class Modelo{
    constructor(
        public marca: string,
        public nome: string,
        public numPOrtas: number,
        public potencial: number,
        public combustivel: 'Alcool' | 'Gasolina' | 'Flex'
    ){}
}