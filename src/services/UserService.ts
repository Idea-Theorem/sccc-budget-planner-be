import prisma from "../../config/prisma";
import { UpdateUser, User as UserType } from "../utils/types";

export default {
  fetchUsers: async (name?: string) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              firstname: {
                contains: name,
                mode: "insensitive", // case-insensitive search
              },
            },
            {
              lastname: {
                contains: name,
                mode: "insensitive", // case-insensitive search
              },
            },
            {
              email: {
                contains: name,
                mode: "insensitive", // case-insensitive search
              },
            },
          ],
          NOT: {
            roles: {
              some: {
                role: {
                  name: "HR",
                },
              },
            },
          },
        },
        include: {
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          employeDepartments: {
            select: {
              id: true,
              // name: true,
              hourlyRate: true,
              salaryRate: true,
              title: true,
              department: {
                select: {
                  id: true,
                  name: true,
                  // include other fields from Department model if needed
                },
              },
            },
          },
        },
      });

      return users
        ?.filter((item) => item.email !== "daniyal@yopmail.com")
        ?.map((user) => {
          const roles = user.roles.map((role) => role.role);
          return { ...user, roles };
        });
    } catch (error) {
      throw error;
    }
  },

  createUser: async (body: UserType | any) => {
    try {
      const { roles, employeDepartments } = body;
      return await prisma.user.create({
        data: {
          ...body,
          roles: {
            create: roles?.map((roleId: string) => ({
              role_id: roleId,
            })),
          },
          employeDepartments: {
            create: employeDepartments.map((department: any) => ({
              title: department.title,
              hourlyRate: department.hourlyRate,
              salaryRate: department.salaryRate,
              department: {
                connect: { id: department.department_id },
              },
            })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (user) {
        const roles = user.roles.map((role) => role.role);
        return { ...user, roles };
      }
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId: string, body: UpdateUser | any) => {
    try {
      const { roles, employeDepartments, ...rest } = body;

      // Delete existing role relations
      await prisma.userRole.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Delete existing employee department relations
      await prisma.employeeDepartment.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Create new role relations
      const roleConnections = roles?.map((roleId: string) => ({
        role: {
          connect: {
            id: roleId,
          },
        },
      }));

      // Create new employee department relations
      const employeeDepartmentConnections = employeDepartments?.map(
        (empDep: any) => ({
          title: empDep.title,
          salaryRate: empDep.salaryRate,
          hourlyRate: empDep.hourlyRate,
          department: {
            connect: {
              id: empDep.department_id,
            },
          },
        })
      );

      // Update the user with the new roles and employee departments
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...rest,
          roles: {
            // Connect the user with the new roles
            create: roleConnections,
          },
          employeDepartments: {
            // Connect the user with the new employee departments
            create: employeeDepartmentConnections,
          },
        },
        include: {
          roles: true,
          employeDepartments: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    try {
      await prisma.employeeDepartment.deleteMany({
        where: {
          user_id: userId,
        },
      });
      await prisma.userRole.deleteMany({
        where: {
          user_id: userId,
        },
      });
      await prisma.userComment.deleteMany({
        where: {
          user_id: userId,
        },
      });
      await prisma.program.deleteMany({
        where: {
          user_id: userId,
        },
      });

      return await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  checkEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          roles: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      if (user) {
        const roles = user.roles.map((role) => role.role);
        return { ...user, roles };
      }
    } catch (error) {
      throw error;
    }
  },
};
