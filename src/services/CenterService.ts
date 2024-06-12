import prisma from '../../config/prisma';

export default {
    fetchCenters: async (name?: string) => {
        const centers = await prisma.center.findMany({
            where: name ? {
                name: {
                    contains: name,
                    mode: 'insensitive' // Optional: makes the search case-insensitive
                }
            } : {},
            include: {
                Department: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return centers;
    },

    createCenter: async (name: string) => {
        const createdCenter = await prisma.center.create({
            data: {
                name,
            },
        });
        return createdCenter;
    },

    getCenterById: async (centerId: string) => {
        const center = await prisma.center.findUnique({
            where: {
                id: centerId,
            },
        });
        return center;
    },

    getDepartmentById: async (centerId: string) => {
        const departments: any = await prisma.department.findMany({
            where: {
                center_id: centerId
            }
        });
        const department = await fetchProgramsAndCalculateAmounts(departments)
        const totalDepartmentBudget = departments.reduce((sum: any, department: any) => sum + department.totalAmount, 0);

        return { department, totalDepartmentBudget };

        async function fetchProgramsAndCalculateAmounts(departmentArray: any) {
            for (const department of departmentArray) {
                // Fetch programs associated with the department
                const programs = await prisma.program.findMany({
                    where: { department_id: department.id },
                    select: {
                        income: true,
                        employee: true,
                        supply_expense: true,
                    },
                });

                // Initialize total amount for the department
                let totalAmount = 0;

                // Calculate the sum of amounts in income, employee, and supply_expense arrays for each program
                programs.forEach(program => {
                    const incomeTotal: any = program.income.length == 0 ? 0 : program.income.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);
                    const employeeTotal: any = program.employee.length == 0 ? 0 : program.employee.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);
                    const supplyExpenseTotal = program.supply_expense.length == 0 ? 0 : program.supply_expense.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);

                    totalAmount += incomeTotal + employeeTotal + supplyExpenseTotal;
                });

                // Store the total amount in the department object
                department.totalAmount = totalAmount;
            }

            return departmentArray;
        }
    },

    updateCenter: async (centerId: string, name: string) => {
        await prisma.center.update({
            where: {
                id: centerId,
            },
            data: {
                name,
            },
        });
    },

    deleteCenter: async (centerId: string) => {
        await prisma.center.delete({
            where: {
                id: centerId,
            },
        });
    },


};
