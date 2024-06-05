import { Request, Response } from 'express';
import roleService from '../services/RoleService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

export default {
    fetchRoles: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const roles = await roleService.fetchRoles();
            return res.status(200).json({ roles });
        } catch (error) {
            console.error('Error fetching roles:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    getRoleById: asyncErrorHandler(async (req: Request, res: Response) => {
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
    }),

    createEmployeeRole: asyncErrorHandler(async (req: Request, res: Response) => {
        const { name } = req.body;

        try {
            const role = await roleService.postRoles(name);

            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error posting role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    updateEmployeeRole: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const role = await roleService.updateRoles(id, name);

            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error posting role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    fetchEmployeeRole: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const role = await roleService.fetchEmployeeRoles();

            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error fetching role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    deleteEmployeeRole: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const role = await roleService.deleteEmployeeRoles(id);

            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error fetching role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    fetchNewhire: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const newHire = await roleService.fetchNewHire();
            return res.status(200).json(newHire);
        } catch (error) {
            console.error('Error fetching new hires:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    deleteNewhire: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id, empId } = req.params;

        try {
            const role = await roleService.deleteNewHire(id, empId);

            return res.status(200).json({ role });
        } catch (error) {
            console.error('Error fetching role by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
