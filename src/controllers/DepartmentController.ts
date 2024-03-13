import { Request, Response } from 'express';
import departmentService from '../services/DepartmentService';

export default {
    fetchDepartments: async (req: Request, res: Response) => {
        try {
            const departments = await departmentService.fetchDepartments();
            return res.status(200).json({ departments });
        } catch (error) {
            console.error('Error fetching departments:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createDepartment: async (req: Request, res: Response) => {
        const { name } = req.body;

        try {
            const createdDepartment = await departmentService.createDepartment(name);
            return res.status(200).json({ department: createdDepartment });
        } catch (error) {
            console.error('Error creating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getDepartmentById: async (req: Request, res: Response) => {
        const departmentId = req.params.id;

        try {
            const department = await departmentService.getDepartmentById(departmentId);
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            return res.status(200).json({ department });
        } catch (error) {
            console.error('Error fetching department by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateDepartment: async (req: Request, res: Response) => {
        const departmentId = req.params.id;
        const { name } = req.body;

        try {
            await departmentService.updateDepartment(departmentId, name);
            return res.status(200).json({ message: 'Department updated successfully' });
        } catch (error) {
            console.error('Error updating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteDepartment: async (req: Request, res: Response) => {
        const departmentId = req.params.id;

        try {
            await departmentService.deleteDepartment(departmentId);
            return res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
            console.error('Error deleting department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};