import { Request, Response } from 'express';
import benefitService from '../services/BenefitService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

export default {
    fetchBenefit: asyncErrorHandler(async (req: Request, res: Response) => {
        const { name } = req.params;
        try {
            const centers = await benefitService.fetchBenefits(name);
            return res.status(200).json({ centers });
        } catch (error) {
            console.error('Error fetching benefits:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    createBenefit: asyncErrorHandler(async (req: Request, res: Response) => {
        const { name } = req.body;

        try {
            const createdCenter = await benefitService.createBenefit(name);
            return res.status(200).json({ center: createdCenter });
        } catch (error) {
            console.error('Error creating benefits:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    getBenefitById: asyncErrorHandler(async (req: Request, res: Response) => {
        const benefitId = req.params.id;

        try {
            const benefit = await benefitService.getBenefitById(benefitId);
            if (!benefit) {
                return res.status(404).json({ message: 'benefit not found' });
            }
            return res.status(200).json({ benefit });
        } catch (error) {
            console.error('Error fetching benefit by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    updateBenefit: asyncErrorHandler(async (req: Request, res: Response) => {
        const benefitId = req.params.id;
        const { name } = req.body;

        try {
            await benefitService.updateBenefit(benefitId, name);
            return res.status(200).json({ message: 'Benefit updated successfully' });
        } catch (error) {
            console.error('Error updating benefit:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    deleteBenefit: asyncErrorHandler(async (req: Request, res: Response) => {
        const centerId = req.params.id;

        try {
            await benefitService.deleteBenefit(centerId);
            return res.status(200).json({ message: 'Benefit deleted successfully' });
        } catch (error) {
            console.error('Error deleting benefit:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
