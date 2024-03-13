import prisma from '../../config/prisma';
import { Program as ProgramType } from "../utils/types";

export default {
    fetchPrograms: async () => {
        try {
            const programs = await prisma.program.findMany();
            return programs;
        } catch (error) {
            throw new Error('Failed to fetch programs');
        }
    },

    createProgram: async (body: ProgramType) => {
        try {
            const createdProgram = await prisma.program.create({ data: body });
            return createdProgram;
        } catch (error) {
            throw new Error('Failed to create program');
        }
    },

    getProgramById: async (programId: string) => {
        try {
            const program = await prisma.program.findUnique({
                where: {
                    id: programId,
                },
            });
            return program;
        } catch (error) {
            throw new Error('Failed to fetch program by ID');
        }
    },

    updateProgram: async (programId: string, body: ProgramType) => {
        try {
            await prisma.program.update({
                where: {
                    id: programId,
                },
                data: body,
            });
        } catch (error) {
            throw new Error('Failed to update program');
        }
    },

    deleteProgram: async (programId: string) => {
        try {
            await prisma.program.delete({
                where: {
                    id: programId,
                },
            });
        } catch (error) {
            throw new Error('Failed to delete program');
        }
    },
};