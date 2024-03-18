import { Request, Response, NextFunction } from 'express';
import { programSchema } from '../schemas/program';

export const programValidator = {
    createProgram: (req: Request, res: Response, next: NextFunction) => {
        const { error } = programSchema.createProgram.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    }
}
