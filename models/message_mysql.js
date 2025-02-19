import { Mysql } from '../libs/Mysql.js';

export class MessageModel {

    static async getAll() {
        await Mysql.connectio('messages')
        const result = await Mysql.getAll()
        await Mysql.close()
        return result
    }

    static async find(input){
        await Mysql.connectio('messages')
        const result = await Mysql.find(input)
        await Mysql.close()
        return result
    }

    static async getById(id) {
        await Mysql.connectio('messages')
        const result = await Mysql.getById(id)
        await Mysql.close()
        return result
    }

    static async create(input) {
        await Mysql.connectio('messages')
        const id = await Mysql.createRow(input) 
        await Mysql.close()
        return id.insertId
    }

    static async delete(id) {
        await Mysql.connectio('messages')
        const result = await Mysql.deleteRow(id)
        await Mysql.close()
        return result > 0
    }

    static async update(input) {
        await Mysql.connectio('messages')
        const result = await Mysql.updateRow(input)
        await Mysql.close()
        return result > 0
    }
}

