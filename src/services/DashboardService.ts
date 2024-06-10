import prisma from '../../config/prisma';

export default {
    fetchDepartmentsCount: async () => {
        try {
            // Fetch count of all departments
            const departmentsCount = await prisma.department.count();

            // Fetch count of departments where all associated programs have status 'APPROVED'
            const approvedCount = await prisma.department.count({
                where: {
                    Program: {
                        every: {
                            status: 'APPROVED'
                        }
                    }
                }
            });

            return { departmentsCount, approvedCount };
        } catch (error) {
            console.error('Error fetching departments count:', error);
            throw new Error('Failed to fetch departments count');
        }
    },

    fetchProgramsCount: async () => {
        try {
            // Fetch count of all programs
            const programsCount = await prisma.program.count();

            // Fetch count of programs with status 'APPROVED'
            const approvedCount = await prisma.program.count({
                where: {
                    status: 'APPROVED'
                }
            });

            const departmentCount = await prisma.department.count();

            // Fetch count of programs with status 'APPROVED'
            const approvedDepartmentCount = await prisma.department.count({
                where: {
                    status: 'APPROVED'
                }
            });

            const programs = await prisma.program.findMany({
                where: { status: 'APPROVED' },
            });

            const totalIncomeSum = programs.reduce((acc: any, program) => {
                const incomeSum = program.income.reduce((sum, item: any) => sum + item.amount, 0);
                return acc + incomeSum;
            }, 0);

            const totalSupplyExpenseSum = programs.reduce((acc: any, program) => {
                const supplyExpenseSum = program.supply_expense.reduce((sum, item: any) => sum + item.amount, 0);
                return acc + supplyExpenseSum;
            }, 0);

            const totalApprovedProgrambudget = Number(totalIncomeSum) + Number(totalSupplyExpenseSum)


            return { programsCount, totalApprovedProgrambudget, approvedCount, departmentCount, approvedDepartmentCount };
        } catch (error) {
            console.error('Error fetching programs count:', error);
            throw new Error('Failed to fetch programs count');
        }
    },

    fetchCentersCount: async () => {
        try {
            // Fetch count of all centers
            const centersCount = await prisma.center.count();

            // Fetch count of centers where all associated departments have programs with status 'APPROVED'
            const approvedCount = await prisma.center.count({
                where: {
                    Department: {
                        every: {
                            Program: {
                                some: {
                                    status: 'APPROVED'
                                }
                            }
                        }
                    }
                }
            });

            return { centersCount, approvedCount };
        } catch (error) {
            console.error('Error fetching centers count:', error);
            throw new Error('Failed to fetch centers count');
        }
    },

    addTotalbudget: async (total_value: any) => {
        try {
            const newValue = await prisma.budget.create({
                data: { total_value },
            });
            return newValue
        } catch (error) {
            throw new Error('Failed to post total budget');
        }
    },

    fetchTotalBudget: async (id: any) => {
        try {
            const value = await prisma.budget.findUnique({
                where: { id: parseInt(id) },
            });
            return value
        } catch (error) {
            console.error('Error fetching centers count:', error);
            throw new Error('Failed to fetch centers count');
        }
    },
    fetchSuperAdminTotalBudget: async (id: any) => {
        try {
            const value = await prisma.budgetSuperAdmin.findUnique({
                where: { id: parseInt(id) },
            });
            return value
        } catch (error) {
            console.error('Error fetching centers count:', error);
            throw new Error('Failed to fetch centers count');
        }
    },
    updateTotalBudget: async (id: any, total_value: any) => {
        try {
            const updatedValue = await prisma.budget.update({
                where: { id: parseInt(id) },
                data: { total_value },
            });
            return updatedValue
        } catch (error) {
            console.error('Error update budget :', error);
            throw new Error('Failed to budget ');
        }
    },
    updateSuperAdminTotalBudget: async (id: any, total_value: any) => {
        try {
            const updatedValue = await prisma.budgetSuperAdmin.update({
                where: { id: parseInt(id) },
                data: { total_value },
            });
            return updatedValue
        } catch (error) {
            console.error('Error update budget :', error);
            throw new Error('Failed to budget ');
        }
    },
    addSuperAdminTotalbudget: async (total_value: any) => {
        try {
            const newValue = await prisma.budgetSuperAdmin.create({
                data: { total_value },
            });
            return newValue
        } catch (error) {
            throw new Error('Failed to post total budget');
        }
    },
};
