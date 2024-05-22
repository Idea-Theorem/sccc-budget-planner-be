import prisma from '../../config/prisma';

export default {
    fetchCenters: async (name?: string) => {
        const centers = await prisma.center.findMany({
            where: name ? {
                name: {
                    contains: name,
                    mode: 'insensitive' // Optional: makes the search case-insensitive
                }
            } : {},
            include: {
                Department: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return centers;
    },

    createCenter: async (name: string) => {
        const createdCenter = await prisma.center.create({
            data: {
                name,
            },
        });
        return createdCenter;
    },

    getCenterById: async (centerId: string) => {
        const center = await prisma.center.findUnique({
            where: {
                id: centerId,
            },
        });
        return center;
    },

    getDepartmentById: async (centerId: string) => {
        const departments = await prisma.department.findMany({
            where: {
                center_id: centerId
            }
        });
        return departments;
    },

    updateCenter: async (centerId: string, name: string) => {
        await prisma.center.update({
            where: {
                id: centerId,
            },
            data: {
                name,
            },
        });
    },

    deleteCenter: async (centerId: string) => {
        await prisma.center.delete({
            where: {
                id: centerId,
            },
        });
    },
};
