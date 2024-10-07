import { Router, Request, Response } from 'express';
import { register, login } from '../controller/auth.controller';

const router = Router();

// Register route
router.post('/register', async (req: Request, res: Response) => {
    try {
        await register(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
