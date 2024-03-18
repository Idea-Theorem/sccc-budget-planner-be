import { Request, Response, NextFunction } from 'express';
import { departmentSchema } from '../schemas/department';

export const departmentValidator = {
    createDepartment: (req: Request, res: Response, next: NextFunction) => {
        const { error } = departmentSchema.createDepartment.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    }
}
