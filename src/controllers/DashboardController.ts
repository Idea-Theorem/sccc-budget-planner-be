import { Request, Response } from 'express';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import dashboardService from '../services/DashboardService';

export default {
    fetchDepartmentsCount: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const counts = await dashboardService.fetchDepartmentsCount();
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching department counts:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    fetchProgramsCount: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const counts = await dashboardService.fetchProgramsCount();
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching department counts:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
