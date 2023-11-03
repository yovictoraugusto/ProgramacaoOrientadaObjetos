import { Bike } from "../../src/bike";
import { BikeRepo } from "../../src/ports/bike-repo";
import { Location } from "../location";
import { DB } from "../db";

export class DBBikeRepo implements BikeRepo {
    bikes: Bike[] = []

    async find(db: DB, id: string): Promise<Bike> {
        return new Promise<Bike>((resolve, reject) => {
            let bike: Bike;
            db.connection.query('select `id`, `name`, `type`, `bodySize`, `maxLoad`, `rate`, `description`, `ratings`, `available`, `latitude`, `longitude` from bikes WHERE id = ? LIMIT 1', [id], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                if (results.length > 0) {
                  const value = results[0];
                  bike = new Bike(value['name'], value['type'], value['bodySize'], value['maxLoad'], value['rate'], value['description'], value['ratings'],[], value['available'], new Location(value['latitude'], value['longitude']),value['id']);

                  db.connection.query('select imageUrl from bike_imageurls WHERE bike_id = ? LIMIT 1', [id], (error, results, fields) => {
                    if (error) {
                      reject(error);
                    } else {
                      results.forEach((value) => {
                        const imageUrl = value['imageUrl'];

                        bike.imageUrls.push(imageUrl);
                      });
                    }
                });
                }
                resolve(bike);
                
              }
            });
          });
    }

    async add(db: DB, bike: Bike): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            db.connection.query(`INSERT INTO bikes (name, type, bodySize, maxLoad, rate, description, ratings, available, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.available, bike.location.latitude, bike.location.longitude], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                var id = results.insertId;

                if(bike.imageUrls.length > 1){
                    var temp_query = 'insert into bike_imageurls (bike_id,imageUrl) values'
                    var aux = 0;
                    bike.imageUrls.forEach((value) => {
                        if(aux != 0){
                            temp_query = temp_query + ',';
                        }
                        temp_query = temp_query + '("'+id+'","'+value+'")';
                        aux = aux + 1;
                    });

                    temp_query = temp_query + ';';

                    db.connection.query(temp_query, (error, results, fields) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve(id.toString());
                        }
                      });

                }
                resolve(id.toString());
              }
            });
          });
    }

    async remove(db: DB, id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`DELETE FROM bike_imageurls where bike_id = ?`, [id], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                db.connection.query(`DELETE FROM bikes where id = ?`, [id], (error, results, fields) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(results.affectedRows .toString());
                    }
                  });
              }
            });
          });
    }

    async update(db: DB, id: string, bike: Bike): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`UPDATE bikes SET name = ?, type = ?, bodySize = ?, maxLoad = ?, rate = ?, description = ?, ratings = ?, available = ?, latitude = ?, longitude = ? WHERE id = ?`, [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.available, bike.location.latitude, bike.location.longitude, bike.id], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                var nid = results.insertId;

                db.connection.query(`DELETE FROM bike_imageurls where bike_id = ?`, [id], (error, results, fields) => {
                    if (error) {
                      reject(error);
                    } else {
                        if(bike.imageUrls.length > 1){
                            var temp_query = 'insert into bike_imageurls (bike_id,imageUrl) values'
                            var aux = 0;
                            bike.imageUrls.forEach((value) => {
                                if(aux != 0){
                                    temp_query = temp_query + ',';
                                }
                                temp_query = temp_query + '("'+id+'","'+value+'")';
                                aux = aux + 1;
                            });
        
                            temp_query = temp_query + ';';
        
                            db.connection.query(temp_query, (error, results, fields) => {
                                if (error) {
                                  reject(error);
                                } else {
                                  resolve(nid.toString());
                                }
                              });
        
                        }
                    }
                  });
              }
            });
          });
    }

    async list(db: DB): Promise<Bike[]> {
        return new Promise<Bike[]>((resolve, reject) => {
          const bikes: Bike[] = [];
      
          db.connection.query('select `id`, `name`, `type`, `bodySize`, `maxLoad`, `rate`, `description`, `ratings`, `available`, `latitude`, `longitude` from bikes ORDER BY id ASC', (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              results.forEach((value) => {
                const user = new Bike(value['name'], value['type'], value['bodySize'], value['maxLoad'], value['rate'], value['description'], value['ratings'],[], value['available'], new Location(value['latitude'], value['longitude']),value['id']);
                bikes.push(user);
              });
      
              db.connection.query('select bike_id,imageUrl from bike_imageurls', (error, results, fields) => {
                if (error) {
                  reject(error);
                } else {
                  results.forEach((value) => {
                    const bike_id = value['bike_id'];
                    const imageUrl = value['imageUrl'];
      
                    const userIndex = bikes.findIndex((bike) => bike.id === bike_id);
                    if (userIndex >= 0) {
                        bikes[userIndex].imageUrls.push(imageUrl);
                    }
                  });
      
                  resolve(bikes);
                }
              });
            }
          });
        });
      }
}