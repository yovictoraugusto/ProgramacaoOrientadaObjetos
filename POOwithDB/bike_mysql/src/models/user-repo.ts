import { UserRepo } from "../ports/user-repo";
import { User } from "../user";
import { DB } from "../db";

export class DBUserRepo implements UserRepo {

    async find(db: DB, email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
          let user: User;
          db.connection.query('SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1', [email], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              if (results.length > 0) {
                const value = results[0];
                user = new User(value['name'], value['email'], value['password'], value['id']);
              }
              resolve(user);
            }
          });
        });
      }

    async add(db: DB, user: User): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          db.connection.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [user.name, user.email, user.password], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results.insertId.toString());
            }
          });
        });
      }

    async remove(db: DB, email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`DELETE FROM users where email = ?`, [email], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve(results.affectedRows .toString());
              }
            });
          });
    }

    async list(db: DB): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
          const users: User[] = [];
      
          db.connection.query(
            'select id,name,email,password from users order by id asc', 
            (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              results.forEach((value) => {
                const user = new User(value['name'], value['email'], 
                value['password'], value['id']);
                users.push(user);
              });
              resolve(users);
            }
          });
        });
      }

    async update(db: DB, email: string, user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.connection.query(`UPDATE users SET name = ?, email = ?, password = ? WHERE email = ?`, [user.name, user.email, user.password, email], (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve(results.affectedRows .toString());
              }
            });
          });
    }
}