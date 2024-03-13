import { Server } from "http";

/** UNHANDLED PROMISE REJECT **/
const uncaughtRejection = (server: Server) => {
  process.on("unhandledRejection", (err: Error) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down server due to unhadled promise rejection");
    server.close(() => {
      process.exit(1);
    });
  });
};

export default uncaughtRejection;
