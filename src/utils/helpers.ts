import bcrypt from "bcrypt";
import JWT, { Secret } from "jsonwebtoken";
import variables from "../../config/variables";
import prisma from "../../config/prisma";
import DashboardService from "../services/DashboardService";

const JWT_SECRET = variables.jwt.token || "jwt_secret";

const helpers = {
  hashPassword: async (pass: string): Promise<string> => {
    try {
      const hashedPassword = await bcrypt.hash(pass, 12);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  },
  verifyPassword: async (
    pass: string,
    hashedPassword: string
  ): Promise<boolean> => {
    try {
      const verified = await bcrypt.compare(pass, hashedPassword);
      return verified;
    } catch (error) {
      throw error;
    }
  },
  encodeJWT: (payload: any): string => {
    try {
      const token = JWT.sign(payload, JWT_SECRET as Secret, {
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  },
  decodeJWT: (token: string): any => {
    try {
      const payload = JWT.verify(token, JWT_SECRET as Secret);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  getRandomColor: () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  getUniqueColor: async (prisma: any) => {
    let color;
    let isUnique = false;

    while (!isUnique) {
      color = helpers.getRandomColor();
      const existingColor = await prisma.findFirst({
        where: { color: color },
      });
      if (!existingColor) {
        isUnique = true;
      }
    }
    return color;
  },

  calculateEmployeeAmountSum: (data: any) => {
    return data.reduce((total: any, record: any) => {
      const sum = record.employee.reduce(
        (acc: any, employee: any) => acc + parseFloat(employee.amount),
        0
      );
      return total + sum;
    }, 0);
  },
  updateApprovedProgramsToExpired: async () => {
    try {
      // Fetch all approved programs
      const programs = await prisma.program.findMany({
        where: { status: "APPROVED" },
        select: {
          programBudget: true,
        },
      });

      // Calculate total approved program budget
      const totalApprovedProgramBudget = programs.reduce(
        (sum, item) => sum + item.programBudget,
        0
      );

      // Update total budget in dashboard service
      const counts = await DashboardService.updateTotalBudget(
        1, // Assuming 1 is the ID of the dashboard
        String(totalApprovedProgramBudget)
      );

      const approvedPrograms = await prisma.program.findMany({
        where: {
          status: "APPROVED",
        },
      });

      // Update the status of each approved program to expired
      const updatePromises = approvedPrograms.map((program) =>
        prisma.program.update({
          where: { id: program.id },
          data: { status: "EXPIRED" },
        })
      );

      // Execute all updates in parallel
      await Promise.all(updatePromises);

      // Fetch updated approved programs to calculate total budget

      console.log(
        "All approved programs have been updated to expired.",
        counts
      );
    } catch (error) {
      console.error("Error updating programs:", error);
    } finally {
      // Disconnect Prisma Client
      await prisma.$disconnect();
    }
  },
};

export default helpers;
