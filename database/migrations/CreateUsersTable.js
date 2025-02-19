import  {Mysql}  from "../../libs/Mysql.js"
import { ColumnSQL, typeColumn } from "../../libs/ColumnSQL.js"

export  class CreateUsersTable {

    constructor() {
        this.table='users'
    }
    
    async create() {
        let columns = []
        columns.push(new ColumnSQL('id', typeColumn.string))
        columns[0].isNotNull()
        columns[0].isPrimaryKey()
        columns[0] = columns[0].columnToString()
    
        columns.push(new ColumnSQL('name', typeColumn.string))
        columns[1].isNotNull()
        columns[1].isUnique()
        columns[1] = columns[1].columnToString()
    
        columns.push (new ColumnSQL('password', typeColumn.string))
        columns[2].isNotNull()
        columns[2] = columns[2].columnToString()

        columns.push (new ColumnSQL('rol', typeColumn.string))
        //que la clase column se encarge de agregar las comillas simpres
        columns[3].isCheck(["'admin'", "'user'"])
        columns[3].isDefault("user")
        columns[3] = columns[3].columnToString()
    
        await Mysql.connectio()
        let result = await Mysql.createTable(this.table, columns)
        await Mysql.close()
        console.log(this.table, result?"OK":"ERROR")
    }

     async drop() {
        await Mysql.connectio()
        let result = await Mysql.dropTable(this.table)
        await Mysql.close()
        console.log(this.table, result?"OK":"ERROR")
    }
}