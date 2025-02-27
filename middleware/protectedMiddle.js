import jwt from 'jsonwebtoken'
import { ENV } from '../env.js'

export function protecredMiddle(app) {
    function authentication(req, res, next) {
           try{
               const data = jwt.verify(req.cookies.token, ENV.KEY_JWT)
               req.body.userId=data.id
           } catch(error) {
               
           }
           next()
    }
    app.post('/messages', authentication)
    app.get('/messages/user', authentication)
    app.delete('/messages/:id',  authentication)
    app.put('/messages/:id',  authentication)
    app.get('/auth', authentication)
}