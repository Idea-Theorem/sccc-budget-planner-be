import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../schemas/user';

export const userValidator = {
    createUser: (req: Request, res: Response, next: NextFunction) => {
        const { error } = userSchema.createUser.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    },
    loginUser: (req: Request, res: Response, next: NextFunction) => {
        const { error } = userSchema.login.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    },
}
