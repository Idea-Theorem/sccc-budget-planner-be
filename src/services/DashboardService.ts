import prisma from '../../config/prisma';

export default {
    fetchDepartmentsCount: async () => {
        try {
            // Fetch count of all departments
            const departmentsCount = await prisma.department.count();

            // Fetch count of departments where all associated programs have status 'APPROVED'
            const departmentsWithApprovedPrograms = await prisma.department.count({
                where: {
                    Program: {
                        every: {
                            status: 'APPROVED'
                        }
                    }
                }
            });

            return { departmentsCount, departmentsWithApprovedPrograms };
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
            const approvedProgramsCount = await prisma.program.count({
                where: {
                    status: 'APPROVED'
                }
            });

            return { programsCount, approvedProgramsCount };
        } catch (error) {
            console.error('Error fetching programs count:', error);
            throw new Error('Failed to fetch programs count');
        }
    },
};
