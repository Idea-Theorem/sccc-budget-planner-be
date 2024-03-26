import prisma from '../../config/prisma';
import { User as UserType } from "../utils/types";

export default {
    fetchUsers: async () => {
        try {
            const users = await prisma.user.findMany({
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

            return users.map((user) => {
                const roles = user.roles.map((role) => role.role);
                return { ...user, roles };
            });
        } catch (error) {
            throw error;
        }
    },

    createUser: async (body: UserType) => {
        try {
            const { roles } = body;
            return await prisma.user.create({
                data: {
                    ...body,
                    roles: {
                        create: roles?.map((roleId: string) => ({
                            role_id: roleId
                        }))
                    }
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

    updateUser: async (userId: string, body: UserType) => {
        try {
            const { roles } = body;
            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    ...body,
                    roles: {
                        create: roles?.map((roleId: string) => ({
                            role_id: roleId
                        }))
                    }
                },
            });
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
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
