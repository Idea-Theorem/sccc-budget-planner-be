import { Request, Response } from 'express';
import departmentService from '../services/DepartmentService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import { isValidUUID } from '../utils/uuidValidator';
import centerService from '../services/CenterService';

export default {
    fetchDepartments: asyncErrorHandler(async (req: Request, res: Response) => {
        const { name } = req.params;
        try {
            const departments = await departmentService.fetchDepartments(name);
            return res.status(200).json({ departments });
        } catch (error) {
            console.error('Error fetching departments:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    fetchEmployeeAgainstDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const departmentId = req.params.departmentId;
        try {
            const departments = await departmentService.fetchEmployeeInDepartment(departmentId);
            return res.status(200).json({ departments });
        } catch (error) {
            console.error('Error fetching departments:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    fetchProgramsAgainstDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const departmentId = req.params.departmentId;
        try {
            const departments = await departmentService.fetchProgramInDepartment(departmentId);
            return res.status(200).json({ departments });
        } catch (error) {
            console.error('Error fetching programs:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    createDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const { center_id } = data;

        // check if center id is a valid uuid
        const isValidCenterId = isValidUUID(center_id);
        if (!isValidCenterId) {
            return res.status(401).json({ message: 'Invalid center id' });
        }

        const existingCenterId = await centerService.getCenterById(center_id)
        if (!existingCenterId) {
            return res.status(401).json({ message: 'Center id does not exist' });
        }

        try {
            const createdDepartment = await departmentService.createDepartment(data);
            return res.status(200).json({ department: createdDepartment });
        } catch (error) {
            console.error('Error creating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    getDepartmentById: asyncErrorHandler(async (req: Request, res: Response) => {
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
    }),

    updateDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const departmentId = req.params.id;
        const data = req.body;
        const { center_id } = data;

        // check if center id is a valid uuid
        const isValidCenterId = isValidUUID(center_id);
        if (!isValidCenterId) {
            return res.status(401).json({ message: 'Invalid center id' });
        }

        const existingCenterId = await centerService.getCenterById(center_id)
        if (!existingCenterId) {
            return res.status(401).json({ message: 'Center id does not exist' });
        }

        try {
            await departmentService.updateDepartment(departmentId, data);
            return res.status(200).json({ message: 'Department updated successfully' });
        } catch (error) {
            console.error('Error updating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    deleteDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const departmentId = req.params.id;

        try {
            await departmentService.deleteDepartment(departmentId);
            return res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
            console.error('Error deleting department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    updateDepartmentStatus: asyncErrorHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const { departmentIds, status } = data;
        try {
            const createdDepartment = await departmentService.updateStaus(departmentIds, status);
            return res.status(200).json({ message: 'Department status updated successfully' });
        } catch (error) {
            console.error('Error creating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    programCountInDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const createdDepartment = await departmentService.getProgramCount(id);
            return res.status(200).json(createdDepartment);
        } catch (error) {
            console.error('Error creating department:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    fetchDepartmentsViaStatus: asyncErrorHandler(async (req: Request, res: Response) => {
        const { status } = req.params;
        try {
            const departments = await departmentService.fetchDepartmentsStatus(status);
            return res.status(200).json({ departments });
        } catch (error) {
            console.error('Error fetching departments:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
