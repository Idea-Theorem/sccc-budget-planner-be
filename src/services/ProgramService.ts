import prisma from '../../config/prisma';
import { ProgramStatus, Program as ProgramType, UpdateProgramStatus } from "../utils/types";

export default {
    fetchPrograms: async (status?: ProgramStatus | undefined, name?: string | undefined) => {
        try {
            const programs = await prisma.program.findMany({
                where: {
                    ...(status ? { status } : {}),
                    ...(name ? { name: { contains: name } } : {})
                },
                include: {
                    department: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
            });
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
                include: {
                    department: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
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

    updateProgramStatus: async (body: UpdateProgramStatus) => {
        try {
            const { progamIds, status } = body;
            const currentDateTime = new Date();
            await prisma.program.updateMany({
                where: {
                    id: {
                        in: progamIds,
                    },
                },
                data: {
                    status: status,
                    updated_at: {
                        push: currentDateTime,
                    },
                },
            });
        } catch (error) {
            throw new Error('Failed to update program statuses');
        }
    },
};
