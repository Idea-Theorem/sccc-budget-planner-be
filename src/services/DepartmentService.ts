import prisma from '../../config/prisma';
import { Department as DepartmentType } from '../utils/types';

export default {
    fetchDepartments: async (name?: string) => {
        const departments = await prisma.department.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            include: {
                center: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                Program: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return departments;
    },

    createDepartment: async (data: DepartmentType) => {
        const createdDepartment = await prisma.department.create({ data: data });
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

    updateDepartment: async (departmentId: string, data: DepartmentType) => {
        await prisma.department.update({
            where: {
                id: departmentId,
            },
            data: data,
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
