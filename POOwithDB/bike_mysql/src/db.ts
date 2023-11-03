export class DB {
    private mysql = require('mysql');
    private connection_status = 0;
    public connection = this.mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'bike_poo'
    });
    
    constructor() {
        this.open();
    }

    async close(): Promise<void> {
        this.connection.end();
        this.connection_status = 0;
    }

    async open(): Promise<void> {
        this.connection.connect();
        this.connection_status = 1;
    }

    async query_test(): Promise<void> {
        if(this.connection_status == 0){
            this.open();
        }

        this.connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
          });
    }

    async query3(query: string): Promise<void> {
        if(this.connection_status == 0){
            this.open();
        }

        this.connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
          });
    }
}