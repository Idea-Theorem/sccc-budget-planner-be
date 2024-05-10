import { PrismaClient } from "@prisma/client";
import helpers from "../src/utils/helpers";
import "dotenv/config";
import { PERMISSIONS, ROLEANDPERMISSIONS, ROLES } from "./constants";

const prisma = new PrismaClient();

const seedRoles = async () => {
    try {
        const roles = ROLES;

        for (const role of roles) {
            const existingRole = await prisma.role.findUnique({ where: { name: role.name } });
            if (!existingRole) {
                await prisma.role.create({
                    data: role,
                });
            }
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

const seedPermissions = async () => {
    try {
        const permissions = PERMISSIONS;

        for (const permission of permissions) {
            const existingPermission = await prisma.permission.findUnique({ where: { name: permission.name } });
            if (!existingPermission) {
                await prisma.permission.create({
                    data: permission,
                });
            }
        }
    } catch (error) {
        console.error('Error seeding permissions:', error);
    }
};

const connectRolesAndPermissions = async () => {
    try {
        for (const roleName of Object.keys(ROLEANDPERMISSIONS) as (keyof typeof ROLEANDPERMISSIONS)[]) {
            const role = await prisma.role.findFirst({ where: { name: roleName } });
            const permissionNames = ROLEANDPERMISSIONS[roleName];
            if (!role) {
                console.error(`Role '${roleName}' not found.`);
                continue;
            }
            for (const permissionName of permissionNames) {
                // Find the permission by name
                const permission = await prisma.permission.findFirst({ where: { name: permissionName } });
                if (!permission) {
                    console.error(`Permission '${permissionName}' not found.`);
                    continue;
                }
                // Check if the role permission entry already exists
                const existingRolePermission = await prisma.rolePermission.findFirst({
                    where: {
                        role_id: role.id,
                        permission_id: permission.id,
                    },
                });
                // Create the RolePermission entry if it doesn't exist
                if (!existingRolePermission) {
                    await prisma.rolePermission.create({
                        data: {
                            role_id: role.id,
                            permission_id: permission.id,
                        },
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error connecting roles and permissions:', error);
    }
};

const createHRUser = async () => {
    try {
        // Retrieve HR role
        const hrRole = await prisma.role.findUnique({
            where: {
                name: 'HR',
            },
        });

        if (!hrRole) {
            console.error('HR role not found in the database.');
            return;
        }

        // Create HR user if not exists
        const existingHRUser = await prisma.user.findUnique({
            where: {
                email: 'hr@gmail.com',
            },
        });
        const pasword = process.env.HR_PASSWORD;
        const hashedPassword = await helpers.hashPassword(pasword as string);

        if (!existingHRUser) {
            await prisma.user.create({
                data: {
                    firstname: 'HR',
                    lastname: 'User',
                    email: 'hr@gmail.com',
                    password: hashedPassword,
                    roles: {
                        create: [{
                            role: {
                                connect: { id: hrRole.id }
                            }
                        }]
                    },
                    hire_date: new Date(),

                },
            });
        }
    } catch (error) {
        console.error('Error creating HR user:', error);
    }
};

const migrate = async () => {
    try {
        // Seed Roles
        await seedRoles();

        // Seed Permissions
        await seedPermissions()

        // Seed connectRolesAndPermissions
        await connectRolesAndPermissions()

        // Create HR user
        await createHRUser();

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Error running migration:', error);
    } finally {
        await prisma.$disconnect();
    }
};

migrate();

export default prisma;
