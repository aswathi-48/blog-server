import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.js'
import userRoutes from './routes/userRoute.js'
import blogRoutes from './routes/blogRoute.js'
dotenv.config()
app.use(express.json())
connection()
const port = process.env.PORT

app.use('/user',userRoutes)
app.use('/blog',blogRoutes)

app.listen(port,()=>{
console.log(`server running on port ${port}`);

})
