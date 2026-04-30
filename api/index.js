import "dotenv/config";
import express, { json, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateAdmin from "./middleware/jwt_middle.js";
import hashPassword from "./middleware/bcrypt_middle.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter })
const port = 3000;
const app = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server running on port: ", port);
});

app.get("/",(req, res) => {
    return res.status(200).json("API ready!");
});

app.post("/admin/login", async (req, res)=> {
    const {id, password} = req.body

    try {
        const adminUser = await prisma.admin.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!adminUser) {
            return res.status(401).json({
                message: "Access denied!"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password)
        if (!isPasswordValid){
            return res.status(401).json({
                message: "Access denied!"
            })
        }

        const token = jwt.sign({
            id: adminUser.id,
            role: "admin"
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        return res.status(200).json({
            token
        })
    } catch(err){
        return res.status(500).json({
            message: "Something went wrong with database!",
            error: err
        })
    }

})

app.post("/admin/register", async (req, res) => {
    const {id, email, password} = req.body 
    try {

        const hashedPassword = await hashPassword(password)

        const newAdmin = await prisma.admin.create({
            data: {
                id: Number(id),
                email: email,
                password: hashedPassword
            }
        })
        return res.status(200).json({
            message: "Created new admin!"
        })
    } catch(err){
        return res.status(500).json({
            message: "Something is wrong with database!",
            error: err
        })
    }
})

app.get("/getUsers", authenticateAdmin, async (req, res)=> {
    try {
        const data = await prisma.user.findMany("")
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({
            message: "Something is wrong with database!",
            error: err
        })
    }
})

app.post("/addUser", authenticateAdmin, async (req, res) => {
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
    return res.status(201).json({
        message: "Added: ",
        user:newUser
    });
    } catch(err){
        return res.status(500).json({
            message: "Database not working or user already exists!",
            error: err
        })
    }
});

app.put("/replaceUser/:id", authenticateAdmin, async (req, res) => {
    const userId = req.params.id
    const updateData = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: {
                    id: Number(userId)
            },
            data: updateData
        })
        return res.status(200).json({
            message: "Replaced:",
            data: updatedUser
        })
    } catch(err) {
        return res.status(500).json({
            message: "Something is wrong with database!",
            error: err
        })
    }
    
});

app.patch("/updateUser/:id", authenticateAdmin, async (req, res) => {
    const userId = req.params.id
    const updateData = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: {
                    id: Number(userId)
            },
            data: updateData
        })
        return res.status(200).json({
            message: "Updated:",
            data: updatedUser
        })
    } catch(err) {
        return res.status(500).json({
            message: "Something is wrong with database!",
            error: err
        })
    }
});

app.delete("/deleteUser/:id", authenticateAdmin, async (req, res) => {
    try {
        const userId = req.params.id
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(userId)
            },
        })
        return res.status(200).json({
            message: "Deleted:",
            data: deletedUser
        });    
    } catch (err) {
        return res.status(500).json({
            message: "Something is wrong with database!",
            error: err
        })
    }
    
});



