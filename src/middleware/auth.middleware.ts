import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).send('Access denied.');
        }

        jwt.verify(token, 'your_jwt_secret', (err: any, decoded: any) => {
            if (err) {
                return res.status(403).send('Invalid token.');
            }

            if (!roles.includes(decoded.role)) {
                return res.status(403).send('Access denied.');
            }

            req.user = decoded;
            next();
        });
    };
};
