export const ENV = {
    KEY_JWT: "ath_MSD18945*^çgkoadASDEddfhhttrwcc126428o.",
    develop:false,
    getUrlServer(){ return this.develop?'localhost':'192.168.1.99'},
    port: 3000,
    configDB: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'messagesdb'
    }
}