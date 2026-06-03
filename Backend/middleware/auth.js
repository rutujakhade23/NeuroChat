import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

console.log("AUTH ROUTES LOADED");
const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route working"
    });
});

export default router;