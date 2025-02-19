import { CreateMessagesTable } from "./migrations/CreateMessagesTable.js";
import { CreateUsersTable } from "./migrations/CreateUsersTable.js";

 async function  start () {
    let messages = new CreateMessagesTable();
    let users = new CreateUsersTable();
    console.log('Eliminando las tablas...')
    await messages.drop()
    await users.drop()
    console.log('Creando las tablas...')
    await users.create()
    await messages.create()
 }

 start();
