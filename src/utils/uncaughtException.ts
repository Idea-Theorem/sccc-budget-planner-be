/** UNCAUGHT EXCEPTIONS **/
const uncaughtException = () => {
  process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
  });
};

export default uncaughtException;
