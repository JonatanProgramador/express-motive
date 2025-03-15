import { Mysql } from '../libs/Mysql.js';



export class MessageModel {

    static async getAll() {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            const result = await Mysql.getAll()
            await Mysql.close()
            return result
        } else {
            return false;
        }
    }

    static async find(input) {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            const result = await Mysql.find(input)
            await Mysql.close()
            return result
        } else {
            return false;
        }
    }

    static async getById(id) {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            await Mysql.connectio('messages')
            const result = await Mysql.getById(id)
            await Mysql.close()
            return result
        } else {
            return false;
        }
    }

    static async create(input) {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            const id = await Mysql.createRow(input)
            await Mysql.close()
            return id.insertId
        } else {
            return false;
        }
    }

    static async delete(id) {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            const result = await Mysql.deleteRow(id)
            await Mysql.close()
            return result > 0
        } else {
            return false;
        }
    }

    static async update(input) {
        const isConn = await Mysql.connectio('messages')
        if (isConn) {
            const result = await Mysql.updateRow(input)
            await Mysql.close()
            return result > 0
        } else {
            return false;
        }
    }
}

