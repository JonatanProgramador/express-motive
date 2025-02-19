import jwt from 'jsonwebtoken'
import { ENV } from '../env.js'

export function protecredMiddle(app) {
    function authentication(req, res, next) {
        if (!req.cookies.token)  return res.status(401).json({ message: "invalid authentication" })
           try{
               const data = jwt.verify(req.cookies.token, ENV.KEY_JWT)
               req.body.userId=data.id
               next()
           } catch(error) {
               res.status(401).json({ message: "error" })
           }
    }
    app.post('/messages', authentication)
    app.get('/messages/user', authentication)
    app.delete('/messages',  authentication)
    app.put('/messages',  authentication)
}