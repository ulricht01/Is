import express, { json, urlencoded } from "express"
import pkg from "@prisma/client"; // 1. Importujeme celý balíček jako výchozí export
const { PrismaClient } = pkg;

const port = 3000;
const app = express()

const prisma = new PrismaClient();

app.use(urlencoded(json))

app.listen(port, ()=> {
    
    console.log("Server running on port: ", port )
})

app.get("/", (req, res)=>{


    return res.json("API ready!")
})

app.post("/post", (req, res)=> {
    return res.json("Post not implemented!")
})

app.put("/put", (req, res)=> {
    return res.json("Put not implemented!")
})

app.patch("/patch", (req, res)=> {
    return(res.json("Patch not implemented!"))
})

app.delete("/delete", (req, res) => {
    return res.json("Delete not implemented!")
})