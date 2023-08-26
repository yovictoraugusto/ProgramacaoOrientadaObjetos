import {Bicycle} from "./bicycle"
import {Client} from "./client"
import {Rent} from "./rent"
import moment from 'moment'

export class System{
    view(){
        
        console.log("\nTodas as bicicletas alugadas")
        for (const rent of Rent.allRents) {
            console.log("Cliente: " + rent.client.name)
            console.log("Marca da bicileta alugada: " + rent.bicycle.brand)
        
            let formatedStartDate = (moment(rent.startDate).format('DD/MMM/YYYY'))
            let formatedEndDate = (moment(rent.endDate).format('DD/MMM/YYYY'))
            console.log("Intervalo do aluguel: " + formatedStartDate + " até " + formatedEndDate)
        
            let startDateInt = rent.startDate.getTime()
            let endDateInt = rent.endDate.getTime()
            console.log("Valor total do aluguel: " + ((endDateInt-startDateInt)*rent.bicycle.valueDay)/86400000) //Dividi por 86400000 para transformar milissegundos em dias
            console.log("====================================\n")
        }        
    }

    bikeAvailability(data10: Date, data11: Date){
        //Mudando formato da data
        let formatedStartDate = (moment(data10).format('DD/MMM/YYYY'))
        let formatedEndDate = (moment(data11).format('DD/MMM/YYYY'))
        console.log("Bicicletas disponíveis para " + formatedStartDate + " até " + formatedEndDate + ":")

        for(const rent of Rent.allRents){
            if(rent.startDate.getTime()<=data10.getTime() && data10.getTime()<=rent.endDate.getTime()){
                continue
            }else if(rent.startDate.getTime()<=data11.getTime() && data11.getTime()<=rent.endDate.getTime()){
                continue
            }else{
                console.log(" - "+ rent.bicycle.brand)
            }
        }
    }
}