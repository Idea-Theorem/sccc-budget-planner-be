import prisma from '../../config/prisma';
import { User as UserType } from "../utils/types";

export default {
    fetchUsers: async () => {
        return await prisma.user.findMany({
            include: {
                roles: {
                    select: {
                        role: true
                    }
                }
            }
        });
    },

    createUser: async (body: UserType) => {
        const { roles } = body
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
    },

    getUserById: async (userId: string) => {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                roles: true
            }
        });
    },

    updateUser: async (userId: string, body: UserType) => {
        const { roles } = body
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
    },

    deleteUser: async (userId: string) => {
        return await prisma.user.delete({
            where: {
                id: userId,
            },
        });
    },

    checkEmail: async (email: string) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }
}
