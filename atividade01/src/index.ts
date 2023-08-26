import { System } from "./system";
import {Rent} from "./rent"
import { Bicycle } from "./bicycle";
import { Client } from "./client";

//Cadastro de algumas bicicletas
let bike1 = new Bicycle (29, 'Caloi', 25.5)
let bike2 = new Bicycle (30, 'Sense', 15.5)
let bike3 = new Bicycle (45, 'Oggi', 35.5)
let bike4 = new Bicycle (15, 'Soul Cycles', 5.5)

//Cadastro de alguns clientes
let client1 = new Client ('Joao', '111222333-44', 'Centro')
let client2 = new Client ('Maria', '111222333-44', 'JK')
let client3 = new Client ('Yuri', '111222333-44', 'Santa Ines')
let client4 = new Client ('Ketlyn', '111222333-44', 'Eugenio')

//Cadastro de algumas datas para criar alugueis
let data1 = new Date(2023,7,20)
let data2 = new Date(2023, 7, 23)

let data4 = new Date(2023,5,20)
let data5 = new Date(2023, 6, 23)

let data6 = new Date(2023,7,27)
let data7 = new Date(2023, 7, 29)

let data8 = new Date(2023,7,29)
let data9 = new Date(2023, 7, 30)

//Cadastro de alugueis
let rent1  = new Rent (client1, bike1, data1, data2)
let rent2  = new Rent (client2, bike2, data4, data5)
let rent3  = new Rent (client3, bike3, data6, data7)
let rent4  = new Rent (client4, bike4, data8, data9)

const system = new System()
system.view()

//Uma nova entrada para verificar se vai alugar a bike
let data10 = new Date(2023, 7, 25)
let data11 = new Date(2023, 7, 27)

system.bikeAvailability(data10, data11)