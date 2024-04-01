import prisma from '../../config/prisma';

export default {
    fetchPermissions: async () => {
        try {
            const permissions = await prisma.permission.findMany();
            return permissions;
        } catch (error) {
            throw new Error('Failed to fetch permissions');
        }
    },

    getPermissionById: async (permissionId: string) => {
        try {
            const permission = await prisma.permission.findUnique({
                where: {
                    id: permissionId,
                },
            });
            return permission;
        } catch (error) {
            throw new Error('Failed to fetch permission by ID');
        }
    },
};
