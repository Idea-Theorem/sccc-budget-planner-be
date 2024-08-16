import prisma from "../../config/prisma";
import helpers from "../utils/helpers";
import { Department as DepartmentType } from "../utils/types";

export default {
  fetchDepartments: async (name?: string | any) => {
    const departmentData = await prisma.department.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: "insensitive", // Optional: makes the search case-insensitive
            },
          }
        : {},
      include: {
        center: {
          select: {
            id: true,
            name: true,
          },
        },
        Program: {
          where: {
            status: "APPROVED", // Add this line to filter by approved status
          },
          select: {
            id: true,
            name: true,
            income: true,
            supply_expense: true,
          },
        },
        _count: {
          select: {
            EmployeeDepartment: true, // Count the employeeDepartments linked to users
          },
        },
      },
    });
    const departments = await fetchProgramsAndCalculateAmounts(departmentData);
    return departments;
    async function fetchProgramsAndCalculateAmounts(departmentArray: any) {
      for (const department of departmentArray) {
        // Fetch programs associated with the department
        const programs = await prisma.program.findMany({
          where: { department_id: department.id, status: "APPROVED" },
          select: {
            programBudget: true,
          },
        });

        let totalAmount = 0;
        totalAmount = programs?.reduce(
          (sum: any, item: any) => sum + item.programBudget,
          0
        );

        // Store the total amount in the department object
        department.value = totalAmount;
        department.userCount = department._count.employeDepartments; // Store the user count
      }

      return departmentArray;
    }
  },
  fetchDepartmentsByuser: async (name?: string | any, id?: any) => {
    const departments = await prisma.department.findMany({
      where: {
        EmployeeDepartment: {
          some: {
            user_id: id,
          },
        },
        ...(name && {
          name: {
            contains: name,
            mode: "insensitive", // Optional: makes the search case-insensitive
          },
        }),
      },
      include: {
        center: {
          select: {
            id: true,
            name: true,
          },
        },
        Program: {
          select: {
            id: true,
            name: true,
            income: true,
            supply_expense: true,
          },
        },
      },
    });
    return departments;
  },
  fetchEmployeeInDepartment: async (departmentId?: any) => {
    const uniqueUserIds = await prisma.employeeDepartment
      .findMany({
        where: {
          department_id: departmentId,
        },
        // distinct: ['user_id']
      })
      .then((users) => users.map((user) => user.user_id));
    // Fetch complete user data based on unique user IDs
    const employees = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueUserIds,
        },
      },
    });

    return employees;
  },
  fetchProgramInDepartment: async (departmentId?: any) => {
    const programsData = await prisma.program.findMany({
      where: {
        department_id: departmentId,
        status: "APPROVED",
      },
      include: {
        _count: {
          select: { Comment: true }, // Include the count of comments
        },

        department: true, // Include the department details for each program
      },
    });
    const totalBudget = programsData.reduce(
      (sum: any, item: any) => sum + item.programBudget,
      0
    );
    const programs = programsData.map((program) => ({
      ...program,
      commentCount: program._count.Comment, // Add comment count to program
    }));

    return { totalBudget, programs };
  },

  fetchProgramInDepartmentBystatus: async (
    departmentId?: any,
    status?: string | any,
    name?: string | any
  ) => {
    const programsData = await prisma.program.findMany({
      where: {
        department_id: departmentId,
        status: status,
        name: name ? { contains: name, mode: "insensitive" } : undefined, // Add search filter
      },
      include: {
        _count: {
          select: { Comment: true }, // Include the count of comments
        },

        department: true, // Include the department details for each program
      },
    });
    const totalBudget = programsData.reduce(
      (sum: any, item: any) => sum + item.programBudget,
      0
    );
    const programs = programsData.map((program) => ({
      ...program,
      commentCount: program._count.Comment, // Add comment count to program
    }));

    return { totalBudget, programs };
  },

  createDepartment: async (data: any) => {
    const randomcolor = await helpers.getUniqueColor(prisma.department);
    data.color = randomcolor;
    const createdDepartment = await prisma.department.create({ data: data });
    return createdDepartment;
  },
  getDepartmentByNameAndCenterId: async (name: string, center_id: string) => {
    const existingDepartment = await prisma.department.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive", // Case insensitive search
        },
        center_id: center_id,
      },
    });
    return existingDepartment;
  },

  getDepartmentById: async (departmentId: string) => {
    const department = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });
    return department;
  },

  updateDepartment: async (departmentId: string, data: any) => {
    await prisma.department.update({
      where: {
        id: departmentId,
      },
      data: data,
    });
  },

  deleteDepartment: async (departmentId: string) => {
    await prisma.employeeDepartment.deleteMany({
      where: {
        department_id: departmentId,
      },
    });
    await prisma.program.deleteMany({
      where: {
        department_id: departmentId,
      },
    });
    await prisma.department.delete({
      where: {
        id: departmentId,
      },
    });
  },

  updateStaus: async (departmentIds: any, status: any) => {
    const departments: any = await prisma.department.findMany({
      where: { id: { in: departmentIds } },
      include: { Program: true },
    });
    departments.forEach(async (department: any) => {
      const allProgramsApproved = department.Program.every(
        (program: any) =>
          program.status === "APPROVED" || program.status === "DRAFTED"
      );

      // if (allProgramsApproved) {
      await prisma.department.update({
        where: { id: department.id },
        data: { status: status },
      });
      console.log(`Department ${department.id} status updated to APPROVED`);
      // } else {
      //   console.log(
      //     `Department ${department.id} status remains as ${department.status}`
      //   );
      // }
    });
  },
  getProgramCount: async (departmentIds: any) => {
    const programs = await prisma.program.findMany({
      where: {
        department_id: departmentIds,
      },
    });

    const approvedCount = programs.filter(
      (program) => program.status === "APPROVED"
    ).length;
    const pendingCount = programs.filter(
      (program) => program.status === "PENDING"
    ).length;

    return { approvedCount, pendingCount };
  },
  fetchDepartmentsStatus: async (status?: any, name?: any) => {
    const departmentData = await prisma.department.findMany({
      where: {
        status: status !== undefined ? status : undefined, // null check for status
        name: {
          contains: name, // Assuming you want to search for departments containing the specified name
          mode: "insensitive", // case-insensitive search
        },
      },
      include: {
        _count: {
          select: {
            Program: true, // Count of programs in each department
          },
        },
        Program: {
          select: {
            programBudget: true,
            _count: {
              select: { Comment: true }, // Count of comments in each program
            },
          },
        },
      },
    });
    const departments = departmentData.map((department) => {
      const totalComments = department.Program.reduce(
        (sum, program) => sum + program._count.Comment,
        0
      );
      const totalBudget = department.Program.reduce(
        (sum, program) => sum + program.programBudget,
        0
      );

      return {
        ...department,
        totalComments,
        totalBudget,
      };
    });
    const programs: any = await prisma.program.findMany();
    const totalProgramBudget = programs.reduce((sum: any, program: any) => {
      return sum + program.programBudget;
    }, 0);
    return { departments, totalProgramBudget };
  },
};
