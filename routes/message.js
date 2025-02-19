import { Router } from 'express'
import { MessageController } from '../controllers/message.js'

export const routerMessage = () => {
    const router = Router()
    router.get('/', MessageController.getAll)
    router.get('/user', MessageController.getAllByUser)
    router.get('/:id', MessageController.getById)
    router.post('/', MessageController.create)
    router.put('/:id', MessageController.update)
    router.delete('/:id', MessageController.delete)
    return router
}
