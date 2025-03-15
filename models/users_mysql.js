import { Mysql } from '../libs/Mysql.js';

export class UsersModel {


    static async create(input) {
        const isConn = await Mysql.connectio('users')
        if (isConn) {
            const id = await Mysql.createRow(input);
            await Mysql.close()
            return id.affectedRows
        } else {
            return false
        }
    }

    static async exits(input) {
        const isConn = await Mysql.connectio('users')
        if (isConn) {
            const result = await Mysql.find(input)
            await Mysql.close()
            return result.length > 0 ? result[0] : false
        } else {
            return undefined
        }
    }

    static async getAll(columns) {
        const isConn = await Mysql.connectio('users')
        if (isConn) {
            const result = columns ? await Mysql.getAll(columns) : await Mysql.getAll()
            await Mysql.close()
            return result
        } else {
            return false
        }
    }

    static async getbyId(input) {
        const isConn = await Mysql.connectio('users')
        if (isConn) {
            const result = await Mysql.getById(input)
            await Mysql.close()
            return result[0]
        } else {
            return false;
        }
    }
}
