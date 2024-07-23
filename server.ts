// Import necessary modules
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
const cron = require("node-cron");
import routes from "./src/routes";
import swaggerConfig from "./swaggerConfig";
import errorMiddleware from "./src/middlewares/error";
import helpers from "./src/utils/helpers";
import { initSocket } from "./socket";
import prisma from "./config/prisma";

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Swagger
swaggerConfig(app);

// Routes setup
app.use("/api", routes);

// Error handling middleware
app.use(errorMiddleware);

// Define root route
app.get("/", (req, res) => {
  res.send("Hi everyone.");
});

// Schedule cron job
cron.schedule("0 0 0 31 12 *", helpers.updateApprovedProgramsToExpired);
// updateRoleNameById("a4d86ccf-7b78-4533-9269-41dc94259946");
initSocket(server);
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

async function updateRoleNameById(id: any) {
  try {
    // Update the role name by its ID
    await prisma.rolePermission.deleteMany({
      where: { role_id: id },
    });

    // Delete related UserRole records if needed
    await prisma.userRole.deleteMany({
      where: { role_id: id },
    });

    // Delete the role by its ID
    const deletedRole = await prisma.role.delete({
      where: { id },
    });
    // Return the updated role object
    console.error("Error updating role name updatesddd :");
  } catch (error) {
    console.error("Error updating role name:", error);
    throw error;
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}
