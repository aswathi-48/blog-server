import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.js'
import userRoutes from './routes/userRoute.js'
import blogRoutes from './routes/blogRoute.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
connection()

const port = process.env.PORT

app.use('/user', userRoutes)
app.use('/blog', blogRoutes)


app.listen(port, () => {
    console.log(`server running on port ${port}`);

})
