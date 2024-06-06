import { Request, Response } from 'express';
import programService from '../services/ProgramService';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import { isValidUUID } from '../utils/uuidValidator';
import DepartmentService from '../services/DepartmentService';
import { ProgramStatus, User } from '../utils/types';
import prisma from '../../config/prisma';

export default {
    fetchPrograms: asyncErrorHandler(async (req: Request | any, res: Response) => {
        try {
            const { status, name } = req.query;
            const { id } = req.user
            const nameString = typeof name === 'string' ? name : '';
            const programs = await programService.fetchPrograms(id, status as ProgramStatus, nameString);
            return res.status(200).json({ programs });
        } catch (error) {
            console.error('Error fetching programs:', error);
            return res.status(500).json({ message: error });
        }
    }),

    fetchcomments: asyncErrorHandler(async (req: Request | any, res: Response) => {
        try {
            const comments = await programService.fetchcomments();
            return res.status(200).json({ comments });
        } catch (error) {
            console.error('Error fetching programs:', error);
            return res.status(500).json({ message: error });
        }
    }),

    createProgram: asyncErrorHandler(async (req: Request | any, res: Response) => {
        const data: any = req.body;
        data.user_id = req.user.id
        const { department_id } = data
        // check if department id is a valid uuid
        const isValidDepartmentId = isValidUUID(department_id);
        if (!isValidDepartmentId) {
            return res.status(401).json({ message: 'Invalid department id' });
        }

        const existingDepartmentId = await DepartmentService.getDepartmentById(department_id)
        if (!existingDepartmentId) {
            return res.status(401).json({ message: 'Department id does not exist' });
        }

        try {
            const createdProgram = await programService.createProgram(data);
            return res.status(200).json({ program: createdProgram });
        } catch (error) {
            console.error('Error creating program:', error);
            return res.status(500).json({ message: error });
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
            return res.status(500).json({ message: error });
        }
    }),

    updateProgram: asyncErrorHandler(async (req: Request, res: Response) => {
        const programId = req.params.id;
        const data = req.body;
        const { department_id } = data

        // check if department id is a valid uuid
        const isValidDepartmentId = isValidUUID(department_id);
        if (!isValidDepartmentId) {
            return res.status(401).json({ message: 'Invalid department id' });
        }

        const existingDepartmentId = await DepartmentService.getDepartmentById(department_id)
        if (!existingDepartmentId) {
            return res.status(401).json({ message: 'Department id does not exist' });
        }

        try {
            await programService.updateProgram(programId, data);
            return res.status(200).json({ message: 'Program updated successfully' });
        } catch (error) {
            console.error('Error updating program:', error);
            return res.status(500).json({ message: error });
        }
    }),
    updateComment: asyncErrorHandler(async (req: Request, res: Response) => {
        const commentId = req.params.id;
        const { text } = req.body;

        try {
            await programService.updateComment(commentId, text);
            return res.status(200).json({ message: 'Program updated successfully' });
        } catch (error) {
            console.error('Error updating program:', error);
            return res.status(500).json({ message: error });
        }
    }),

    deleteProgram: asyncErrorHandler(async (req: Request, res: Response) => {
        const programId = req.params.id;

        try {
            await programService.deleteProgram(programId);
            return res.status(200).json({ message: 'Program deleted successfully' });
        } catch (error) {
            console.error('Error deleting program:', error);
            return res.status(500).json({ message: error });
        }
    }),

    updateProgramStatus: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            await programService.updateProgramStatus(req.body);
            return res.status(200).json({ message: 'Program statuses updated successfully' });
        } catch (error) {
            console.error('Error deleting program:', error);
            return res.status(500).json({ message: error });
        }
    }),
    commentsInPrograms: asyncErrorHandler(async (req: Request | any, res: Response) => {
        try {
            await programService.adCommentInPrograms(req.body, req?.user?.id);
            return res.status(200).json({ message: 'Comment added successfully' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }),

    deletecomment: asyncErrorHandler(async (req: Request, res: Response) => {
        const commentId = req.params.id;

        try {
            await programService.deleteComment(commentId);
            return res.status(200).json({ message: 'coment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            return res.status(500).json({ message: error });
        }
    }),
    updateCommentstatus: asyncErrorHandler(async (req: Request, res: Response) => {
        const commentId = req.params.id;
        try {
            const comment: any = await prisma.comment.findUnique({ where: { id: commentId } });

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found.' });
            }

            if (comment.isResolved) {
                return res.status(400).json({ error: 'Comment is already resolved.' });
            }

            const updatedComment = await prisma.comment.update({
                where: { id: commentId },
                data: { isResolved: true },
            });

            res.json({ message: 'Comment is resolved successfully.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while resolving the comment.' });
        }
    }),

    fetchProgramsByUser: asyncErrorHandler(async (req: Request | any, res: Response) => {
        try {
            const { status, name } = req.query;
            const { id } = req.user
            const nameString = typeof name === 'string' ? name : '';
            const programs = await programService.fetchProgramsByUser(id, status as ProgramStatus, nameString);
            return res.status(200).json({ programs });
        } catch (error) {
            console.error('Error fetching programs:', error);
            return res.status(500).json({ message: error });
        }
    }),
};
