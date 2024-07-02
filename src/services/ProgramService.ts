import prisma from "../../config/prisma";
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
          ...(name ? { name: { contains: name } } : {}),
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
      // const comments = await prisma.comment.findMany();
      // return comments
      // const comments = await prisma.comment.findMany({
      //     include: {
      //         userComments: {
      //             include: {
      //                 user: true,
      //                 comment: true
      //             }
      //         }
      //     }
      // });
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
      return createdProgram;
    } catch (error) {
      throw new Error("Failed to create program");
    }
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
    try {
      await prisma.program.update({
        where: {
          id: programId,
        },
        data: body,
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

  updateProgramStatus: async (body: UpdateProgramStatus) => {
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
          ...(name ? { name: { contains: name } } : {}),
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
      return programs;
    } catch (error) {
      throw new Error("Failed to fetch programs");
    }
  },
};
