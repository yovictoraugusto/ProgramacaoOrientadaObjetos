import { RentRepo } from "../../src/ports/rent-repo";
import { Rent } from "../../src/rent";
import crypto from 'crypto'
import {DB} from "../db";

export class DBRentRepo implements RentRepo {
    rents: Rent[] = []

    async add(db: DB, rent: Rent): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            db.connection.query(`INSERT INTO rents (bike_id, user_id, start) VALUES (?,?,?)`, [rent.bike,rent.user, rent.start], (error, results, fields) => {
                if(error){
                    reject(error);
                }else{
                    resolve(results.insertId.toString());
                }
            });
        });
        // const newId = crypto.randomUUID()
        // rent.id = newId
        // this.rents.push(rent)
        // return newId
    }

    async findOpen(db: DB, bikeId: string, userEmail: string): Promise<Rent> {
        return new Promise<Rent>((resolve, reject) => {
            let rent: Rent;
            db.connection.query(
                'SELECT id, bike_id, user_id, start, end FROM rents WHERE end IS NULL LIMIT 1', 
                [bikeId, userEmail], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const value = results[0];
                        rent = new Rent(value['id'], value['bike_id'], value['user_id'], 
                        value['start'], value['end']);
                    }
                    resolve(rent);
                }
            });
        });
        // return this.rents.find(rent =>
        //     rent.bike.id === bikeId &&
        //     rent.user.email === userEmail &&
        //     !rent.end
        // )
    }

    async findOpenFor(db: DB,userEmail: string): Promise<Rent[]> {
        return new Promise<Rent[]>((resolve, reject) => {
            const rents: Rent[] = [];
        
            db.connection.query(
              'Select distinct rents.id,bike_id,user_id,start,end from rents join users ON rents.user_id = users.id where end is null and users.email = ? order by rents.id', 
              (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                results.forEach((value) => {
                  const rent = new Rent(value['id'], value['bike_id'], value['user_id'], 
                  value['start'], value['end']);
                  rents.push(rent);
                });
                resolve(rents);
              }
            });
          });
        // return this.rents.filter(rent =>
        //     rent.user.email === userEmail &&
        //     !rent.end)
    }

    async update(db: DB,id: string, rent: Rent): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`UPDATE rents SET bike_id = ?, user_id = ?, start = ?, end = ? WHERE id = ?`, [rent.bike, rent.user, rent.start, rent.end, id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows .toString());
                }
            });
        });
    }

    async updateEnd(db: DB,id: string, rent: Rent): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`UPDATE rents SET end = ? WHERE id = ?`, [rent.end, id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows .toString());
                }
            });
        });
    }
    
    async list(db: DB): Promise<Rent[]>{
        return new Promise<Rent[]>((resolve, reject) => {
            const rents: Rent[] = [];

            db.connection.query(
                'select id,bike_id,user_id,start,end from rents order by id asc', 
                (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    results.forEach((value) => {
                        const rent = new Rent(value['id'], value['bike_id'], value['user_id'], 
                        value['start'], value['end']);
                        rents.push(rent);
                    });
                    resolve(rents);
                }
            });
        });
    }

    async remove(db: DB, id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`DELETE FROM rents where id = ?`, [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows .toString());
                }
            });
        });
    }
}