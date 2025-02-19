import { UsersModel } from "../../models/users_mysql.js"
import cry from 'node:crypto'
import bcrypt from 'bcrypt'




export class SeedUsers {

    constructor() {
        this.data = [
          {id:cry.randomUUID(), name: 'Battusay', password: 'cosa', rol:'admin' },
          {id:cry.randomUUID(), name: 'Juan', password: '1234' },
          {id:cry.randomUUID(), name: 'Ana', password: 'abcd' },
          {id:cry.randomUUID(),name: 'Pedro', password: 'qwerty' }
        ]
    }
    async seed() {
        let created = 0
        for(let i=0; i<this.data.length; ++i) {
          this.data[i].password = await bcrypt.hash(this.data[i].password, 10)
           let result = await UsersModel.create({input:this.data[i]})
           created = result > 0?created+1:created
        }
        console.log(`Se ha creado ${created} filas en la tabla users`)
    }
}