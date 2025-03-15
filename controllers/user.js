import { UsersModel } from "../models/users_mysql.js"
import { validate } from "../request/user.js"
import cry from 'node:crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from "../env.js"

export class UserController {

    static async login(req, res) {
        //TODO. crear una funcion para convertir las cadenas en base64 en string
        const nameUser = atob(req.headers.authorization.slice(6,)).split(":")[0]
        const passwordUser = atob(req.headers.authorization.slice(6,)).split(":")[1]

        const user = validate({ name: nameUser, password: passwordUser })

        if (!user.success) { return res.status(400).json({ message: "error al validar los datos" }) }

        const result = await UsersModel.exits({ key: 'name', value: user.data.name })

        if(result === false){return res.status(500).json({ message: "error del servidor" })}

        if (result === undefined || !await bcrypt.compare(user.data.password, result.password)) {
            return res.status(401).json({ message: "invalid authentication" })
        }

        const token = jwt.sign({ id: result.id, name: result.name }, ENV.KEY_JWT, { expiresIn: '1h' })
        
        return res.cookie('token', token, {
            domain: ENV.getUrlServer(),
            httpOnly: true,
            secure: false,
        }).json({ message: "Login correcto" })
    }


    static async register(req, res) {
        const userValidate = validate(req.body)

        if (!userValidate.success) {return res.status(400).json({ error: "Error, datos invalidos" })}

        const exits = await UsersModel.exits({ key: 'name', value: userValidate.data.name })

        if(exits === undefined) {return res.status(500).json({ error: "Error del servidor" })}

        if (exits) {return res.status(400).json({ error: "El usuario ya existe" })}
        
        userValidate.data.id = cry.randomUUID()
        userValidate.data.password = await bcrypt.hash(userValidate.data.password, 10)
        const result = await UsersModel.create({ input: userValidate.data })
        return result > 0 ? res.status(201).json({ message: "Creado correctamente", id: userValidate.data.id }) : res.status(500).json({ message: "Error al crear" })
    }


    static async logout(req, res) {
        return res.clearCookie('token', { path: '/', domain: 'localhost' }).json({ message: "Logout" });
    }

    static async isAuth(req, res) {
        return res.json({ result: req.body.userId !== undefined })
    }

}
