import { Request, Response, NextFunction } from 'express';
import { roleSchema } from '../schemas/role';

export const roleValidator = {
    createRole: (req: Request, res: Response, next: NextFunction) => {
        const { error } = roleSchema.createRole.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    }
}
