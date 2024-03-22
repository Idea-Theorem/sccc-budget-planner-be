import prisma from '../../config/prisma';

const roleService = {
    fetchRoles: async () => {
        const roles = await prisma.role.findMany({
            include: {
                permissions: {
                    select: {
                        permission: true
                    }
                }
            }
        });
        return roles;
    },

    getRoleById: async (roleId: string) => {
        const role = await prisma.role.findUnique({
            where: {
                id: roleId,
            },
        });
        return role;
    },
};

export default roleService;