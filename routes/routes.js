import { middleware } from '../middleware/middleware.js'
import {routerMessage} from './message.js'
import { routerUsers } from './users.js'

export const routes = (app) => {
    middleware(app)
    app.use('/messages', routerMessage())
    app.use('/', routerUsers())
    app.use('*', (req, res) => {res.status(404).send('Not Found')})
}