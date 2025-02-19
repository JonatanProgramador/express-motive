import  {Mysql}  from "../../libs/Mysql.js"
import { ColumnSQL, typeColumn } from "../../libs/ColumnSQL.js"


export  class CreateMessagesTable {

    constructor() {
        this.table='messages'
    }
    
    async create() {
        let columns = []
        columns.push(new ColumnSQL('id', typeColumn.int))
        columns[0].isNotNull()
        columns[0].isPrimaryKey()
        columns[0].isAutoIncrement()
        columns[0] = columns[0].columnToString();
    
        columns.push(new ColumnSQL('message', typeColumn.string))
        columns[1].isNotNull()
        columns[1] = columns[1].columnToString();
    
        columns.push (new ColumnSQL('author', typeColumn.string))
        columns[2].isNotNull();
        columns[2].foreignKey({table:'users', column:'id'});
        columns[2] = columns[2].columnToString();
    
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