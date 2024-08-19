import prisma from "../../config/prisma";

export default {
  fetchRoles: async () => {
    const roles = await prisma.role.findMany({
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
      },
    });
    return roles.map((role) => {
      const permissions = role.permissions.map(
        (permission) => permission.permission
      );
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
      },
    });
    if (role) {
      const permissions = role.permissions.map(
        (permission) => permission.permission
      );
      return { ...role, permissions };
    }
    return role;
  },
  postRoles: async (name: string) => {
    const employeeRole = await prisma.employeeRole.create({
      data: {
        name,
      },
    });

    return employeeRole;
  },
  updateRoles: async (id: any, name: string) => {
    const employeeRole = await prisma.employeeRole.update({
      where: { id },
      data: {
        name,
      },
    });

    return employeeRole;
  },
  fetchEmployeeRoles: async (searchTerm: string) => {
    const employeeRoles = await prisma.employeeRole.findMany({
      where: searchTerm
        ? {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        created_at: "desc",
      },
    });

    return employeeRoles;
  },
  deleteEmployeeRoles: async (id: any) => {
    const employeeRoles = await prisma.employeeRole.delete({
      where: { id },
    });
    return employeeRoles;
  },
  fetchNewHire: async () => {
    const programs = await prisma.program.findMany({
      include: {
        department: {
          select: {
            id: true,
            name: true,
            // include other fields from Department model if needed
          },
        },
      },
    });
    const employeeArrays = programs.map((program) => {
      if (program.employee.length > 0) {
        program.employee.map(
          (item: any) =>
            (item.otherinfo = {
              name: program.name,
              department: program.department,
              program_id: program.id,
              hire_date: program.created_at,
            })
        );
      }
      return program.employee;
    });
    const flattenedEmployees = employeeArrays.flatMap((employees) => employees);

    const filteredEmployees = flattenedEmployees.filter(
      (employee: any) => employee.employee === "New Hire"
    );

    return filteredEmployees;
  },
  deleteNewHire: async (id: any, empId: any) => {
    try {
      // Fetch the specific program by id
      const program = await prisma.program.findUnique({
        where: { id },
      });

      if (!program) {
        return { error: "Program not found" };
      }

      // Filter out the employee to be deleted
      const updatedEmployees = program.employee.filter(
        (emp: any) => emp.emp_id !== empId
      );

      // Update the program with the new employee array
      const updatedProgram = await prisma.program.update({
        where: { id },
        data: { employee: updatedEmployees as any },
      });

      return updatedProgram;
    } catch (error) {
      return { error: "Failed to update program" };
    }
  },
};
