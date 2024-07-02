import prisma from "../../config/prisma";

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
              status: "APPROVED",
            },
          },
        },
      });

      return { departmentsCount, approvedCount };
    } catch (error) {
      console.error("Error fetching departments count:", error);
      throw new Error("Failed to fetch departments count");
    }
  },

  fetchProgramsCount: async () => {
    try {
      // Fetch count of all programs
      const programsCount = await prisma.program.count();

      // Fetch count of programs with status 'APPROVED'
      const approvedCount = await prisma.program.count({
        where: {
          status: "APPROVED",
        },
      });

      const departmentCount = await prisma.department.count();

      // Fetch count of programs with status 'APPROVED'
      const approvedDepartmentCount = await prisma.department.count({
        where: {
          status: "APPROVED",
        },
      });

      const programs = await prisma.program.findMany({
        where: { status: "APPROVED" },
        select: {
          programBudget: true,
          // employee: true,
          // supply_expense: true,
        },
      });

      const totalCenters = await prisma.center.count();

      // Get number of centers with all approved departments
      const centersWithApprovedDepartments = await prisma.center.findMany({
        include: {
          Department: true,
        },
      });

      const approvedcenters = centersWithApprovedDepartments.filter((center) =>
        center.Department.every(
          (department) => department.status === "APPROVED"
        )
      ).length;
      const totalApprovedProgrambudget = programs?.reduce(
        (sum: any, item: any) => sum + item.programBudget,
        0
      );
      // const totalIncomeSum = programs.reduce((acc: any, program) => {
      //     const incomeSum = program.income.reduce((sum, item: any) => sum + item.amount, 0);
      //     return acc + incomeSum;
      // }, 0);

      // const totalSupplyExpenseSum = programs.reduce((acc: any, program) => {
      //     const supplyExpenseSum = program.supply_expense.reduce((sum, item: any) => sum + item.amount, 0);
      //     return acc + supplyExpenseSum;
      // }, 0);

      // const totalSalaryExpenseSum = programs.reduce((acc: any, program) => {
      //     const salaryExpenseSum = program.employee.reduce((sum, item: any) => sum + item.amount, 0);
      //     return acc + salaryExpenseSum;
      // }, 0);

      // const totalApprovedProgrambudget = Number(totalIncomeSum) + Number(totalSupplyExpenseSum) + Number(totalSalaryExpenseSum)

      return {
        programsCount,
        totalApprovedProgrambudget,
        approvedCount,
        departmentCount,
        approvedDepartmentCount,
        approvedcenters,
        totalCenters,
      };
    } catch (error) {
      console.error("Error fetching programs count:", error);
      throw new Error("Failed to fetch programs count");
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
                  status: "APPROVED",
                },
              },
            },
          },
        },
      });

      return { centersCount, approvedCount };
    } catch (error) {
      console.error("Error fetching centers count:", error);
      throw new Error("Failed to fetch centers count");
    }
  },

  addTotalbudget: async (total_value: any) => {
    try {
      const newValue = await prisma.budget.create({
        data: { total_value },
      });
      return newValue;
    } catch (error) {
      throw new Error("Failed to post total budget");
    }
  },

  fetchTotalBudget: async (id: any) => {
    try {
      const value = await prisma.budget.findUnique({
        where: { id: parseInt(id) },
      });
      return value;
    } catch (error) {
      console.error("Error fetching centers count:", error);
      throw new Error("Failed to fetch centers count");
    }
  },
  fetchSuperAdminTotalBudget: async (id: any) => {
    try {
      const value = await prisma.budgetSuperAdmin.findUnique({
        where: { id: parseInt(id) },
      });
      return value;
    } catch (error) {
      console.error("Error fetching centers count:", error);
      throw new Error("Failed to fetch centers count");
    }
  },
  updateTotalBudget: async (id: any, total_value: any) => {
    try {
      const updatedValue = await prisma.budget.update({
        where: { id: parseInt(id) },
        data: { total_value },
      });
      return updatedValue;
    } catch (error) {
      console.error("Error update budget :", error);
      throw new Error("Failed to budget ");
    }
  },
  updateSuperAdminTotalBudget: async (id: any, total_value: any) => {
    try {
      const updatedValue = await prisma.budgetSuperAdmin.update({
        where: { id: parseInt(id) },
        data: { total_value },
      });
      return updatedValue;
    } catch (error) {
      console.error("Error update budget :", error);
      throw new Error("Failed to budget ");
    }
  },
  fetchAllRecord: async () => {
    try {
      const startDate = new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
      const endDate = new Date(
        new Date().getFullYear(),
        5,
        30,
        23,
        59,
        59,
        999
      );

      const programs: any = await prisma.program.findMany({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          income: true,
          supply_expense: true,
        },
      });
      const currentYear = new Date().getFullYear();
      const secondStartDate = new Date(`${currentYear}-07-01T00:00:00.000Z`);
      const secondEndDate = new Date(`${currentYear}-12-31T23:59:59.999Z`);
      const seondHalfprograms = await prisma.program.findMany({
        where: {
          created_at: {
            gte: secondStartDate,
            lte: secondEndDate,
          },
        },
        select: {
          income: true,
          supply_expense: true,
        },
      });
      let first_Half_Income: any = {};
      let first_half_supply_expense: any = {};
      let secondHalf_Income: any = {};
      let secondHalf_supply_expense: any = {};

      // Iterate through each object in data
      programs?.forEach((obj: any) => {
        // Iterate through each income object in the income array
        obj.income.forEach((incomeObj: any) => {
          // Check if the name already exists in sums object
          if (first_Half_Income.hasOwnProperty(incomeObj.name)) {
            // Add amount to existing sum
            first_Half_Income[incomeObj.name] += incomeObj.amount;
          } else {
            // Initialize sum for new name
            first_Half_Income[incomeObj.name] = incomeObj.amount;
          }
        });
      });

      programs?.forEach((obj: any) => {
        // Iterate through each income object in the income array
        obj?.supply_expense.forEach((incomeObj: any) => {
          // Check if the name already exists in sums object
          if (first_half_supply_expense.hasOwnProperty(incomeObj.name)) {
            // Add amount to existing sum
            first_half_supply_expense[incomeObj.name] += incomeObj.amount;
          } else {
            // Initialize sum for new name
            first_half_supply_expense[incomeObj.name] = incomeObj.amount;
          }
        });
      });

      seondHalfprograms?.forEach((obj: any) => {
        // Iterate through each income object in the income array
        obj?.income?.forEach((incomeObj: any) => {
          // Check if the name already exists in sums object
          if (secondHalf_Income.hasOwnProperty(incomeObj.name)) {
            // Add amount to existing sum
            secondHalf_Income[incomeObj.name] += incomeObj.amount;
          } else {
            // Initialize sum for new name
            secondHalf_Income[incomeObj.name] = incomeObj.amount;
          }
        });
      });

      seondHalfprograms?.forEach((obj: any) => {
        // Iterate through each income object in the income array
        obj?.supply_expense?.forEach((incomeObj: any) => {
          // Check if the name already exists in sums object
          if (secondHalf_supply_expense.hasOwnProperty(incomeObj.name)) {
            // Add amount to existing sum
            secondHalf_supply_expense[incomeObj.name] += incomeObj.amount;
          } else {
            // Initialize sum for new name
            secondHalf_supply_expense[incomeObj.name] = incomeObj.amount;
          }
        });
      });

      // console.log(sumByCategory);
      // return programs
      const incomeArray = Object.entries(first_Half_Income).map(
        ([name, value]) => ({ name, value })
      );
      const supplyExpenseArray = Object.entries(first_half_supply_expense).map(
        ([name, value]) => ({ name, value })
      );
      const incomeArraySecond = Object.entries(secondHalf_Income).map(
        ([name_second, value_second]) => ({ name_second, value_second })
      );
      const supplyArraySecond = Object.entries(secondHalf_supply_expense).map(
        ([name_second, value_second]) => ({ name_second, value_second })
      );

      let obj = {
        name: "Income",
        history: mergeValues([...incomeArray, ...incomeArraySecond]),
      };

      //   const res = mergeValues(obj.history);
      //   console.log("res::::::::::::", res);
      let objTwo = {
        name: "Expense (Supplies & Services)",
        history: mergeValues([...supplyExpenseArray, ...supplyArraySecond]),
      };
      const firstHalf = [obj, objTwo];

      const secondHalf = {
        incomeArraySecond,
        supplyArraySecond,
      };
      function mergeValues(data: any) {
        const result: any = [];

        // Create a map to easily find objects by name
        const nameMap = new Map();
        data.forEach((item: any) => {
          if (item.name) {
            nameMap.set(item.name, item);
          }
        });

        // Iterate again to merge value_second into the corresponding object
        data.forEach((item: any) => {
          if (item.name_second) {
            const correspondingItem = nameMap.get(item.name_second);
            if (correspondingItem) {
              correspondingItem.value_second = item.value_second;
            } else {
              // If there is no corresponding item, add it to the result array
              result.push(item);
            }
          } else {
            // Add original items that don't have name_second to the result array
            result.push(item);
          }
        });

        return result;
      }
      return { firstHalf, secondHalf };
    } catch (error) {
      console.error(error);
    }
  },

  addSuperAdminTotalbudget: async (total_value: any) => {
    try {
      const newValue = await prisma.budgetSuperAdmin.create({
        data: { total_value },
      });
      return newValue;
    } catch (error) {
      throw new Error("Failed to post total budget");
    }
  },
};
