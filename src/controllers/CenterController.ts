import { Request, Response } from 'express';
import centerService from '../services/CenterService';

export default {
    fetchCenters: async (req: Request, res: Response) => {
        try {
            const centers = await centerService.fetchCenters();
            return res.status(200).json({ centers });
        } catch (error) {
            console.error('Error fetching centers:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createCenter: async (req: Request, res: Response) => {
        const { name } = req.body;

        try {
            const createdCenter = await centerService.createCenter(name);
            return res.status(200).json({ center: createdCenter });
        } catch (error) {
            console.error('Error creating center:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getCenterById: async (req: Request, res: Response) => {
        const centerId = req.params.id;

        try {
            const center = await centerService.getCenterById(centerId);
            if (!center) {
                return res.status(404).json({ message: 'Center not found' });
            }
            return res.status(200).json({ center });
        } catch (error) {
            console.error('Error fetching center by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateCenter: async (req: Request, res: Response) => {
        const centerId = req.params.id;
        const { name } = req.body;

        try {
            await centerService.updateCenter(centerId, name);
            return res.status(200).json({ message: 'Center updated successfully' });
        } catch (error) {
            console.error('Error updating center:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteCenter: async (req: Request, res: Response) => {
        const centerId = req.params.id;

        try {
            await centerService.deleteCenter(centerId);
            return res.status(200).json({ message: 'Center deleted successfully' });
        } catch (error) {
            console.error('Error deleting center:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};