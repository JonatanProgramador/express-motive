import { MessageModel } from '../models/message_mysql.js';
import { validatePost, validatePartial, validateFind } from '../request/message.js';
import { MessageResource } from '../resoucers/MessageResource.js';

export class MessageController {
    
    static async getAll(req, res) {
        let result
        result = await MessageResource.get(await MessageModel.getAll())
         res.json(result)
    }

    static async getAllByUser(req, res) {
        let result
        let userId = req.body.userId
        result = await MessageResource.get(await MessageModel.find({key:'author', value:userId}))
         res.json(result)
    }

    static async getById(req, res) {
        const result = await MessageResource.get(await MessageModel.getById({ id: parseInt(req.params.id) }))
        res.json(result)
    }

    static async create(req, res) {
        const result = validatePost(req.body)
        if (result.error) {
            return res.status(400).json({ error: result.error })
        }
        result.data.author = req.body.userId
        const messageId = await MessageModel.create({ input: result.data })
        if(messageId) {
            const message = await MessageResource.get(await MessageModel.getById({id:messageId}))
            return res.status(201).json(message[0])
        } else {
            return res.status(500).json({message:"Error al crear"})
        }
    }

    static async update(req, res) {
        const result = validatePartial(req.body)
        let message = await MessageModel.getById({id:parseInt(req.params.id)});
        if (!result.success || message.length === 0) return res.status(400).json({ error: "invalidate data" })
        const userID = req.body.userId
        if(message[0].author !== userID) {
            return res.status(401).json({ error: "sin permisos" })
        }
        const sendMessege = await MessageModel.update({ id: parseInt(req.params.id), input: result.data }) ? "Registro actualizado" : "Error al actualizar el registro"
        return res.json({ message: sendMessege })
    }

    static async delete(req, res) {
        const result = await MessageModel.delete({id:parseInt(req.params.id)})?"Eliminado correctamente":"Error al eliminarlo"
        return res.json({message:result})
    }
}