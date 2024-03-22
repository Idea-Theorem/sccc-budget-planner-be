import { Request, Response } from 'express';
import programService from '../services/ProgramService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

export default {
    fetchPrograms: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const programs = await programService.fetchPrograms();
            return res.status(200).json({ programs });
        } catch (error) {
            console.error('Error fetching programs:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    createProgram: asyncErrorHandler(async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const createdProgram = await programService.createProgram(data);
            return res.status(200).json({ program: createdProgram });
        } catch (error) {
            console.error('Error creating program:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    getProgramById: asyncErrorHandler(async (req: Request, res: Response) => {
        const programId = req.params.id;

        try {
            const program = await programService.getProgramById(programId);
            if (!program) {
                return res.status(404).json({ message: 'Program not found' });
            }
            return res.status(200).json({ program });
        } catch (error) {
            console.error('Error fetching program by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    updateProgram: asyncErrorHandler(async (req: Request, res: Response) => {
        const programId = req.params.id;
        const data = req.body;

        try {
            await programService.updateProgram(programId, data);
            return res.status(200).json({ message: 'Program updated successfully' });
        } catch (error) {
            console.error('Error updating program:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),

    deleteProgram: asyncErrorHandler(async (req: Request, res: Response) => {
        const programId = req.params.id;

        try {
            await programService.deleteProgram(programId);
            return res.status(200).json({ message: 'Program deleted successfully' });
        } catch (error) {
            console.error('Error deleting program:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
