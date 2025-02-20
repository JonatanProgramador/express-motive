import { routes } from "./routes/routes.js";
import express from 'express';
import cors from 'cors'
import cookieParse from 'cookie-parser'

const app = express()

app.use(cors({
  origin: 'http://localhost:4200',  // Permitir solo el frontend de localhost:4200
  credentials: true,  // Permitir el uso de cookies
  methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(express.json())
app.use(cookieParse())

routes(app)

app.listen(3000, () => {
    console.log('Server is listening on port http://localhost:3000')
})