import prisma from '../../config/prisma';

const roleService = {
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
};

export default roleService;