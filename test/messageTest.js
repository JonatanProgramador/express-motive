import { UserTest } from "./userTest.js"

export class MessageTest {

    static async run() {
        console.log("Iniciado el test de los endpoint de messeges...")
        const { id } = await this.create()
        await this.getAll()
        await this.getById(id)
        const token = await UserTest.login()
        await this.update(id, token)
        await this.deleted(id, token)
    }

    static async getAll() {
        const result = await fetch('http://localhost:3000/messages')
        const data = await result.json()
        console.log('Get all:', data.length > 0 ? 'OK' : 'FAILED')
    }

    static async getById(id) {
        const result = await fetch(`http://localhost:3000/messages/${id}`)
        const data = await result.json()
        console.log('Get by id:', data.length > 0 ? 'OK' : 'FAILED')
    }

    static async create() {
        const result = await fetch('http://localhost:3000/messages/', {
            method: 'post',
            body: JSON.stringify({ message: "Hola mundo", author: "Battusay" }),
            headers: { "Content-Type": "application/json" }
        })
        console.log('Create:', result.status === 201 ? 'OK' : 'FAILED')
        return await result.json()
    }

    static async update(id, token) {
        const result = await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'put',
            body: JSON.stringify({ author: "Battusay" }),
            headers: { "Content-Type": "application/json", 'Cookie': `token=${token}`}
        })
        console.log('update:', result.status === 200 ? 'OK' : 'FAILED')
        return await result.json()
    }

    static async deleted(id, token) {
        const result = await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'delete',
            headers: {'Cookie': `token=${token}`}
        })
        console.log('delete:', result.status === 200 ? 'OK' : 'FAILED')
        return await result.json()
    }
}