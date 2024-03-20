import { PrismaClient } from "@prisma/client";
import helpers from "../src/utils/helpers";
import "dotenv/config";

const prisma = new PrismaClient();

const seedRoles = async () => {
    const roles = [
        { name: 'HR' },
        { name: 'Super Admin' },
        { name: 'Admin' },
        { name: 'Department Head' },
        { name: 'Program Head' },
    ];

    for (const role of roles) {
        const existingRole = await prisma.role.findUnique({ where: { name: role.name } });
        if (!existingRole) {
            await prisma.role.create({
                data: role,
            });
        }
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
                    employment_type: "FULL_TIME",
                    compensation_type: "SALARY",
                    salary_rate: 0
                },
            });
        }
    } catch (error) {
        console.error('Error creating HR user:', error);
    }
};

const migrate = async () => {
    try {
        // Seed roles
        await seedRoles();

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
