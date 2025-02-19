import { MessageModel } from "../../models/message_mysql.js";
import { UsersModel } from "../../models/users_mysql.js"



export class SeedMessages {

    constructor() {
        this.data = [
            {
                message: "El único límite para lograr tus sueños es la voluntad de seguir adelante. ¡No te detengas!",
              },
              {
                message: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, alcanzarás grandes logros.",
              },
              {
                message: "Cada paso que das hacia tus metas es una victoria. No subestimes el poder de seguir adelante.",
              }
        ]
    }
    async seed() {
        let created = 0
        let usersId = await UsersModel.getAll(["id"]);
        for(let i=0; i<this.data.length; ++i) {
          this.data[i].author = usersId[Math.floor(Math.random() * 4)].id;
        }
        for(let i=0; i<this.data.length; ++i) {
           let result = await MessageModel.create({input:this.data[i]})
           created = result > 0?created+1:created
        }
        console.log(`Se ha creado ${created} filas en la tabla messeges`)
    }
}