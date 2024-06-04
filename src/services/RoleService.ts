import prisma from '../../config/prisma';

export default {
    fetchRoles: async () => {
        const roles = await prisma.role.findMany({
            include: {
                permissions: {
                    select: {
                        permission: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return roles.map((role) => {
            const permissions = role.permissions.map((permission) => permission.permission);
            return { ...role, permissions };
        });
    },

    getRoleById: async (roleId: string) => {
        const role = await prisma.role.findUnique({
            where: {
                id: roleId,
            },
            include: {
                permissions: {
                    select: {
                        permission: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            }
        });
        if (role) {
            const permissions = role.permissions.map((permission) => permission.permission);
            return { ...role, permissions };
        }
        return role;
    },
    postRoles: async (name: string) => {
        const employeeRole = await prisma.employeeRole.create({
            data: {
                name,
            },
        });

        return employeeRole;
    },
    updateRoles: async (id: any, name: string) => {
        const employeeRole = await prisma.employeeRole.update({
            where: { id },
            data: {
                name,
            },
        });

        return employeeRole;
    },
    fetchEmployeeRoles: async () => {
        const employeeRoles = await prisma.employeeRole.findMany();

        return employeeRoles;
    },
    deleteEmployeeRoles: async (id: any) => {
        const employeeRoles = await prisma.employeeRole.delete({
            where: { id },
        });
        return employeeRoles
    },
    fetchNewHire: async () => {
        const programs = await prisma.program.findMany();
        const employeeArrays = programs.map(program => program.employee);

        const flattenedEmployees = employeeArrays.flatMap(employees => employees);

        const filteredEmployees = flattenedEmployees.filter((employee: any) => employee.employee === "New Hire");
        return filteredEmployees
    },
};
