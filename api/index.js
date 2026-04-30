import "dotenv/config";
import express, { json, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

const port = 3000;
const app = express();


app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Server running on port: ", port);
});

app.get("/", (req, res) => {
    return res.json("API ready!");
});

app.post("/addUser", async (req, res) => {
    try {
    const {id, email, name, surname} = req.body 
     
    const newUser = await prisma.user.create({
        data: {
            id: Number(id),
            email: email,
            name: name,
            surname: surname
        }
    })
    return res.json({
        message: "Added: ",
        user:newUser
    });
    } catch(err){
        return res.json({
            message: "Database not working or user already exists!",
            error: err
        })
    }
});

app.put("/put", (req, res) => {
    return res.json("Put not implemented!");
});

app.patch("/patch", (req, res) => {
    return res.json("Patch not implemented!");
});

app.delete("/delete", (req, res) => {
    return res.json("Delete not implemented!");
});