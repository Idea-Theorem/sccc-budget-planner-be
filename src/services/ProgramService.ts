import prisma from "../../config/prisma";
import { io } from "../../socket";
import helpers from "../utils/helpers";
import {
  ProgramStatus,
  Program as ProgramType,
  UpdateProgramStatus,
} from "../utils/types";

export default {
  fetchPrograms: async (
    id?: string,
    status?: ProgramStatus | undefined,
    name?: string | undefined
  ) => {
    try {
      const programs = await prisma.program.findMany({
        where: {
          // ...(id ? { user_id: id } : {}),
          ...(status ? { status } : {}),
          ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              Comment: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return programs;
    } catch (error) {
      throw new Error("Failed to fetch programs");
    }
  },
  fetchcomments: async (
    id?: string,
    status?: ProgramStatus | undefined,
    name?: string | undefined
  ) => {
    try {
      const comments = await prisma.userComment.findMany({
        include: {
          user: true,
          comment: true,
        },
      });
      return comments;
    } catch (error) {
      throw new Error("Failed to fetch programs");
    }
  },
  createProgram: async (body: ProgramType) => {
    try {
      const uniqueColor = await helpers.getUniqueColor(prisma.program);
      body.color = uniqueColor;
      let programBudget = body.income.reduce(
        (sum, income) => sum + income.amount,
        0
      );

      body.programBudget = programBudget;

      const createdProgram = await prisma.program.create({ data: body });
      io.emit("programStatusUpdated", {
        programId: createdProgram?.id,
        newStatus: body?.status,
      });
      return createdProgram;
    } catch (error) {
      throw new Error("Failed to create program");
    }
  },
  getProgramByNameAndDepartment: async (
    name: string,
    department_id: string
  ) => {
    return await prisma.program.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        department_id: department_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },

  getProgramById: async (programId: string) => {
    try {
      const program = await prisma.program.findUnique({
        where: {
          id: programId,
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return program;
    } catch (error) {
      throw new Error("Failed to fetch program by ID");
    }
  },

  updateProgram: async (programId: string, body: ProgramType) => {
    if (body?.income?.length > 0) {
      let programBudget = body.income.reduce(
        (sum: any, income: any) => sum + income.amount,
        0
      );

      body.programBudget = programBudget;
    }

    try {
      await prisma.program.update({
        where: {
          id: programId,
        },
        data: body,
      });
      io.emit("programStatusUpdated", {
        programId: programId,
        newStatus: body?.status,
      });
    } catch (error) {
      throw new Error("Failed to update program");
    }
  },

  updateComment: async (commentId: string, text: any) => {
    try {
      await prisma.comment.update({
        where: { id: commentId },
        data: { text },
      });
    } catch (error) {
      throw new Error("Failed to update program");
    }
  },

  deleteProgram: async (programId: string) => {
    try {
      await prisma.program.delete({
        where: {
          id: programId,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete program");
    }
  },

  updateProgramStatus: async (body: UpdateProgramStatus | any) => {
    try {
      const { progamIds, status } = body;
      const currentDateTime = new Date();
      await prisma.program.updateMany({
        where: {
          id: {
            in: progamIds,
          },
        },
        data: {
          status: status,
          updated_at: {
            push: currentDateTime,
          },
        },
      });
      io.emit("programStatusUpdated", {
        programId: progamIds,
        newStatus: status,
      });
    } catch (error) {
      throw new Error("Failed to update program statuses");
    }
  },
  adCommentInPrograms: async (body: any, id: any) => {
    try {
      const newComment = await prisma.comment.create({
        data: {
          ...body,
        },
      });
      await prisma.userComment.create({
        data: {
          user_id: id,
          comment_id: newComment.id,
        },
      });
    } catch (error) {
      throw new Error("Failed to add comment in program");
    }
  },
  deleteComment: async (commentId: string) => {
    try {
      await prisma.userComment.deleteMany({
        where: { comment_id: commentId },
      });

      // Delete the comment
      await prisma.comment.delete({
        where: { id: commentId },
      });
    } catch (error) {
      throw new Error("Failed to delete program");
    }
  },
  fetchProgramsByUser: async (
    id?: string,
    status?: ProgramStatus | undefined,
    name?: string | undefined
  ) => {
    try {
      const programs = await prisma.program.findMany({
        where: {
          ...(id ? { user_id: id } : {}),
          ...(status ? { status } : {}),
          ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              Comment: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return programs;
    } catch (error) {
      throw new Error("Failed to fetch programs");
    }
  },
  fetchAllPrograms: async (id?: string) => {
    try {
      const programs = await prisma.program.findMany({
        where: {
          ...(id ? { user_id: id } : {}),
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return programs;
    } catch (error) {
      throw new Error("Failed to fetch programs");
    }
  },
  fetchEmployeeInfo: async (user_id?: string, department_id?: string) => {
    try {
      const employeeDepartment = await prisma.employeeDepartment.findFirst({
        where: {
          user_id: user_id,
          department_id: department_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return employeeDepartment;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
