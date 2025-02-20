import { UsersModel } from "../models/users_mysql.js"


export function permissionMiddle(app) {
    async function permission(req, res, next) {
        const user = await UsersModel.exits({key:"id", value:req.body.userId})
        if(user.rol === "admin") {
            next()
        } else {
        res.status(401).json({message:"error"})
        }
    }
}