import { Request, Response } from 'express';
import roleService from '../services/RoleService';

export default {
    fetchRoles: async (req: Request, res: Response) => {
        try {
            const roles = await roleService.fetchRoles();
            return res.status(200).json({ roles });
        } catch (error) {
            console.error('Error fetching roles:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getRoleById: async (req: Request, res: Response) => {
        const roleId = req.params.id;

        try {
            const role = await roleService.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error fetching role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};