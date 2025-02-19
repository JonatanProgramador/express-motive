import { UsersModel } from "../models/users_mysql.js";


export class MessageResource {

    static async get(messages) {
        let user
        
        for(let i=0; i<messages.length; ++i){
        user = await UsersModel.getbyId({id:messages[i].author, columns:["name"]})
        messages[i].author = user.name
    }
        return messages;
    }
}