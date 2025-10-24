import prisma from "../prisma.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const login = async (req, res) => {
    try {
        const { code } = req.body;
        console.log("code in login", code);
        if (!code || code.length !== 4) {
            return res.status(400).json({ success: false, message: 'Invalid 4-digit code' });
        }
        const user = await prisma.user.findUnique({
            where: { code },
        });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User Not found' });
        }
        if (user.code != code) {
            return res.status(401).json({ success: false, message: 'Invalid 4-digit code' });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: 'JWT secret not configured' });
        }
        const payload = {
            id: user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            success: true,
            message: "Login Successful",
            data: {
                token: token,
                user: user
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};
export const registerAdmin = async (req, res) => {
    try {
        const { code, name } = req.body;
        if (!code || !name) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { code: code }
        });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this code already exists' });
        }
        const newUser = await prisma.user.create({
            data: { code: code, name: name }
        });
        res.status(201).json({ success: true, message: 'Admin registered successfully', data: { user: newUser } });
    }
    catch (error) {
        console.log("error in register Admin", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const RegisterUser = async (req, res) => {
    try {
        const { code, name } = req.body;
        if (!code || !name) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { code: code }
        });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this code already exists' });
        }
        // const hasedCode = await bcrypt.hash(code, 10)
        // const newUser = await prisma.user.create({
        //   data: { code: hasedCode, name: name, designation: designation, level: level }
        // })
        const newUser = await prisma.user.create({
            data: { code: code, name: name }
        });
        res.status(201).json({ success: true, message: 'User registered successfully', data: { user: newUser } });
    }
    catch (error) {
        console.log("error in register", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
