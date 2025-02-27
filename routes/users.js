import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const routerUsers = () => {
    const router = Router()
    router.post('/login', UserController.login)
    router.post('/register', UserController.register)
    router.post('/logout', UserController.logout)
    router.get('/auth', UserController.isAuth)
    return router
}