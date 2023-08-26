import {Bicycle} from "./bicycle"
import {Client} from "./client"
import moment from 'moment'

export class Rent{
    client: Client
    bicycle: Bicycle
    startDate: Date
    endDate: Date
    static allRents: Rent[] = [] //Matriz que armazena todos os objetos criados pela classe

    constructor(client:Client, bicycle: Bicycle, startDate: Date, endDate: Date){
        this.client = client
        this.bicycle = bicycle
        this.startDate = startDate
        this.endDate = endDate
        Rent.allRents.push(this);
    }

}