import { Mysql } from '../libs/Mysql.js';

export class UsersModel {


    static async create(input) {
        try {
        await Mysql.connectio('users')
        const id = await Mysql.createRow(input);
        await Mysql.close()
        return id.affectedRows
        } catch(error) {
            return -1
        }
        
    }

    static async exits(input) {
        await Mysql.connectio('users')
        const result = await Mysql.find(input)
        await Mysql.close()
        return result.length>0?result[0]:false
    }

    static async getAll(columns) {
        await Mysql.connectio('users')
        const result = columns?await Mysql.getAll(columns):await Mysql.getAll()
        await Mysql.close()
        return result
    }

    static async getbyId(input) {
        await Mysql.connectio('users')
        const result = await Mysql.getById(input)
        await Mysql.close()
        return result[0]
    }
}
