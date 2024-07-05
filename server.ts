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

initSocket(server);
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
