import { Request, Response } from 'express';
import User from '../../src/model/user.model'; // Adjust the path if needed
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } }); 
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ username, password: hashedPassword, role });
        
        res.status(201).json({ message: 'User registered', user });
    } catch (error: any) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Login User
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret', // Store the secret in environment variables
            { expiresIn: '1h' }
        );

        console.log('Login successful, token generated');
        return res.json({ message: 'Login successful', token });
    } catch (error: any) {
        console.error('Login error:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
