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
    fetchEmployeeInDepartment: async (departmentId?: any) => {
        const uniqueUserIds = await prisma.employeeDepartment.findMany({
            where: {
                department_id: departmentId
            },
            // distinct: ['user_id']
        }).then(users => users.map(user => user.user_id));
        console.log("uniqueUserIds:::::::::::::", uniqueUserIds)
        // Fetch complete user data based on unique user IDs
        const employees = await prisma.user.findMany({
            where: {
                id: {
                    in: uniqueUserIds
                }
            }
        });

        return employees;
    },


    createDepartment: async (data: any) => {
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

    updateDepartment: async (departmentId: string, data: any) => {
        await prisma.department.update({
            where: {
                id: departmentId,
            },
            data: data,
        });
    },

    deleteDepartment: async (departmentId: string) => {
        // First, delete related EmployeeDepartment records
        await prisma.employeeDepartment.deleteMany({
            where: {
                department_id: departmentId,
            },
        });

        // Now that there are no more related records, delete the department
        await prisma.department.delete({
            where: {
                id: departmentId,
            },
        });
    },

    updateStaus: async (departmentIds: any) => {
        const departments = await prisma.department.findMany({
            where: { id: { in: departmentIds } },
            include: { Program: true }
        });

        departments.forEach(async (department) => {
            const allProgramsApproved = department.Program.every(program => program.status === 'APPROVED' || program.status === 'DRAFTED');
            if (allProgramsApproved && department.status === 'PENDING') {
                await prisma.department.update({
                    where: { id: department.id },
                    data: { status: 'APPROVED' }
                });
                console.log(`Department ${department.id} status updated to APPROVED`);
            } else {
                console.log(`Department ${department.id} status remains as ${department.status}`);
            }
        });
    },
    getProgramCount: async (departmentIds: any) => {
        const programs = await prisma.program.findMany({
            where: {
                department_id: departmentIds
            }
        });

        const approvedCount = programs.filter(program => program.status === 'APPROVED').length;
        const pendingCount = programs.filter(program => program.status === 'PENDING').length;

        return { approvedCount, pendingCount };

    },
    fetchDepartmentsStatus: async (status?: any) => {
        const departments = await prisma.department.findMany({
            where: {
                status: status
            },
            // include: {
            //     center: true,
            //     User: true,
            //     Program: true,
            //     EmployeeDepartment: true
            // }
        });
        return departments;
    },

};
