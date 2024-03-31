import express from 'express'
import cors from 'cors'
const app=express()

app.use(cors())
// rest of your Express.js code
app.use(express.json())
app.get("/api",async(req,res)=>{
    res.status(200).json({message:"Hello World"});
})
app.listen(8080,()=>{
    console.log("The server is listening on 8080")
})  