import { MessageModel } from '../models/message_mysql.js';
import { validatePost, validatePartial, validateFind } from '../request/message.js';
import { MessageResource } from '../resoucers/MessageResource.js';

//TODO. Implemetar el manejo del error cuando no se conecta a la base de datos.

export class MessageController {

    static async getAll(req, res) {
        let result
        result = await MessageResource.get(await MessageModel.getAll())
        return result ? res.json(result) : res.status(500).json({ error: "Error en el servidor" });
    }

    static async getAllByUser(req, res) {
        let userId = req.body.userId
        if (userId !== undefined) {
            const messagesUser = await MessageModel.find({ key: 'author', value: userId })
            if (messagesUser) {
                const result = await MessageResource.get(messagesUser)
                return res.json(result)
            } else {
                return res.status(500).json({ error: "Error del servidor" })
            }
        } else {
            return res.status(401).json({ error: "Error al identificar al usuario." })
        }
    }

    static async getById(req, res) {
        const message = await MessageModel.getById({ id: parseInt(req.params.id) })
        if (message) {
            const result = await MessageResource.get(message)
            return res.json(result)
        } else {
            return res.status(500).json({ error: "Error del servidor" });
        }
    }

    static async create(req, res) {
        const result = validatePost(req.body)
        if (result.error) {
            return res.status(400).json({ error: "Los datos del cuerpo no son correctos." })
        }
        if (req.body.userId === undefined) {
            return res.status(401).json({ error: "Error al identificar al usuario." })
        }
        result.data.author = req.body.userId
        const messageId = await MessageModel.create({ input: result.data })
        if (messageId) {
            const message = await MessageModel.getById({ id: messageId })
            const messageResource = message?await MessageResource.get(message):res.status(500).json({ error: "Error del servidor"  })
            return messageResource?res.status(201).json(messageResource[0]):res.status(500).json({ error: "Error del servidor"  })
        } else {
            return res.status(500).json({ error: "Error del servidor"  })
        }
    }

    static async update(req, res) {
        const result = validatePartial(req.body)
        let message = await MessageModel.getById({ id: parseInt(req.params.id) });
        if(!message){return res.status(500).json({ error: "Error del servidor"  })}

        if (!result.success || message.length === 0) return res.status(400).json({ error: "Hay algun error en los datos pasados" })

        const userID = req.body.userId
        if (message[0].author !== userID) {return res.status(401).json({ error: "No tienes permisos para actualizar este mensaje." })}
        
        const sendMessege = await MessageModel.update({ id: parseInt(req.params.id), input: result.data }) ? "Registro actualizado" : "Error al actualizar el registro"
        return res.json({ message: sendMessege })
    }

    static async delete(req, res) {
        let message = await MessageModel.getById({ id: parseInt(req.params.id) })
        if(!message){return res.status(500).json({ error: "Error del servidor"  })}
        if (message[0].author !== req.body.userId) {
            return res.status(401).json({ error: "No tienes permisos para eliminar este mensaje." })
        }
        const result = await MessageModel.delete({ id: parseInt(req.params.id) }) ? "Eliminado correctamente" : "Error al eliminarlo"
        return result ? res.json({ message: result }) : res.status(500).json({ error: "Error del servidor"  })
    }


}