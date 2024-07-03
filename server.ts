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

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// Middleware setup
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

// Function to update approved programs to expired status
// async function updateApprovedProgramsToExpired() {
//   try {
//     // Fetch all approved programs
//     const approvedPrograms = await prisma.program.findMany({
//       where: {
//         status: "APPROVED",
//       },
//     });

//     // Update the status of each approved program to expired
//     const updatePromises = approvedPrograms.map((program) =>
//       prisma.program.update({
//         where: { id: program.id },
//         data: { status: "EXPIRED" },
//       })
//     );

//     // Execute all updates in parallel
//     await Promise.all(updatePromises);

//     // Fetch updated approved programs to calculate total budget
//     const programs = await prisma.program.findMany({
//       where: { status: "APPROVED" },
//       select: {
//         programBudget: true,
//       },
//     });

//     // Calculate total approved program budget
//     const totalApprovedProgramBudget = programs.reduce(
//       (sum, item) => sum + item.programBudget,
//       0
//     );

//     // Update total budget in dashboard service
//     const counts = await DashboardService.updateTotalBudget(
//       1, // Assuming 1 is the ID of the dashboard
//       String(totalApprovedProgramBudget)
//     );

//     console.log("All approved programs have been updated to expired.", counts);
//   } catch (error) {
//     console.error("Error updating programs:", error);
//   } finally {
//     // Disconnect Prisma Client
//     await prisma.$disconnect();
//   }
// }

// Socket.IO connection handling
// io.on("connection", (socket: Socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// Start server
initSocket(server);
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
