import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.js'
dotenv.config()
app.use(express.json())
connection()
const port = process.env.PORT

app.listen(port,()=>{
console.log(`server running on port ${port}`);

})