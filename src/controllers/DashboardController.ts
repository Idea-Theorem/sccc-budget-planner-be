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
            console.error('Error fetching programs count:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    fetchCentersCount: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const counts = await dashboardService.fetchCentersCount();
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching centers count:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    addTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { value } = req.body
        try {
            const counts = await dashboardService.addTotalbudget(value);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error posting budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    addSuperAdminTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { value } = req.body
        try {
            const counts = await dashboardService.addSuperAdminTotalbudget(value);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error posting budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    fetchTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const counts = await dashboardService.fetchTotalBudget(id);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching total budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    fetchSuperAdminTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const counts = await dashboardService.fetchSuperAdminTotalBudget(id);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching total budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    updateTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { value } = req.body;
        try {
            const counts = await dashboardService.updateTotalBudget(id, value);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching total budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    updateSuperAdminTotalBudget: asyncErrorHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { value } = req.body;
        try {
            const counts = await dashboardService.updateSuperAdminTotalBudget(id, value);
            return res.status(200).json(counts);
        } catch (error) {
            console.error('Error fetching total budget', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
