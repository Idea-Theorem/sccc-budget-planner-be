import prisma from '../../config/prisma';

export default {
    fetchDepartments: async () => {
        const departments = await prisma.department.findMany();
        return departments;
    },

    createDepartment: async (name: string) => {
        const createdDepartment = await prisma.department.create({
            data: {
                name,
            },
        });
        return createdDepartment;
    },

    getDepartmentById: async (departmentId: string) => {
        const department = await prisma.department.findUnique({
            where: {
                id: departmentId,
            },
        });
        return department;
    },

    updateDepartment: async (departmentId: string, name: string) => {
        await prisma.department.update({
            where: {
                id: departmentId,
            },
            data: {
                name,
            },
        });
    },

    deleteDepartment: async (departmentId: string) => {
        await prisma.department.delete({
            where: {
                id: departmentId,
            },
        });
    },
};