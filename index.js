import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connection from './config/db.js'
dotenv.config()

connection()
const port = 3000

app.listen(port,()=>{
console.log(`server running on port ${port}`);

})