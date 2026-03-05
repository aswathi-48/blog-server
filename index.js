import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.js'
import userRoutes from './routes/userRoute.js'
dotenv.config()
app.use(express.json())
connection()
const port = process.env.PORT

app.use('/user',userRoutes)

app.listen(port,()=>{
console.log(`server running on port ${port}`);

})
