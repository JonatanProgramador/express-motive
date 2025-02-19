

export const typeColumn = {
    string:"varchar(255)",
    int:"INT"
}


export class ColumnSQL {
    

    constructor(name, type) {
        this.column = {
            name:name,
            type:type
        }
    }

    isUnique() {
        this.column.unique = true
    }

    isNotNull() {
        this.column.notNull = true
    }

    isPrimaryKey() {
        this.column.primaryKey = true
    }

    isAutoIncrement() {
        this.column.autoIncrement = true
    }

    isDefault(value) {
        this.column.default = value
    }

    isCheck(value) {
        this.column.check = value
    }

    foreignKey(values) {
        this.column.foreignKey = values
    }

    columnToString() {
        let result = `${this.column.name} ${this.column.type}`
        result += this.column.unique?' UNIQUE':''
        result += this.column.notNull?' NOT NULL':''
        result += this.column.autoIncrement?' AUTO_INCREMENT':''
        result += this.column.check?` CHECK (${this.column.name} IN (${this.column.check.join(", ")}))`:''
        result += this.column.default?` DEFAULT '${this.column.default}'`:''
        result += this.column.primaryKey?`, PRIMARY KEY(${this.column.name})`:''
        result += this.column.foreignKey?`, FOREIGN KEY (${this.column.name}) REFERENCES ${this.column.foreignKey.table}(${this.column.foreignKey.column})`:''
        return result
    }
}