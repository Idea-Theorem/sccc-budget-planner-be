import prisma from "../../config/prisma";
import helpers from "../utils/helpers";

export default {
  fetchCenters: async (name?: string) => {
    const centers = await prisma.center.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: "insensitive", // Optional: makes the search case-insensitive
            },
          }
        : {},
      include: {
        Department: {
          include: {
            Program: {
              where: {
                status: "APPROVED", // Add this line to filter by approved status
              },
            },
          },
        },
      },
    });
    centers.forEach((center: any) => {
      // let totalEmployeeSum: any = 0;
      let totalIncomeSum: any = 0;
      // let totalSupplyExpenseSum: any = 0;

      let incomeTotal: any = 0;

      center.Department.forEach((department: any) => {
        //  incomeTotal =  department.Program?.reduce((sum: any, item: any) => sum + item.programBudget, 0);
        department.Program.forEach((program: any) => {
          // totalEmployeeSum += program.employee.reduce((sum: any, item: any) => Number(sum) + Number(item.amount), 0);

          totalIncomeSum += program?.income?.reduce(
            (sum: any, item: any) => Number(sum) + Number(item.amount),
            0
          );

          // totalSupplyExpenseSum += program.supply_expense.reduce((sum: any, item: any) => Number(sum) + Number(item.amount), 0);
        });
      });

      // center.totalEmployeeSum = totalEmployeeSum;
      center.totalIncomeSum = totalIncomeSum;
      // center.totalSupplyExpenseSum = totalSupplyExpenseSum;
      center.value = totalIncomeSum;
    });
    return centers;
    // };
    // const centers = await prisma.center.findMany({
    //     where: name ? {
    //         name: {
    //             contains: name,
    //             mode: 'insensitive' // Optional: makes the search case-insensitive
    //         }
    //     } : {},
    //     include: {
    //         Department: {
    //             select: {
    //                 id: true,
    //                 name: true
    //             }
    //         }
    //     }
    // });
    // return centers;
  },

  createCenter: async (name: string) => {
    const lowerCaseName = name.toLowerCase();

    const existingCenter = await prisma.center.findFirst({
      where: {
        name: {
          equals: lowerCaseName,
          mode: "insensitive",
        },
      },
    });
    if (existingCenter) {
      const error = new Error("Center already exists");
      error.name = "CenterAlreadyExistsError";
      throw error;
    }
    const color = await helpers.getUniqueColor(prisma.center);
    const createdCenter = await prisma.center.create({
      data: {
        name,
        color,
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
    const departmentsData: any = await prisma.department.findMany({
      where: {
        center_id: centerId,
      },
      include: {
        _count: {
          select: {
            Program: true,
          },
        },
        Program: {
          include: {
            _count: {
              select: {
                Comment: true,
              },
            },
          },
        },
      },
    });
    const departments = departmentsData.map((department: any) => {
      const totalComments = department.Program.reduce(
        (sum: any, program: any) => sum + program._count.Comment,
        0
      );

      return {
        ...department,
        programCount: department._count.Program,
        totalComments,
      };
    });
    const department = await fetchProgramsAndCalculateAmounts(departments);
    const totalDepartmentBudget = departments.reduce(
      (sum: any, department: any) => sum + department.totalAmount,
      0
    );

    return { department, totalDepartmentBudget };

    async function fetchProgramsAndCalculateAmounts(departmentArray: any) {
      for (const department of departmentArray) {
        const programs: any = await prisma.program.findMany({
          where: { department_id: department.id, status: "APPROVED" },
          select: {
            programBudget: true,
            // employee: true,
            // supply_expense: true,
          },
        });
        const totalAmount = programs.reduce(
          (sum: any, program: any) => sum + program.programBudget,
          0
        );

        // Initialize total amount for the department
        // let totalAmount = 0;

        // Calculate the sum of amounts in income, employee, and supply_expense arrays for each program
        // programs.forEach(program => {
        //     const incomeTotal: any = program.income.length == 0 ? 0 : program.income.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);
        //     // const employeeTotal: any = program.employee.length == 0 ? 0 : program.employee.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);
        //     // const supplyExpenseTotal = program.supply_expense.length == 0 ? 0 : program.supply_expense.reduce((acc, item: any) => Number(acc) + Number(item.amount), 0);

        //     totalAmount += incomeTotal
        //     // + employeeTotal + supplyExpenseTotal;
        // });

        // // Store the total amount in the department object
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
    // Fetch all departments associated with the center
    const departments = await prisma.department.findMany({
      where: {
        center_id: centerId,
      },
      select: {
        id: true,
      },
    });

    // Extract department ids
    const departmentIds = departments.map((department) => department.id);

    // Delete related EmployeeDepartment records
    await prisma.employeeDepartment.deleteMany({
      where: {
        department_id: {
          in: departmentIds,
        },
      },
    });

    // Delete related Program records
    await prisma.program.deleteMany({
      where: {
        department_id: {
          in: departmentIds,
        },
      },
    });

    // Delete departments
    await prisma.department.deleteMany({
      where: {
        id: {
          in: departmentIds,
        },
      },
    });

    // Delete the center
    await prisma.center.delete({
      where: {
        id: centerId,
      },
    });
  },
};
