import prisma from '../../config/prisma';
import { UpdateUser, User as UserType } from "../utils/types";

export default {
    fetchUsers: async (name?: string) => {
        try {
            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            firstname: {
                                contains: name,
                                mode: 'insensitive' // case-insensitive search
                            }
                        },
                        {
                            lastname: {
                                contains: name,
                                mode: 'insensitive' // case-insensitive search
                            }
                        },
                        {
                            email: {
                                contains: name,
                                mode: 'insensitive' // case-insensitive search
                            }
                        }
                    ],
                    NOT: {
                        roles: {
                            some: {
                                role: {
                                    name: "HR"
                                }
                            }
                        }
                    }
                },
                include: {
                    roles: {
                        select: {
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        }
                    },
                    employeDepartments: {
                        select: {
                            id: true,
                            // name: true,
                            hourlyRate: true,
                            salaryRate: true,
                            title: true,
                            department: {
                                select: {
                                    id: true,
                                    name: true,
                                    // include other fields from Department model if needed
                                }
                            }

                        }
                    }
                },
            });



            return users?.map((user) => {
                const roles = user.roles.map((role) => role.role);
                return { ...user, roles };
            });
        } catch (error) {
            throw error;
        }
    },

    createUser: async (body: UserType | any) => {

        try {
            const { roles, employeDepartments } = body;
            return await prisma.user.create({
                data: {
                    ...body,
                    roles: {
                        create: roles?.map((roleId: string) => ({
                            role_id: roleId
                        }))
                    },
                    employeDepartments: {
                        create: employeDepartments.map((department: any) => ({
                            title: department.title,
                            hourlyRate: department.hourlyRate,
                            salaryRate: department.salaryRate,
                            department: {
                                connect: { id: department.department_id },
                            },
                        })),
                    },
                }
            });
        } catch (error) {
            throw error;
        }
    },

    getUserById: async (userId: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    roles: {
                        select: {
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            if (user) {
                const roles = user.roles.map((role) => role.role);
                return { ...user, roles };
            }
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId: string, body: UpdateUser) => {
        try {
            const { roles } = body;

            // Delete existing relations
            await prisma.userRole.deleteMany({
                where: {
                    user_id: userId,
                },
            });

            // Create new relations
            const roleConnections = roles?.map((roleId: string) => ({
                role: {
                    connect: {
                        id: roleId,
                    },
                },
            }));

            // Update the user with the new roles
            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    ...body,
                    roles: {
                        // Connect the user with the new roles
                        create: roleConnections,
                    },
                },
                include: {
                    roles: true,
                },
            });
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
            await prisma.employeeDepartment.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            await prisma.userRole.deleteMany({
                where: {
                    user_id: userId,
                },
            });

            await prisma.program.deleteMany({
                where: {
                    user_id: userId,
                },
            });

            await prisma.userComment.deleteMany({
                where: {
                    user_id: userId,
                },
            });

            return await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        } catch (error) {
            throw error;
        }
    },

    checkEmail: async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    roles: {
                        select: {
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (user) {
                const roles = user.roles.map((role) => role.role);
                return { ...user, roles };
            }
        } catch (error) {
            throw error;
        }
    }
}
