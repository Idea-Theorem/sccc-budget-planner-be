import { Request, Response } from 'express';
import permissionService from '../services/PermissionService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

export default {
    fetchPermissions: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const permissions = await permissionService.fetchPermissions();
            return res.status(200).json({ permissions });
        } catch (error) {
            console.error('Error fetching permissions:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    getPermissionById: asyncErrorHandler(async (req: Request, res: Response) => {
        const permissionId = req.params.id;

        try {
            const permission = await permissionService.getPermissionById(permissionId);
            if (!permission) {
                return res.status(404).json({ message: 'Permission not found' });
            }
            return res.status(200).json({ permission });
        } catch (error) {
            console.error('Error fetching permission by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
