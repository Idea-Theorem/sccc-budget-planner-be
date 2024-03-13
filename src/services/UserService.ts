import prisma from '../../config/prisma';
import { User as UserType } from "../utils/types";

export default {
    fetchUsers: async () => {
        return await prisma.user.findMany({
            // select: {
            //     password: true
            // },
        });
    },

    createUser: async (body: UserType) => {
        return await prisma.user.create({ data: body });
    },

    getUserById: async (userId: string) => {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    },

    updateUser: async (userId: string, firstname: string, email: string, password: string) => {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstname,
                email,
                password,
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
