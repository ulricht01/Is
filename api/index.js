import "dotenv/config";
import express, { json, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateAdmin from "./middleware/jwt_middle.js";
import hashPassword from "./middleware/bcrypt_middle.js";
import swaggerOption from "./middleware/swagger.js"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter })
const port = 3000;
const app = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// Swagger setup

swaggerOption(app)

app.listen(port, () => {
    console.log("Server running on port: ", port);
});

app.get("/",(req, res) => {
    return res.status(200).json("API ready!");
});


/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags:
 *      - Admin
 *     summary: Admin login
 *     description: Logs in an admin and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The admin's ID.
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the admin.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 */
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

/**
 * @swagger
 * /admin/register:
 *   post:
 *     tags:
 *      - Admin
 *     summary: Register a new admin
 *     description: Creates a new admin account with a hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The admin's ID.
 *               email:
 *                 type: string
 *                 description: The admin's email.
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *     responses:
 *       200:
 *         description: Admin created successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       500:
 *         description: Internal server error.
 */
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


/**
 * @swagger
 * /getUsers:
 *   get:
 *     tags:
 *      - User
 *     summary: Get all users
 *     description: Retrieves a list of all users from the database.
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *       401:
 *         description: Unauthorized. Admin access required.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /addUser:
 *   post:
 *     tags:
 *      - User
 *     summary: Add a new user
 *     description: Creates a new user in the database.
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The user's ID.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               name:
 *                 type: string
 *                 description: The user's first name.
 *               surname:
 *                 type: string
 *                 description: The user's last name.
 *     responses:
 *       201:
 *         description: User added successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /replaceUser/{id}:
 *   put:
 *     tags:
 *      - User
 *     summary: Replace a user
 *     description: Replaces the details of an existing user.
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to replace.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's new email.
 *               name:
 *                 type: string
 *                 description: The user's new first name.
 *               surname:
 *                 type: string
 *                 description: The user's new last name.
 *     responses:
 *       200:
 *         description: User replaced successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     tags:
 *      - User
 *     summary: Update a user
 *     description: Updates the details of an existing user.
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's new email.
 *               name:
 *                 type: string
 *                 description: The user's new first name.
 *               surname:
 *                 type: string
 *                 description: The user's new last name.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *         description: Internal server error.
 */
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


/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *     tags:
 *      - User
 *     summary: Delete a user
 *     description: Deletes a user from the database.
 *     security:
 *       - bearerAuth: [] # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
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



