import mysql from 'mysql2/promise';
import { ENV } from '../env.js';

export class Mysql {
    static async connectio(table) {
        this.conn = await mysql.createConnection(ENV.configDB);
        this.table = table
    }

    static async close() {
        await this.conn.end();
    }

    static async createTable(table, colums) {
        try {
        const result = await this.conn.query(`CREATE TABLE ${table} (${colums.join(", ")});`)
        return true;
        } catch(error) {
            console.log(error)
            return false
        }
    }

    static async dropTable(table) {
        try{
        const result = await this.conn.query(`DROP TABLE ${table};`)
        return true
        } catch(error) {
            return false
        }
    }

    static async getAll(columns) {
        let result;
        if(!columns){
        result = await this.conn.query(`SELECT * FROM ${this.table}`)
    } else {
        result = await this.conn.query(`SELECT ${columns.join(", ")} FROM ${this.table}`)
    }
        return result[0]
    }

    static async getById({ id, columns }) {
        let result;
        if (!Number.isInteger(id) && !id) return { error: "error" }
        if(columns){
        result = await this.conn.query(`SELECT ${columns.join(", ")} FROM ${this.table} WHERE id=?`, [id])
        } else {
            result = await this.conn.query(`SELECT * FROM ${this.table} WHERE id=?`, [id])
        }
        return result[0]
    }

    static async find({ key, value }) {
        const result = await this.conn.query(`SELECT * FROM ${this.table} WHERE ${key}=?`, [value])
        return result[0]
    }

    static async existsRow(id) {
        const row = await Mysql.getById(id)
        return row.length > 0
    }

    static async createRow({ input }) {
        const keys = Object.keys(input)
        const values = Object.values(input)

        let signs = "";
        for (let i = 0; i < keys.length; ++i) {
            signs += "?,";
        }

        signs = signs.slice(0, -1)

        let query = `INSERT INTO ${this.table} (${keys.join(", ")} ) VALUES ( ${signs} );`
        try {
            const result = await this.conn.query(query,
                [...values]
            )
            return result[0]
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    static async deleteRow({ id }) {
        if (!Number.isInteger(id) && !id) return { error: "error" }
        const result = await this.conn.query(`DELETE FROM ${this.table} WHERE id=?`, [id])
        return result[0].affectedRows
    }

    static async updateRow({ input, id }) {
        let keys = Object.keys(input).join('=?, ') + "=?"
        const result = await this.conn.query(`UPDATE ${this.table} SET ${keys} WHERE id=?`, [...Object.values(input), id])
        return result[0].affectedRows
    }
}