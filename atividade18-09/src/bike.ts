export class Bike{
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public latitude: number,
        public longitude: number,
        public description?: string,
        public ratings?: number,
        public imageUrls?: string[],
        public available: boolean = true,
        public id?: string // ? é algo opcional
    ){}
}