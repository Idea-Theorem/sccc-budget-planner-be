import prisma from '../../config/prisma';

export default {
    fetchBenefits: async (name?: string) => {
        const benefit = await prisma.benefit.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
        return benefit;
    },

    createBenefit: async (name: string) => {
        const createdBenefit = await prisma.benefit.create({
            data: {
                name,
            },
        });
        return createdBenefit;
    },

    getBenefitById: async (centerId: string) => {
        const benefit = await prisma.benefit.findUnique({
            where: {
                id: centerId,
            },
        });
        return benefit;
    },

    updateBenefit: async (centerId: string, name: string) => {
        await prisma.benefit.update({
            where: {
                id: centerId,
            },
            data: {
                name,
            },
        });
    },

    deleteBenefit: async (centerId: string) => {
        await prisma.benefit.delete({
            where: {
                id: centerId,
            },
        });
    },
};
